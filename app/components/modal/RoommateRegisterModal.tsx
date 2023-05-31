'use client';

import { MouseEvent, useState } from 'react';
import useRoommateRegisterModal from '../hooks/useRoommateRegisterModal';
import Modal from './Modal';
import {
  ROOMMATE_TYPE,
  ROOMMATE_SELF_PRE,
  ROOMMATE_ROOMMATE_PRE,
  ROOMMATE_MAP,
} from '@/types/RoommateTypes';

import RmCategoryInput from '../inputs/roommate/RmCategoryInput';
import Heading from '../Heading';
import { IconType } from 'react-icons';
import { SlPeople } from 'react-icons/sl';
import { BsHouseUp } from 'react-icons/bs';
import { SlPencil } from 'react-icons/sl';
import {
  FieldValues,
  RegisterOptions,
  UseFormRegisterReturn,
  useForm,
} from 'react-hook-form';
import Button from '../Button';
import RmSelfPre from '../inputs/roommate/RmSelfPre';
import Input from '../inputs/Input';
import SelectComp from '../inputs/SelectComp';
import RmRoomInfo from '../inputs/roommate/RmRoomInfo';

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
      roomtype: '',
      price: 0,
      length: 0,
      movedate: '',
      description: '',
      amenity: '',
      feature: '',
      본인성별: '',
      본인연령대: '',
      본인학생: '',
      본인반려동물: '',
      본인흡연여부: '',
      본인MBTI: '',
      룸메이트성별: '',
      룸메이트연령대: '',
      룸메이트학생: '',
      룸메이트반려동물: '',
      룸메이트흡연여부: '',
      city: null,
      district: '',
    },
  });

  const category = watch('category');
  const roomtype = watch('roomtype');
  const price = watch('price');
  const length = watch('length');
  const movedate = watch('movedate');
  const description = watch('description');
  const amenity = watch('amenity');
  const feature = watch('feature');
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
  const city = watch('city') as string;

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
    const newStep = step == 5 ? 5 : step + 1;
    setStep(newStep);
  };

  function addSpace(str: string) {
    return str.slice(0, 2) + ' ' + str.slice(2);
  }

  let bodyContent = (
    <div className='flex flex-col gap-2 md:gap-4'>
      <Heading title='카테고리를 선택해주세요 (1/6)' />
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
        <Heading title='현재 거주하시는 방 또는 희망하시는 방에 대해 알려주세요 (2/6)' />
        <RmRoomInfo
          roomtype={roomtype}
          price={price}
          length={length}
          description={description}
          register={register}
          errors={errors}
          movedate={movedate}
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
            id={'이메일'}
            label={'이메일'}
            register={register}
            errors={errors}
            required
            // emailValue={email}
          />
          <Input
            id={'핸드폰'}
            label={'핸드폰'}
            register={register}
            errors={errors}
          />
          <Input
            id={'카카오톡 아이디'}
            label={'카카오톡 아이디'}
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
