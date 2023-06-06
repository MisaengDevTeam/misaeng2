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

interface SearchbarProps {}

const Searchbar: React.FC<SearchbarProps> = ({}) => {
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
    <div className='w-full shadow-md'>
      <Container>
        <div className='flex flex-row gap-4 py-2 justify-center gap-6'>
          <div className='flex flex-row gap-4'>
            <Input
              id={'min'}
              type='number'
              label={'최저'}
              register={register}
              errors={errors}
              length={5}
              formatPrice
              small
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
            />
          </div>
          <SelectComp
            placeholder={'렌트 카테고리'}
            options={RENT_TYPE.map((item) => ({
              label: item.rentCategory,
              value: item.rentCategory,
            }))}
            onChange={() => {}}
            small
          />
          <SelectComp
            placeholder={'침실 수'}
            options={ROOM_TYPE.bedroom.map((value) => ({
              value,
              label: value,
            }))}
            onChange={() => {}}
            small
          />
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
      </Container>
    </div>
  );
};
export default Searchbar;
