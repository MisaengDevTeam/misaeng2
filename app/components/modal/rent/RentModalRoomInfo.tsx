'use client';

import { FieldValues, UseFormRegister } from 'react-hook-form';
import Heading from '../../Heading';
import Input from '../../inputs/Input';
import SelectComp from '../../inputs/SelectComp';
import { ROOM_TYPE } from '@/types/RentTypes';
import DatePicker from 'react-datepicker';
import dateFormatter from '@/app/lib/dateFormatter';

import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import Textarea from '../../inputs/Textarea';

interface RentModalRoomInfoProps {
  onChange: (subcat: string, value: any) => void;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
}

const RentModalRoomInfo: React.FC<RentModalRoomInfoProps> = ({
  register,
  errors,
  onChange,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <Heading title='렌트하실 방에 대해 알려주세요 (2/6)' />
      <div className='mb-2'>
        <Input
          id={'title'}
          label={'제목'}
          length={32}
          register={register}
          errors={errors}
          onChange={(e) => onChange('title', e.currentTarget.value)}
        />
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <Input
          type='number'
          id={'price'}
          label={'Price'}
          maxNumber={15000}
          register={register}
          errors={errors}
          onChange={(e) => onChange('price', e.currentTarget.value)}
          formatPrice
        />
        <Input
          id={'unit'}
          label={'Unit #'}
          length={5}
          register={register}
          errors={errors}
          onChange={(e) => onChange('unit', e.currentTarget.value)}
        />
        <SelectComp
          placeholder={'침실 수'}
          options={ROOM_TYPE.bedroom.map((value) => ({
            value,
            label: value,
          }))}
          onChange={(value) => onChange('bed', value)}
        />
        <SelectComp
          placeholder={'화장실 수'}
          options={ROOM_TYPE.bathroom.map((value) => ({
            value,
            label: value,
          }))}
          onChange={(value) => onChange('bath', value)}
        />

        <SelectComp
          placeholder={'중개비'}
          options={ROOM_TYPE.bfee.map((value) => ({
            value,
            label: value,
          }))}
          onChange={(value) => onChange('bfee', value)}
        />
        <SelectComp
          placeholder={'유틸리티'}
          options={ROOM_TYPE.utility.map((value) => ({
            value,
            label: value,
          }))}
          onChange={(value) => onChange('utility', value)}
        />
      </div>
      <div className='flex flex-row justify-between w-full items-center border-[1px] border-neutral-300 my-2 p-4 rounded-lg gap-4'>
        <p className='w-[160px]'>입주 가능일</p>
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
      <Textarea
        id={'description'}
        onChange={(value) => onChange('description', value)}
        placeholer='방에 대한 간략한 내용을 입력해주세요'
        small
      />
    </div>
  );
};
export default RentModalRoomInfo;
