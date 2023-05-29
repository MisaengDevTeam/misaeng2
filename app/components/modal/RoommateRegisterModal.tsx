'use client';

import { MouseEvent, useState } from 'react';
import useRoommateRegisterModal from '../hooks/useRoommateRegisterModal';
import Modal from './Modal';
import {
  ROOMMATE_TYPE,
  ROOMMATE_SELF_PRE,
  ROOMMATE_ROOMMATE_PRE,
} from '@/types/RoommateTypes';

import RmCategoryInput from '../inputs/RmCategoryInput';
import Heading from '../Heading';
import { IconType } from 'react-icons';
import { SlPeople } from 'react-icons/sl';
import { BsHouseUp } from 'react-icons/bs';
import { SlPencil } from 'react-icons/sl';
import { FieldValues, useForm } from 'react-hook-form';
import Button from '../Button';
import RmSelfPre from '../inputs/RmSelfPre';

interface RoommateRegisterModalProps {}

enum ROOMMATE_REGISTER_STEP {
  CATEGORY = 1,
  ROOMINFO,
  SELFPRE,
  ROOMMAETPRE,
  CONTACT,
}

const ICONS: { [key: string]: IconType } = {
  SlPeople,
  BsHouseUp,
  SlPencil,
};

const RoommateRegisterModal: React.FC<RoommateRegisterModalProps> = ({}) => {
  const roommateRegisterModal = useRoommateRegisterModal();

  const [step, setStep] = useState(ROOMMATE_REGISTER_STEP.CATEGORY);

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
      성별: '',
      연령대: '',
      학생: '',
      반려동물: '',
      흡연여부: '',
      MBTI: '',
    },
  });

  const category = watch('category');
  const gender = watch('성별');
  const age = watch('연령대');
  const status = watch('학생');
  const pet = watch('반려동물');
  const smoke = watch('흡연여부');
  const mbti = watch('MBTI');

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
    const newStep = step == 5 ? 5 : step + 1;
    setStep(newStep);
  };

  let bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='카테고리를 선택해주세요 (1/5)' />
      {ROOMMATE_TYPE.map((item) => {
        return (
          <RmCategoryInput
            key={item.roommateCategory[0]}
            roommateCategory={item.roommateCategory}
            roommateCategoryDescription={item.roommateCategoryDescription}
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
        <Heading title='미생 회원님에 대해 알려주세요 (2/5)' />

        {Object.entries(ROOMMATE_SELF_PRE).map(([key, value]) => (
          <div key={key}>
            <RmSelfPre
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

  if (step == 3) {
    bodyContent = (
      <div className='flex flex-col gap-2'>
        <Heading title='찾으시는 룸메이트에 대해 알려주세요 (3/5)' />
        {Object.entries(ROOMMATE_ROOMMATE_PRE).map(([key, value]) => (
          <div key={key}>
            <RmSelfPre
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

  let footerContent = (
    <div className='flex flex-row justify-between gap-8'>
      {step > 1 && <Button onClick={onBack} label={'Back'} />}
      {step < 5 && <Button onClick={onNext} label={'Next'} />}
      {step == 5 && <Button onClick={() => {}} label={'Submit'} />}
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
