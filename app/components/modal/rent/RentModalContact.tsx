'use client';

import { FieldValues, UseFormRegister } from 'react-hook-form';
import Heading from '../../Heading';
import Input from '../../inputs/Input';

interface RentModalContactProps {
  onChange: (subcat: string, value: any) => void;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  currentUser: any;
}

const RentModalContact: React.FC<RentModalContactProps> = ({
  onChange,
  register,
  errors,
  currentUser,
}) => {
  return (
    <div>
      <Heading
        title='선호하시는 연락방식을 입력하여 주세요 (6/6)'
        subtitle='최소한 한 가지 이상의 연락 방식은 입력해 주시기 바랍니다. 원치 않는 연락 방식은 해당 항목은 비워두시기 바랍니다. 다양한 연락방식은 회원님의 리스팅에 대한 접근성을 높여 더 많은 연락을 받으실 수 있습니다.'
      />

      <div className='flex flex-col gap-4 mt-4'>
        <Input
          id={'email'}
          label={'이메일'}
          register={register}
          errors={errors}
          length={36}
          emailValue={currentUser && currentUser.email}
          disabled={currentUser ?? null}
        />
        <Input
          id={'phone'}
          label={'핸드폰'}
          length={13}
          register={register}
          errors={errors}
          onChange={(e) => onChange('phone', e.currentTarget.value)}
        />
        <Input
          id={'kakaoId'}
          label={'카카오톡 아이디'}
          length={13}
          register={register}
          errors={errors}
          onChange={(e) => onChange('kakaoId', e.currentTarget.value)}
        />
      </div>
    </div>
  );
};
export default RentModalContact;
