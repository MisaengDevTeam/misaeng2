'use client';
import { ROOMMATE_ROOM_INFO, ROOMMATE_MAP } from '@/types/RoommateTypes';
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
  city: string | null;
  onChange: (subcat: string, value: any) => void;
  register: UseFormRegister<FieldValues>;
  emailValue?: string;
  errors: FieldValues;
}

const RmRoomInfo: React.FC<RmRoomInfoProps> = ({
  city,
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

  const cityOptions = Object.keys(ROOMMATE_MAP).map((key) => ({
    value: key,
    label: key,
  }));
  const districtOptions = ROOMMATE_MAP[city as keyof typeof ROOMMATE_MAP];

  return (
    <div className='flex flex-col px-4 gap-4'>
      <Input
        type='number'
        id={'price'}
        // label={'预算'}
        label={'희망하시는 가격을 알려주세요'}
        register={register}
        errors={errors}
        formatPrice
        required
        small
      />
      <SelectComp
        small
        // placeholder={'房间类型'}
        placeholder={'방 종류'}
        options={createOptions(roomtypeArr)}
        onChange={(value) => onChange('roomtype', value)}
      />
      <div className='flex flex-row justify-between w-full items-center border-[1px] border-neutral-300 py-2 px-4 rounded-lg gap-4'>
        {/* <p className='w-[160px]'>入住日期</p> */}
        <p className='w-[160px]'>희망 입주 일자</p>
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
        small
        // placeholder={'房间类型'}
        placeholder={'거주 기간'}
        options={createOptions(lengthArr)}
        onChange={(value) => onChange('length', value)}
      />

      {/* <Heading
          title='请选择以下地点偏好 (6/7)'
          subtitle='如果您选择了个人转租选项， 请填写现在公寓的大致地点'
        /> */}

      <SelectComp
        small
        placeholder='City'
        options={cityOptions}
        onChange={(value) => {
          onChange('city', value);
        }}
      />
      {city && (
        <SelectComp
          small
          placeholder='District'
          options={districtOptions}
          onChange={(value) => onChange('district', value)}
        />
      )}
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
