'use client';

import { MouseEvent, useEffect, useMemo, useState } from 'react';
import useBuySellRegisterModal from '../hooks/useBuySellRegisterModal';
import Modal from './Modal';

// Submit form
import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  UseFormRegisterReturn,
  useForm,
} from 'react-hook-form';

// Types
import { BUY_SELL_CATEGORY } from '@/types/BuySellTypes';
import Button from '../Button';
import Heading from '../Heading';
import SelectComp from '../inputs/SelectComp';
import { useSession } from 'next-auth/react';
import Input from '../inputs/Input';
import Textarea from '../inputs/Textarea';
import MapComponent from '../Map';
import RentModalPicture from './rent/RentModalPicture';
import BuySellRegiPicture from './buysellregister/BuySellRegiPicture';

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
  const [isLoading, setIsLoading] = useState(false);

  // Session
  const { data: session } = useSession();
  const currentUser = session?.user;

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
      pictures: '',
    },
  });

  const pictures = watch('pictures');

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

  const onBack = () => {
    const newStep = step == 1 ? 1 : step - 1;
    setStep(newStep);
  };

  const onNext = () => {
    // if (step == 1 && validateInput([category])) {
    //   toast.error('카테고리를 선택해주세요');
    //   return null;
    // }

    // if (step == 2 && validateInput([price, length, movedate, description])) {
    //   toast.error('모든 항목을 선택/작성 해주세요');
    //   return null;
    // }

    // if (step == 3 && validateInput([gender, age, status, pet, smoke, mbti])) {
    //   toast.error('반드시 한 가지씩 선택 해주세요');
    //   return null;
    // }

    // if (
    //   step == 4 &&
    //   validateInput([rmgender, rmage, rmstatus, rmpet, rmsmoke])
    // ) {
    //   toast.error('반드시 한 가지씩 선택 해주세요');
    //   return null;
    // }

    // if (step == 5 && validateInput([city, district])) {
    //   toast.error('지역을 선택해주세요');
    //   return null;
    // }

    const newStep = step == 5 ? 5 : step + 1;

    setStep(newStep);
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
              }}
            />
            <SelectComp
              placeholder='소분류'
              options={subCategoryOptions}
              onChange={() => {}}
            />
          </div>
        );
      case 2:
        return (
          <div className='flex flex-col gap-2 md:gap-4'>
            <Heading title='상품에 대해서 설명해주세요 (2/5)' />
            <Input
              id={'title'}
              label={'제목'}
              register={register}
              length={32}
              errors={errors}
            />
            <Input
              type='number'
              id={'price'}
              label={'가격'}
              register={register}
              errors={errors}
              formatPrice
            />
            <SelectComp
              placeholder={'물건 상태'}
              options={[]}
              onChange={() => {}}
            />
            <Textarea
              id={'description'}
              placeholer='상품에 대한 상세설명을 적어주세요'
              onChange={() => {}}
            />
          </div>
        );
      case 3:
        return (
          <div className='flex flex-col gap-2 md:gap-4'>
            <Heading title='회원님의 대략적 위치를 알려주세요 (3/5)' />
            <div className='flex gap-2'>
              <div className='w-[80%]'>
                <Input
                  id={'address'}
                  label={'도로명 주소'}
                  register={register}
                  errors={errors}
                />
              </div>
              <div className='w-[20%]'>
                <Button onClick={() => {}} label={'검색'} />
              </div>
            </div>
            <MapComponent initCoordinate={[-73.9917399, 40.748456]} showRange />
          </div>
        );
      case 4:
        return (
          <div className='flex flex-col gap-2 md:gap-4'>
            <Heading title='판매하시는 상품 사진을 올려주세요 (4/5)' />
            <BuySellRegiPicture
              onChange={(value) => setCustomValue('pictures', value)}
            />
          </div>
        );
      case 5:
        return (
          <div className='flex flex-col gap-2 md:gap-4'>
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
    subCategoryOptions,
    register,
    errors,
    currentUser,
  ]);

  const footerContent = (
    <div className='flex flex-row justify-between gap-8'>
      {step > 1 && <Button onClick={onBack} label={'Back'} />}
      {step < 5 && <Button onClick={onNext} label={'Next'} />}
      {step == 5 && (
        <Button
          disabled={isLoading}
          onClick={
            () => {
              console.log('submitted');
            }
            // handleSubmit(onSubmit)
          }
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
