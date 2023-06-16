'use client';
import { ROOMMATE_ROOM_INFO } from '@/types/RoommateTypes';
import SelectComp from '../SelectComp';
import { useCallback, useState } from 'react';
import Input from '../Input';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import Textarea from '../Textarea';
import DatePicker from 'react-datepicker';
import dateFormatter from '@/app/lib/dateFormatter';

import 'react-datepicker/dist/react-datepicker.css';

interface RmRoomInfoProps {
  onChange: (subcat: string, value: any) => void;
  register: UseFormRegister<FieldValues>;
  emailValue?: string;
  errors: FieldValues;
}

const RmRoomInfo: React.FC<RmRoomInfoProps> = ({
  onChange,
  register,
  errors,
}) => {
  const [startDate, setStartDate] = useState(new Date());

  const { roomtypeArr, lengthArr } = ROOMMATE_ROOM_INFO;
  const createOptions = useCallback(
    (arr: any[]) => arr.map((item) => ({ value: item, label: item })),
    []
  );

  return (
    <div className='flex flex-col px-4 gap-4'>
      <Input
        type='number'
        id={'price'}
        label={'预算'}
        // label={'희망하시는 가격을 알려주세요'}
        register={register}
        errors={errors}
        formatPrice
        required
      />
      <SelectComp
        placeholder={'房间类型'}
        // placeholder={'방 종류'}
        options={createOptions(roomtypeArr)}
        onChange={(value) => onChange('roomtype', value)}
        small
      />
      <div className='flex flex-row justify-between w-full items-center border-[1px] border-neutral-300 py-2 px-4 rounded-lg gap-4'>
        <p className='w-[160px]'>入住日期</p>
        {/* <p className='w-[160px]'>희망 입주 일자</p> */}
        <DatePicker
          className='w-full focus:outline-none focus:bg-neutral-100'
          selected={startDate}
          minDate={new Date()}
          onChange={(date: Date) => {
            setStartDate(date);
            onChange('movedate', dateFormatter(date));
          }}
        />
      </div>
      <SelectComp
        placeholder={'租房时长'}
        // placeholder={'희망 기간'}
        options={createOptions(lengthArr)}
        onChange={(value) => onChange('length', value)}
        small
      />
      {/* <Textarea
        id={'description'}
        onChange={(value) => onChange('description', value)}
        placeholer='회원님의 자기소개 또는 방에 대한 간략한 내용을 입력해주세요'
        small
      /> */}
    </div>
  );
};
export default RmRoomInfo;
