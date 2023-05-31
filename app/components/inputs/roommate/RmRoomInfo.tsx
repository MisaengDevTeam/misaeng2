'use client';
import { ROOMMATE_ROOM_INFO } from '@/types/RoommateTypes';
import SelectComp from '../SelectComp';
import { useCallback } from 'react';
import Input from '../Input';
import {
  RegisterOptions,
  FieldValues,
  UseFormRegisterReturn,
  UseFormRegister,
  Controller,
} from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Textarea from '../Textarea';

interface RmRoomInfoProps {
  roomtype: string;
  price: number;
  length: number;
  movedate: string;
  description: string;
  onChange: (subcat: string, value: any) => void;
  register: UseFormRegister<FieldValues>;
  emailValue?: string;
  errors: FieldValues;
}

const RmRoomInfo: React.FC<RmRoomInfoProps> = ({
  roomtype,
  price,
  length,
  movedate,
  description,
  onChange,
  register,
  errors,
}) => {
  const { roomtypeArr, utilityArr, lengthArr } = ROOMMATE_ROOM_INFO;
  const createOptions = useCallback(
    (arr: any[]) => arr.map((item) => ({ value: item, label: item })),
    []
  );

  return (
    <div className='flex flex-col px-4 gap-4'>
      <Input
        type='number'
        id={'price'}
        label={'희망하시는 가격을 알려주세요'}
        register={register}
        errors={errors}
        formatPrice
        required
      />
      <SelectComp
        placeholder={'방 종류'}
        options={createOptions(roomtypeArr)}
        onChange={(value) => onChange('roomtype', value)}
        small
      />
      <SelectComp
        placeholder={'희망 기간'}
        options={createOptions(lengthArr)}
        onChange={(value) => onChange('length', value)}
        small
      />
      <SelectComp
        placeholder={'유틸리티'}
        options={createOptions(utilityArr)}
        onChange={(value) => onChange('utility', value)}
        small
      />
      <Textarea
        id={'description'}
        label={'description'}
        register={register}
        placeholer='회원님의 자기소개 또는 방에 대한 간략한 내용을 입력해주세요'
        errors={errors}
        small
      />
    </div>
  );
};
export default RmRoomInfo;
