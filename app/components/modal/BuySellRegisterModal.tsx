'use client';

import { useCallback, useMemo, useState } from 'react';
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

interface BuySellRegisterModalProps {}

type CategoryKey = keyof typeof BUY_SELL_CATEGORY;

enum BUY_SELL_REGISTER_STEP {
  CATEGORY = 1,
  PRODUCTINFO,
  LOCATION,
  ROOMMATEPRE,
  CONTACT,
}

const BuySellRegisterModal: React.FC<BuySellRegisterModalProps> = ({}) => {
  const [step, setStep] = useState(BUY_SELL_REGISTER_STEP.CATEGORY);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [searchAddress, setSearchAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    if (step == 1 && validateInput([category, subcategory])) {
      // console.log(category);
      // console.log(subcategory);
      toast.error('카테고리를 선택해주세요');
      return null;
    }

    if (step == 2 && validateInput([title, price, status, description])) {
      toast.error('모든 항목을 선택/작성 해주세요');
      return null;
    }

    if (step == 3 && validateInput([address, coordinate])) {
      toast.error('도로명 주소를 입력하시고 검색을 눌러주세요');
      return null;
    }

    if (step == 4 && validateInput([pictures])) {
      toast.error('사진을 등록해주세요');
      return null;
    }

    // if (step == 5 && validateInput([city, district])) {
    //   toast.error('지역을 선택해주세요');
    //   return null;
    // }

    const newStep = step == 5 ? 5 : step + 1;

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

    // replace data.pictures with pictureURL before calling the post method
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
          <div className='flex flex-col gap-2 md:gap-4'>
            <Heading title='카테고리를 선택해주세요 (1/6)' />
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
      case 2:
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
      case 3:
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
      case 4:
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
      case 5:
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
    categoryOptions,
    selectedCategory,
    subCategoryOptions,
    register,
    errors,
    isLoading,
    coordinate,
    currentUser,
    handleAddress,
  ]);

  const footerContent = (
    <div className='flex flex-row justify-between gap-8'>
      {step > 1 && <Button onClick={onBack} label={'Back'} />}
      {step < 5 && <Button onClick={onNext} label={'Next'} />}
      {step == 5 && (
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
      title={'중고거래 등록하기'}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default BuySellRegisterModal;
