'use client';

import { useSession } from 'next-auth/react';
import Modal from './Modal';
import useRentRegisterModal from '../hooks/useRentRegisterModal';
import { useState } from 'react';
import Button from '../Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import RentModalCategory from './rent/RentModalCategory';
import RentModalRoomInfo from './rent/RentModalRoomInfo';
import RentModalMap from './rent/RentModalMap';
import RentModalAmenity from './rent/RentModalAmenity';
import RentModalPicture from './rent/RentModalPicture';
import RentModalContact from './rent/RentModalContact';
import axios from 'axios';
import toast from 'react-hot-toast';

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
      coordinate: [],
      uid: currentUser?.id,
      bid: '',
      movedate: new Date().toString(),
      email: currentUser?.email,
      phone: '',
      kakaoId: '',
    },
  });

  const category = watch('category');
  const address = watch('address');
  const movedate = watch('movedate');
  const amenity = watch('amenity');
  const feature = watch('feature');
  const pictures = watch('pictures');

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // if (step != ROOMMATE_REGISTER_STEP.CONTACT) {
    //   return null;
    // }
    setIsLoading(true);
    axios
      .post(`/api/rentRegister`, data)
      .then((response) => {
        toast.success('룸메이트 리스팅이 등록되었습니다!');
        console.log(response);
        setStep(RENT_REGISTER_STEP.CATEGORY);
        rentRegisterModal.onClose();
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
            onChange={(subcat, value) => setCustomValue(subcat, value)}
          />
        );
      case 3:
        return (
          <RentModalMap
            register={register}
            errors={errors}
            onChange={(subcat, value) => setCustomValue(subcat, value)}
          />
        );
      case 4:
        return (
          <RentModalAmenity
            register={register}
            errors={errors}
            amenity={amenity}
            feature={feature}
            onChange={(subcat, value) => setCustomValue(subcat, value)}
          />
        );
      case 5:
        return (
          <RentModalPicture
            imageSrc={pictures}
            onChange={(value) => setCustomValue('pictures', value)}
          />
        );
      case 6:
        return (
          <RentModalContact
            register={register}
            errors={errors}
            onChange={(subcat, value) => setCustomValue(subcat, value)}
            currentUser={currentUser}
          />
        );

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
          onClick={handleSubmit(onSubmit)}
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
