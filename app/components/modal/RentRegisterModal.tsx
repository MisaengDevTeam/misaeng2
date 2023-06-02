'use client';

import { useSession } from 'next-auth/react';
import Modal from './Modal';
import useRentRegisterModal from '../hooks/useRentRegisterModal';
import { useState } from 'react';
import Button from '../Button';
import { FieldValues, useForm } from 'react-hook-form';
import RentModalCategory from './rent/RentModalCategory';
import RentModalRoomInfo from './rent/RentModalRoomInfo';
import RentModalMap from './rent/RentModalMap';
import RentModalAmenity from './rent/RentModalAmenity';
import RentModalPicture from './rent/RentModalPicture';
import RentModalContact from './rent/RentModalContact';

interface RentRegisterModalProps {}

enum RENT_REGISTER_STEP {
  CATEGORY = 1,
  ROOMINFO,
  MAP,
  PICTURE,
  AMENITY,
  CONTACT,
}

const RentRegisterModal: React.FC<RentRegisterModalProps> = ({}) => {
  const [step, setStep] = useState(RENT_REGISTER_STEP.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const currentUser = session?.user;

  const rentRegisterModal = useRentRegisterModal();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      price: null,
      bed: '',
      bath: '',
      address: '',
      unit: '',
      category: '',
      bfee: '',
      pictures: [],
      amenity: [],
      feature: [],
      uid: '',
      bid: '',
      movedate: '',
      email: '',
      phone: '',
      kakaoId: '',
    },
  });

  const category = watch('category');

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
    const newStep = step == 6 ? 6 : step + 1;

    setStep(newStep);
  };

  const bodyContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <RentModalCategory setValue={setCustomValue} category={category} />
        );
      case 2:
        return (
          <RentModalRoomInfo
            register={register}
            errors={errors}
            onChange={() => {}}
          />
        );
      case 3:
        return (
          <RentModalMap
            register={register}
            errors={errors}
            onChange={() => {}}
          />
        );
      case 4:
        return <RentModalAmenity />;
      case 5:
        return <RentModalPicture />;
      case 6:
        return <RentModalContact />;

      default:
        return 'Error';
    }
  };

  let footerContent = (
    <div className='flex flex-row justify-between gap-8'>
      {step > 1 && <Button onClick={onBack} label={'Back'} />}
      {step < 6 && <Button onClick={onNext} label={'Next'} />}
      {step == 6 && (
        <Button
          disabled={isLoading}
          onClick={
            () => {}
            // handleSubmit(onSubmit)
          }
          label={'Submit'}
        />
      )}
    </div>
  );

  return (
    <Modal
      isOpen={rentRegisterModal.isOpen}
      onClose={rentRegisterModal.onClose}
      title={'렌트 리스팅 등록하기'}
      body={bodyContent(step)}
      footer={footerContent}
    />
  );
};
export default RentRegisterModal;
