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

interface RoommateRegisterModalProps {}

enum ROOMMATE_REGISTER_STEP {
  CATEGORY = 1,
  ROOMINFO,
  SELFPRE,
  ROOMMATEPRE,
  LOCATION,
  CONTACT,
}

const ICONS: { [key: string]: IconType } = {
  SlPeople,
  BsHouseUp,
  SlPencil,
};

const RoommateRegisterModal: React.FC<RoommateRegisterModalProps> = ({}) => {
  const { data: session } = useSession();
  const currentUser = session?.user;
  const uid = currentUser?.id;
  const email = currentUser?.email;

  const roommateRegisterModal = useRoommateRegisterModal();

  const [step, setStep] = useState(ROOMMATE_REGISTER_STEP.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

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

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    const newStep = step == 1 ? 1 : step - 1;
    setStep(newStep);
  };

  const onNext = () => {
    if (step == 1 && validateInput([category])) {
      toast.error('카테고리를 선택해주세요');
      return null;
    }

    if (step == 2 && validateInput([price, length, movedate, description])) {
      toast.error('모든 항목을 선택/작성 해주세요');
      return null;
    }

    if (step == 3 && validateInput([gender, age, status, pet, smoke, mbti])) {
      toast.error('반드시 한 가지씩 선택 해주세요');
      return null;
    }

    if (
      step == 4 &&
      validateInput([rmgender, rmage, rmstatus, rmpet, rmsmoke])
    ) {
      toast.error('반드시 한 가지씩 선택 해주세요');
      return null;
    }

    if (step == 5 && validateInput([city, district])) {
      toast.error('지역을 선택해주세요');
      return null;
    }

    const newStep = step == 6 ? 6 : step + 1;

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
        console.log(response);
        toast.success('룸메이트 리스팅이 등록되었습니다!');
        setStep(ROOMMATE_REGISTER_STEP.CATEGORY);
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

  let bodyContent = (
    <div className='flex flex-col gap-2 md:gap-4'>
      <Heading title='카테고리를 선택해주세요 (1/6)' />
      {ROOMMATE_TYPE.map((item) => {
        return (
          <CategoryInput
            key={item.roommateCategory[0]}
            category={item.roommateCategory}
            description={item.roommateCategoryDescription}
            icon={ICONS[item.icon as keyof typeof ICONS]}
            selected={category == item.roommateCategory}
            onClick={(category) => setCustomValue('category', category)}
          />
        );
      })}
    </div>
  );

  if (step == 2) {
    bodyContent = (
      <div className='flex flex-col gap-2'>
        <Heading title='현재 거주하시는 방 또는 희망하시는 방에 대해 알려주세요 (2/6)' />
        <RmRoomInfo
          register={register}
          errors={errors}
          onChange={(subcat, value) => setCustomValue(subcat, value)}
        />
      </div>
    );
  }

  if (step == 3) {
    bodyContent = (
      <div className='flex flex-col gap-2'>
        <Heading title='미생 회원님에 대해 알려주세요 (3/6)' />

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

  if (step == 4) {
    bodyContent = (
      <div className='flex flex-col gap-2'>
        <Heading title='찾으시는 룸메이트에 대해 알려주세요 4/6)' />
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

  const cityOptions = Object.keys(ROOMMATE_MAP).map((key) => ({
    value: key,
    label: key,
  }));
  const districtOptions = ROOMMATE_MAP[city as keyof typeof ROOMMATE_MAP];

  if (step == 5) {
    bodyContent = (
      <div className='flex flex-col gap-2'>
        <Heading
          title='현재 거주하시는 위치 또는 방을 찾으시는 위치를 선택해주세요 (5/6)'
          subtitle='저희 미생은 회원님의 개인정보보호 및 안전을 위하여 정확한 주소를 묻지 않습니다.'
        />
        <SelectComp
          placeholder='City'
          options={cityOptions}
          onChange={(value) => {
            setCustomValue('city', value);
          }}
        />
        {city && (
          <SelectComp
            placeholder='District'
            options={districtOptions}
            onChange={(value) => setCustomValue('district', value)}
          />
        )}
      </div>
    );
  }

  if (step == 6) {
    bodyContent = (
      <div className='flex flex-col gap-2'>
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
      {step < 6 && <Button onClick={onNext} label={'Next'} />}
      {step == 6 && (
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
    />
  );
};
export default RoommateRegisterModal;
