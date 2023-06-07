'use client';

import {
  FieldValues,
  RegisterOptions,
  UseFormRegisterReturn,
  useForm,
} from 'react-hook-form';
import Container from './Container';

import SelectComp from './inputs/SelectComp';
import { ROOM_TYPE, RENT_TYPE } from '@/types/RentTypes';
import Input from './inputs/Input';
import { MouseEvent, useState } from 'react';
import {
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardDoubleArrowDown,
} from 'react-icons/md';
import Button from './Button';

interface SearchbarProps {}

const Searchbar: React.FC<SearchbarProps> = ({}) => {
  const [isSearchbarOpen, setIsSearchbarOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {},
  });
  return (
    <div className='w-full shadow-md border-b-[1px] border-neutral-300'>
      <Container>
        <div
          className={`flex flex-col justify-center items-center py-4 sm:flex-row gap-2 sm:gap-6 sm:flex sm:opacity-100 transition  border-b-[1px] border-neutral-300
          ${isSearchbarOpen ? 'flex opacity-100' : 'hidden opacity-0'}
          `}
        >
          <div className='flex flex-row gap-4 w-[80%] sm:w-auto'>
            <Input
              id={'min'}
              type='number'
              label={'최저'}
              register={register}
              errors={errors}
              length={5}
              formatPrice
              small
              searchbar
            />
            <Input
              id={'max'}
              type='number'
              label={'최고'}
              length={5}
              register={register}
              errors={errors}
              formatPrice
              small
              searchbar
            />
          </div>
          <div className='w-[80%] sm:w-auto'>
            <SelectComp
              placeholder={'렌트 카테고리'}
              options={RENT_TYPE.map((item) => ({
                label: item.rentCategory,
                value: item.rentCategory,
              }))}
              onChange={() => {}}
              small
            />
          </div>
          <div className='w-[80%] sm:w-auto'>
            <SelectComp
              placeholder={'침실 수'}
              options={ROOM_TYPE.bedroom.map((value) => ({
                value,
                label: value,
              }))}
              onChange={() => {}}
              small
            />
          </div>
          <div className='w-[80%] sm:w-auto'>
            <SelectComp
              placeholder={'욕실 수'}
              options={ROOM_TYPE.bathroom.map((value) => ({
                value,
                label: value,
              }))}
              onChange={() => {}}
              small
            />
          </div>
          <div className='w-[80%] sm:w-auto'>
            <Button
              onClick={() => setIsSearchbarOpen(!isSearchbarOpen)}
              label={'리스팅 검색하기'}
            />
          </div>
        </div>
        <div
          onClick={() => setIsSearchbarOpen(!isSearchbarOpen)}
          className={`flex justify-center py-2 sm:hidden w-full h-full z-20`}
        >
          {isSearchbarOpen ? (
            <div className='flex flex-row items-center'>
              <span>클릭하여 검색창 닫기</span>{' '}
              <MdOutlineKeyboardDoubleArrowUp size={20} />
            </div>
          ) : (
            <div className='flex flex-row w-full h-full items-center justify-center'>
              <span>클릭하여 검색창 열기</span>
              <MdOutlineKeyboardDoubleArrowDown size={20} />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
export default Searchbar;
