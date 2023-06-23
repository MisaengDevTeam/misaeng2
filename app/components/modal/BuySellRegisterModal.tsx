'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import useBuySellRegisterModal from '../hooks/useBuySellRegisterModal';
import Modal from './Modal';

// Submit form
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

// Types
import { BUY_SELL_CATEGORY, BUY_SELL_STATUS } from '@/types/BuySellTypes';
import Button from '../Button';
import Heading from '../Heading';
import SelectComp from '../inputs/SelectComp';
import { useSession } from 'next-auth/react';
import Input from '../inputs/Input';
import Textarea from '../inputs/Textarea';
import MapComponent from '../Map';
import BuySellRegiPicture from './buysellregister/BuySellRegiPicture';
import { capitalizeFirstLetters } from '@/app/lib/addressFormatter';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import validateInput from '@/app/lib/validateInput';
import Image from 'next/image';

interface BuySellRegisterModalProps {}

type CategoryKey = keyof typeof BUY_SELL_CATEGORY;

enum BUY_SELL_REGISTER_STEP {
  NOTIFICATION = 1,
  CHECK,
  CATEGORY,
  PRODUCTINFO,
  LOCATION,
  ROOMMATEPRE,
  CONTACT,
}

const BuySellRegisterModal: React.FC<BuySellRegisterModalProps> = ({}) => {
  const [step, setStep] = useState(BUY_SELL_REGISTER_STEP.NOTIFICATION);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [searchAddress, setSearchAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userPrevListings, setUserPrevListings] = useState<any[] | null>(null);
  const [coordinate, setCoordinate] = useState<[number, number]>([
    -73.9917399, 40.748456,
  ]);

  // Session
  const { data: session } = useSession();
  const currentUser = session?.user;
  const uid = currentUser?.id;
  const email = currentUser?.email;

  const router = useRouter();

  // Modal
  const buySellRegisterModal = useBuySellRegisterModal();

  useEffect(() => {
    if (uid) {
      const fetchUserListings = async (uid: string) => {
        axios
          .post(`/api/userInfo/userInfo`, { mypage: 'buysell', uid })
          .then((res) => setUserPrevListings(res.data.buysellInfo));
      };
      fetchUserListings(uid);
    }
  }, [uid]);

  // Register form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: null,
      subcategory: null,
      title: null,
      price: null,
      status: null,
      description: null,
      pictures: null,
      address: null,
      uid: uid,
      coordinate: null,
      email: email,
      phone: '',
      kakaoId: '',
    },
  });

  const setCustomValue = useCallback(
    (id: string, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const pictures = watch('pictures');
  const category = watch('category');
  const subcategory = watch('subcategory');
  const title = watch('title');
  const price = watch('price');
  const status = watch('status');
  const description = watch('description');
  const address = watch('address');

  const fetchPersonalListings = useCallback(async (uid: string) => {
    axios
      .post(`/api/userInfo/userInfo`, { mypage: 'buysell', uid })
      .then((res) => console.log(res.data.buysellInfo));
  }, []);

  // Options
  const categoryOptions = useMemo(() => {
    return Object.keys(BUY_SELL_CATEGORY).map((key) => ({
      label: key,
      value: key,
    }));
  }, []);

  const subCategoryOptions = useMemo(() => {
    return selectedCategory.map((category) => ({
      label: category,
      value: category,
    }));
  }, [selectedCategory]);

  const handleAddress = useCallback(async () => {
    setIsLoading(true);
    if (searchAddress) {
      axios
        .post(`/api/geocode`, { searchAddress })
        .then((res) => {
          setCoordinate(res.data.newCoordinate);
          setCustomValue('address', res.data.newAddress);
          setCustomValue('coordinate', res.data.newCoordinate);
        })

        .catch((error) => {
          toast.error(`Address error`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    return null;
  }, [searchAddress, setCustomValue]);

  const onBack = () => {
    const newStep = step == 1 ? 1 : step - 1;
    setStep(newStep);
  };

  const onNext = () => {
    if (step == 3 && validateInput([category, subcategory])) {
      toast.error('카테고리를 선택해주세요');
      return null;
    }

    if (step == 4 && validateInput([title, price, status, description])) {
      toast.error('모든 항목을 선택/작성 해주세요');
      return null;
    }

    if (step == 5 && validateInput([address, coordinate])) {
      toast.error('도로명 주소를 입력하시고 검색을 눌러주세요');
      return null;
    }

    if (step == 6 && validateInput([pictures])) {
      toast.error('사진을 등록해주세요');
      return null;
    }

    // if (step == 5 && validateInput([city, district])) {
    //   toast.error('지역을 선택해주세요');
    //   return null;
    // }

    const newStep = step == 7 ? 7 : step + 1;

    setStep(newStep);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const writeTime = new Date().toISOString();

    const pictureURL: string[] = await Promise.all(
      pictures.map(async (pic: string) => {
        const resPic = await fetch(pic);
        const blobPic = await resPic.blob();

        const url = await axios.post(
          `/api/pic/buySellImage/${currentUser?.id}/${writeTime}`
        );

        const response = await fetch(url.data.signedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: blobPic,
        });

        const resultPicture = response.url.split('?')[0];

        return resultPicture;
      })
    );

    setCustomValue('pictures', pictureURL);

    data.pictures = pictureURL;

    axios
      .post(`/api/buysellRegister`, { ...data, uid: uid, email: email })
      .then((response) => {
        toast.success('사고팔기 리스팅이 등록되었습니다!');
        setStep(BUY_SELL_REGISTER_STEP.CATEGORY);
        buySellRegisterModal.onClose();
        reset();
      })
      .catch((error) => {
        toast.error(`Something went wrong`);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        router.refresh();
      });
  };

  const bodyContent = useMemo(() => {
    const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    };

    switch (step) {
      case 1:
        return (
          <div className='flex flex-col gap-4 h-[60vh] overflow-y-scroll'>
            <div className='w-full text-center md:text-xl font-bold'>
              사고팔기 주의사항
            </div>
            <div className='text-sm md:text-base'>
              1. 상품을 거래하는 장소는 가급적 낮에 공공장소에서 만나서
              거래하시기 바랍니다.
            </div>
            <div className='text-sm md:text-base'>
              2. 택배거래의 경우, 판매자라면 상품에 대해 더욱 자세한 설명과
              사진을 제공하고, 구매자라면 상품 구매에 대해 더욱 각별히 신경써서
              구매하시는 것이 좋습니다.
            </div>
            <div className='text-sm md:text-base'>
              3. 미생은 회원님의 상품거래에 대해서 책임을 지지 않습니다.
              사고팔기에서 거래되는 모든 거래는 일체 유저에게 책임이 있습니다.
            </div>
            <div className='md:text-lg underline font-semibold'>
              판매 시 주의사항
            </div>
            <div className='text-sm md:text-base'>
              1. 상품 사진은 최대한 상품만 나오도록 찍어서 올려주시기 바랍니다.
              불필요한 개인정보가 노출될 수 있는 가능성을 최소화하여 주시기
              바랍니다.
            </div>
            <div className='text-sm md:text-base'>
              2. 개인 전화번호로 연락을 원하시는 경우는 전화번호를 종이에 펜으로
              작성하시고 사진으로 올리는 것이 좋으며, 최소한 번호를 텍스트로만
              올리는 경우는 피해서 작성해주시기 바랍니다.
            </div>
            <div className='text-sm md:text-base'>
              3. 상품 거래를 위해 만나시는 경우, 구매자와 최종 가격에 대해서
              합의가 된 상태에서 거래하시기 바랍니다.
            </div>
            <div className='md:text-lg underline font-semibold'>
              구매 시 주의사항
            </div>
            <div className='text-sm md:text-base'>
              1. 판매자의 상품 사진에 대해서 반드시 자세히 살펴보시고 구매를
              결정하시기 바라며, 상품 정보가 불분명할 경우 가급적 구매를
              재고려하시기 바랍니다.
            </div>
            <div className='text-sm md:text-base'>
              2. 미생 웹사이트 외부에 존재하는 판매자의 상품 정보는 심각한
              바이러스 또는 피싱 사기로 유도할 가능성이 있습니다. 외부 링크를
              발견하시면 신고하기 버튼으로 저희 미생 팀에게 알려주시기 바랍니다.
            </div>
            <div className='text-sm md:text-base'>
              3. 실제 상품이 상품 정보와 다를 경우, 구매에 대해서 반드시
              재고려하시기 바랍니다.
            </div>
          </div>
        );
      case 2:
        // console.log(userPrevListings)
        if (!userPrevListings) return <></>;

        return (
          <div className='flex flex-col items-center gap-1'>
            <div>
              회원님이 등록하신 리스팅은 현재 {userPrevListings.length}개
              입니다.
            </div>
            <div>사고팔기는 최대 10개까지 등록이 가능합니다.</div>
            <div
              onClick={() => {
                buySellRegisterModal.onClose();
                reset();
                router.push('/mypage/buy-sell-listing');
              }}
              className='w-full border border-[#EC662A] bg-[#EC662A] py-1 mb-2 text-center text-white rounded-xl'
            >
              클릭하여 상품 삭제 또는 수정하기
            </div>
            <div className='grid grid-cols-2 gap-2 w-full'>
              {userPrevListings.map((item) => (
                <div
                  key={(item as any)._id}
                  className='w-full border border-[#EC662A] flex flex-col items-center rounded-xl p-1'
                >
                  <div className='truncate w-full text-center'>{`${item.title}`}</div>
                  <div>
                    <Image
                      width={80}
                      height={60}
                      src={item.pictures[0]}
                      alt={'thumbnail'}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className='flex flex-col gap-2 md:gap-4'>
            <Heading title='카테고리를 선택해주세요 (1/5)' />
            <SelectComp
              placeholder='대분류'
              options={categoryOptions}
              onChange={(value) => {
                setSelectedCategory(BUY_SELL_CATEGORY[value as CategoryKey]);
                setCustomValue('category', value);
              }}
            />
            {selectedCategory && (
              <SelectComp
                placeholder='소분류'
                options={subCategoryOptions}
                onChange={(value) => {
                  setCustomValue('subcategory', value);
                }}
              />
            )}
          </div>
        );
      case 4:
        return (
          <div className='flex flex-col gap-2 md:gap-4'>
            <Heading title='상품에 대해서 설명해주세요 (2/5)' />
            <Input
              id={'title'}
              // label={'商品名称'}
              label={'제목'}
              register={register}
              length={32}
              errors={errors}
              onChange={(e) => setCustomValue('title', e.target.value)}
            />
            <Input
              type='number'
              id={'price'}
              // label={'价格'}
              label={'가격'}
              register={register}
              errors={errors}
              formatPrice
              onChange={(e) => setCustomValue('price', e.target.value)}
            />
            <SelectComp
              // placeholder={'商品状态'}
              placeholder={'물건 상태'}
              options={BUY_SELL_STATUS}
              onChange={(value) => setCustomValue('status', value)}
            />
            <Textarea
              id={'description'}
              // placeholer='请详细描述商品特征'
              placeholer='상품에 대한 상세설명을 적어주세요'
              onChange={(value) => setCustomValue('description', value)}
            />
          </div>
        );
      case 5:
        return (
          <div className='flex flex-col gap-2 md:gap-4'>
            {/* <Heading title='您的位置 (3/5)' /> */}
            <Heading title='회원님의 대략적 위치를 알려주세요 (3/5)' />
            <div className='flex gap-2'>
              <div className='w-[80%]'>
                <Input
                  id={'address'}
                  // label={'街道地址'}
                  label={'도로명 주소'}
                  length={36}
                  onEnter={(e) => {
                    if (e.key === 'Enter') {
                      handleAddress();
                    }
                  }}
                  onChange={(e) => {
                    setSearchAddress(
                      encodeURIComponent(
                        capitalizeFirstLetters(e.currentTarget.value)
                      )
                    );
                  }}
                  register={register}
                  errors={errors}
                />
              </div>
              <div className='w-[20%]'>
                <Button
                  disabled={isLoading}
                  onClick={() => {
                    handleAddress();
                  }}
                  label={'검색'}
                />
              </div>
            </div>
            <MapComponent initCoordinate={coordinate} showRange />
          </div>
        );
      case 6:
        return (
          <div className='flex flex-col gap-2 md:gap-4'>
            <Heading
              // title='请上传商品照片 (4/5)'
              title='판매하시는 상품 사진을 올려주세요 (4/5)'
              // subtitle='为达到最佳效果，请横向，多角度，并在光线充足的环境下拍摄'
              subtitle='사진은 미생 회원님의 핸드폰으로 찍어주신 사진으로도 충분합니다. 충분한 햇빛 또는 조명에서 가로 방향으로 촬영한 사진을 업로드해주시기 바랍니다.'
            />
            <BuySellRegiPicture
              onChange={(value) => setCustomValue('pictures', value)}
            />
          </div>
        );
      case 7:
        return (
          <div className='flex flex-col gap-2 md:gap-4'>
            {/* <Heading title='联系方式 (5/5)' /> */}
            <Heading title='연락 방식을 선택해주세요 (5/5)' />
            <div className='flex flex-col gap-4 mt-4'>
              <Input
                id={'email'}
                label={'이메일'}
                register={register}
                errors={errors}
                length={36}
                emailValue={currentUser && currentUser.email}
                disabled={currentUser ? true : false}
              />
              <Input
                id={'phone'}
                label={'핸드폰'}
                length={13}
                register={register}
                errors={errors}
                onChange={(e) => setCustomValue('phone', e.currentTarget.value)}
              />
              <Input
                id={'kakaoId'}
                label={'카카오톡 아이디'}
                length={13}
                register={register}
                errors={errors}
                onChange={(e) =>
                  setCustomValue('kakaoId', e.currentTarget.value)
                }
              />
            </div>
          </div>
        );
      default:
        return <div />;
    }
  }, [
    step,
    setValue,
    userPrevListings,
    categoryOptions,
    selectedCategory,
    subCategoryOptions,
    register,
    errors,
    isLoading,
    coordinate,
    currentUser,
    buySellRegisterModal,
    reset,
    router,
    handleAddress,
  ]);

  const footerContent = (
    <div className='flex flex-row justify-between gap-8'>
      {step > 1 && <Button onClick={onBack} label={'Back'} />}
      {step < 7 && <Button onClick={onNext} label={'Next'} />}
      {step == 7 && userPrevListings?.length != 10 && (
        <Button
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          label={'Submit'}
        />
      )}
    </div>
  );

  return (
    <Modal
      isOpen={buySellRegisterModal.isOpen}
      onClose={buySellRegisterModal.onClose}
      title={'사고팔기 등록하기'}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default BuySellRegisterModal;
