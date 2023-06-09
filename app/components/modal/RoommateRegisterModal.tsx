'use client';

import { useCallback, useState } from 'react';
import useRoommateRegisterModal from '../hooks/useRoommateRegisterModal';
import Modal from './Modal';
import {
  ROOMMATE_TYPE,
  ROOMMATE_SELF_PRE,
  ROOMMATE_ROOMMATE_PRE,
  ROOMMATE_MAP,
} from '@/types/RoommateTypes';

import CategoryInput from '../inputs/CategoryInput';
import Heading from '../Heading';
import { IconType } from 'react-icons';
import { SlPeople } from 'react-icons/sl';
import { BsHouseUp } from 'react-icons/bs';
import { SlPencil } from 'react-icons/sl';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../Button';
import RmSelfPre from '../inputs/roommate/RmSelfPre';
import Input from '../inputs/Input';
import SelectComp from '../inputs/SelectComp';
import RmRoomInfo from '../inputs/roommate/RmRoomInfo';
import axios from 'axios';
import toast from 'react-hot-toast';
import validateInput from '@/app/lib/validateInput';
import { useSession } from 'next-auth/react';
import dateFormatter from '@/app/lib/dateFormatter';
import Textarea from '../inputs/Textarea';
import introductionGenerator from '@/app/lib/introductionGenerator';
import LoadingScreen from '../LoadingScreen';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../LoadingSpinner';

interface RoommateRegisterModalProps {}

enum ROOMMATE_REGISTER_STEP {
  NOTIFICATION = 1,
  CHECK,
  ROOMINFO,
  SELFPRE,
  ROOMMATEPRE,
  DESCRIPTION,
  CONTACT,
}

const ICONS: { [key: string]: IconType } = {
  SlPeople,
  BsHouseUp,
  SlPencil,
};

const RoommateRegisterModal: React.FC<RoommateRegisterModalProps> = ({}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const currentUser = session?.user;
  const uid = currentUser?.id;
  const email = currentUser?.email;

  const roommateRegisterModal = useRoommateRegisterModal();

  const [step, setStep] = useState(ROOMMATE_REGISTER_STEP.NOTIFICATION);
  const [isLoading, setIsLoading] = useState(false);
  const [userPrevListing, setUserPrevListing] = useState<any>(null);

  const today = dateFormatter(new Date());

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      roomtype: '',
      price: null,
      length: '',
      movedate: today,
      description: '',
      본인성별: '',
      본인연령대: '',
      본인학생: '',
      본인반려동물: '',
      본인흡연여부: '',
      본인MBTI: '',
      상대성별: '',
      상대연령대: '',
      상대학생: '',
      상대반려동물: '',
      상대흡연여부: '',
      city: null,
      district: '',
      uid: uid,
      email: email,
      phone: '',
      kakaoId: '',
    },
  });

  const category = watch('category');
  const price = watch('price');
  const length = watch('length');
  const movedate = watch('movedate');
  const description = watch('description');
  const gender = watch('본인성별');
  const age = watch('본인연령대');
  const status = watch('본인학생');
  const pet = watch('본인반려동물');
  const smoke = watch('본인흡연여부');
  const mbti = watch('본인MBTI');
  const rmgender = watch('상대성별');
  const rmage = watch('상대연령대');
  const rmstatus = watch('상대학생');
  const rmpet = watch('상대반려동물');
  const rmsmoke = watch('상대흡연여부');
  const city = watch('city');
  const district = watch('district');
  const roomtype = watch('roomtype');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const fetchUserListings = useCallback(() => {
    setIsLoading(true);
    if (uid) {
      const fetchUserListings = async (uid: string) => {
        axios
          .post(`/api/userInfo/userInfo`, { mypage: 'roommate', uid })
          .then((res) => setUserPrevListing(res.data.roommateInfo))
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false);
          });
      };
      fetchUserListings(uid);
    }
  }, [uid]);

  const onBack = () => {
    const newStep = step == 1 ? 1 : step - 1;
    setStep(newStep);
  };

  const onNext = () => {
    if (step == 1) {
      fetchUserListings();
    }

    if (
      step == 3 &&
      validateInput([price, roomtype, movedate, city, district])
    ) {
      toast.error('모든 항목을 선택/작성 해주세요');
      return null;
    }

    if (step == 4 && validateInput([gender, age, status, pet, smoke, mbti])) {
      toast.error('반드시 한 가지씩 선택 해주세요');
      return null;
    }

    if (step == 5) {
      if (validateInput([rmgender, rmage, rmstatus, rmpet, rmsmoke])) {
        toast.error('반드시 한 가지씩 선택 해주세요');

        return null;
      } else {
        const generatedIntroduction = introductionGenerator(
          category,
          gender,
          status,
          age,
          mbti,
          pet,
          smoke,
          rmpet,
          rmsmoke
        );
        setCustomValue('description', generatedIntroduction);
      }
    }

    const newStep = step == 7 ? 7 : step + 1;

    setStep(newStep);
  };

  const addSpace = useCallback((str: string) => {
    return str.slice(0, 2) + ' ' + str.slice(2);
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step != ROOMMATE_REGISTER_STEP.CONTACT) {
      return null;
    }
    setIsLoading(true);
    axios
      .post(`/api/roommateRegister`, { ...data, uid: uid, email: email })
      .then((response) => {
        toast.success('룸메이트 리스팅이 등록되었습니다!');
        setStep(ROOMMATE_REGISTER_STEP.NOTIFICATION);
        roommateRegisterModal.onClose();
        reset();
      })
      .catch((error) => {
        toast.error(`Something went wrong`);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let bodyContent: any;

  if (step == 1) {
    bodyContent = (
      <div className='flex flex-col gap-4 h-auto overflow-y-scroll'>
        <div className='w-full text-center md:text-xl font-bold'>
          룸메찾기 주의사항
        </div>
        <div className='text-sm md:text-base'>
          1. 룸메이트(하우스메이트)를 구하실 때 이용하는 섹션입니다. 혹은
          룸메이트(하우스메이트)를 이 섹션을 통해 먼저 구한 후 함께 렌트할 집을
          찾아나서기도 합니다.
        </div>
        <div className='text-sm md:text-base'>
          2. 본인의 budget, 직장인인지 학생인지 여부, 찾으시는 집 위치,
          입주날짜, 제3자 보증회사 이용 여부(뉴욕에서 렌트시 필수적으로 사용해야
          할 수도 있습니다.) 등 자세히 적어주시면 좋아요.
        </div>
        <div className='text-sm md:text-base'>
          3. 추가로 생활 패턴 (친구들 초대 자주하는지, 집 안에서 신발 신는지 등)
          같이 살면서 맞춰나갔으면 하는 부분까지 입주 전에 맞춰나가면
          금상첨화겠죠!
        </div>
        <div className='text-sm md:text-base'>
          4. 미생은 회원님의 룸메찾기에 대해서 법적인 책임을 지지 않습니다.
          룸메찾기에서 발생하는 모든 사항에 대해 해당 게시글을 작성/이용한
          유저에게 책임이 있습니다.
        </div>
      </div>
    );
  }

  if (step == 2) {
    if (!userPrevListing) {
      bodyContent = (
        <div className='flex flex-col items-center gap-1 w-full'>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div>룸메이트 등록이 처음이시군요?</div>
              <div>룸메이트 등록 평균 소요시간은 약 3분입니다</div>
            </>
          )}
        </div>
      );
    } else {
      const commonCSS =
        'flex justify-center w-full py-1 rounded-lg border border-[#EC662A] text-sm';

      bodyContent = (
        <div className='flex flex-col items-center gap-1'>
          <div>회원님이 등록하신 룸메찾기 리스팅은 현재 아래와 같습니다.</div>
          <div>룸메찾기는 최대 1개만 등록이 가능합니다.</div>
          <div>
            다시 등록을 원하실 경우, 아래 버튼을 통해 삭제 후 재등록을 해주시기
            바랍니다.
          </div>
          <div
            onClick={() => {
              roommateRegisterModal.onClose();
              setStep(1);
              reset();
              router.push('/mypage/roommate-listing');
            }}
            className='w-full border border-[#EC662A] bg-[#EC662A] py-1 mb-2 text-center text-white rounded-xl cursor-pointer hover:shadow-lg'
          >
            클릭하여 삭제 또는 수정하기
          </div>
          <div className='flex flex-col w-full gap-4'>
            <div className='w-full border border-neutral-200 shadow-md flex flex-col items-center rounded-xl py-4 px-1 gap-2'>
              <div className='text-lg font-semibold'>방 정보</div>
              <div className='grid grid-cols-4 w-full px-1 gap-2'>
                <div className={`${commonCSS}`}>{userPrevListing.city}</div>
                <div className={`${commonCSS}`}>{userPrevListing.district}</div>
                <div className={`${commonCSS}`}>
                  $ {userPrevListing.price.toLocaleString()}
                </div>
                <div className={`${commonCSS}`}>{userPrevListing.movedate}</div>
                {/* <div className={`${commonCSS}`}>{userPrevListing.}</div>
                <div className={`${commonCSS}`}>{userPrevListing.}</div>
                <div className={`${commonCSS}`}>{userPrevListing.}</div>
                <div className={`${commonCSS}`}>{userPrevListing.}</div> */}
              </div>
              <div className='text-lg font-semibold mt-2'>본인 정보</div>
              <div className='grid grid-cols-4 w-full px-1 gap-2'>
                <div className={`${commonCSS}`}>
                  {userPrevListing.selfgender}
                </div>
                <div className={`${commonCSS}`}>{userPrevListing.selfage}</div>
                <div className={`${commonCSS}`}>
                  {userPrevListing.selfstatus}
                </div>
                <div className={`${commonCSS}`}>{userPrevListing.selfmbti}</div>
              </div>
              <div className='text-lg font-semibold mt-2'>희망 룸메 정보</div>
              <div className='grid grid-cols-4 w-full px-1 gap-2'>
                <div className={`${commonCSS}`}>{userPrevListing.rmgender}</div>
                <div className={`${commonCSS}`}>{userPrevListing.rmage}</div>
                <div className={`${commonCSS}`}>{userPrevListing.rmstatus}</div>
                <div className={`${commonCSS}`}>{userPrevListing.rmsmoke}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // if (step == 3) {
  //   bodyContent = (
  //     <div className='flex flex-col gap-2 md:gap-4'>
  //       {/* <Heading title='我想选择的服务 (1/7)' /> */}
  //       <Heading title='카테고리를 선택해주세요 (1/7)' />
  //       {ROOMMATE_TYPE.map((item) => {
  //         return (
  //           <CategoryInput
  //             key={item.roommateCategory[0]}
  //             category={item.roommateCategory}
  //             description={item.roommateCategoryDescription}
  //             icon={ICONS[item.icon as keyof typeof ICONS]}
  //             selected={category == item.roommateCategory}
  //             onClick={(category) => setCustomValue('category', category)}
  //           />
  //         );
  //       })}
  //     </div>
  //   );
  // }

  if (step == 3) {
    bodyContent = (
      <div className='flex flex-col gap-2'>
        {/* <Heading title='租房偏好 (2/7)' /> */}
        <Heading title='현재 거주하시는 방 또는 희망하시는 방에 대해 알려주세요 (1/6)' />
        <RmRoomInfo
          city={city}
          register={register}
          errors={errors}
          onChange={(subcat, value) => setCustomValue(subcat, value)}
        />
      </div>
    );
  }

  if (step == 4) {
    bodyContent = (
      <div className='flex flex-col gap-2'>
        {/* <Heading title='个人信息 (3/7)' /> */}
        <Heading title='미생 회원님에 대해 알려주세요 (2/6)' />

        {Object.entries(ROOMMATE_SELF_PRE).map(([key, value]) => (
          <div key={key}>
            <RmSelfPre
              addspace={addSpace}
              selfcategory={key}
              selfinfo={value}
              selectedGender={`${key}${gender}`}
              selectedAge={`${key}${age}`}
              selectedStatus={`${key}${status}`}
              selectedPet={`${key}${pet}`}
              selectedSmoke={`${key}${smoke}`}
              selectedMBTI={`${key}${mbti}`}
              onClick={(subcat, value) => setCustomValue(subcat, value)}
            />
          </div>
        ))}
      </div>
    );
  }

  if (step == 5) {
    bodyContent = (
      <div className='flex flex-col gap-2'>
        {/* <Heading title='室友偏好 (4/7)' /> */}
        <Heading title='찾으시는 룸메이트에 대해 알려주세요 (3/6)' />
        {Object.entries(ROOMMATE_ROOMMATE_PRE).map(([key, value]) => (
          <div key={key}>
            <RmSelfPre
              addspace={addSpace}
              selfcategory={key}
              selfinfo={value}
              selectedRmGender={`${key}${rmgender}`}
              selectedRmAge={`${key}${rmage}`}
              selectedRmStatus={`${key}${rmstatus}`}
              selectedRmPet={`${key}${rmpet}`}
              selectedRmSmoke={`${key}${rmsmoke}`}
              onClick={(subcat, value) => setCustomValue(subcat, value)}
            />
          </div>
        ))}
      </div>
    );
  }

  if (step == 6) {
    bodyContent = (
      <div className='flex flex-col gap-2'>
        {/* <Heading
          title='个人简介 (5/7)'
          subtitle='米生已为您生成个人简介，可点击修改'
        /> */}
        <Heading
          title='간략한 자기소개입니다. (4/6)'
          subtitle='기본으로 제공되는 자기소개 이외에 수정하고 싶으신 부분이 있으시면 수정하여 주시기 바랍니다.'
        />
        <div className='h-[420px] sm:h-[240px]'>
          <Textarea
            id={'description'}
            value={description}
            onChange={(value) => {
              setCustomValue('description', value);
            }}
            small
          />
        </div>
      </div>
    );
  }

  if (step == 7) {
    bodyContent = (
      <div className='flex flex-col gap-2'>
        {/* <Heading
          title='联系方式 (7/7)'
          subtitle={`请至少输入一种联系方式。我们不会发送任何广告信息。`}
        /> */}
        <Heading
          title='선호하시는 연락방식을 입력하여 주세요 (6/6)'
          subtitle={`최소한 한 가지 이상의 연락 방식은 입력해 주시기 바랍니다. 원치 않는 연락 방식은 해당 항목은 비워두시기 바랍니다. 다양한 연락방식은 회원님의 리스팅에 대한 접근성을 높여 더 많은 연락을 받으실 수 있습니다.`}
        />
        <div className='flex flex-col gap-4 mt-4'>
          <Input
            id={'email'}
            label={'이메일'}
            register={register}
            errors={errors}
            length={36}
            emailValue={currentUser && currentUser.email}
            disabled={currentUser != null}
          />
          <Input
            id={'phone'}
            label={'핸드폰'}
            length={13}
            register={register}
            errors={errors}
          />
          <Input
            id={'kakaoId'}
            label={'카카오톡 아이디'}
            length={13}
            register={register}
            errors={errors}
          />
        </div>
      </div>
    );
  }

  let footerContent = (
    <div className='flex flex-row justify-between gap-8'>
      {step > 1 && <Button onClick={onBack} label={'Back'} />}
      {step < 7 && <Button onClick={onNext} label={'Next'} />}
      {step == 7 && !userPrevListing && (
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
      isOpen={roommateRegisterModal.isOpen}
      onClose={roommateRegisterModal.onClose}
      title={'룸메찾기 등록하기'}
      body={bodyContent}
      footer={footerContent}
      loadingScreen={
        <LoadingScreen
          messagetitle='요청하신 리스팅을 등록 중입니다.'
          messagesubtitle='잠시만 기다려 주십시오.'
        />
      }
    />
  );
};
export default RoommateRegisterModal;
