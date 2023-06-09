'use client';

import {
  RegisterOptions,
  FieldValues,
  UseFormRegisterReturn,
  useForm,
  SubmitHandler,
} from 'react-hook-form';

import Input from '../inputs/Input';
import Select from 'react-select';
import RentSearchSelect from '../inputs/RentSearchSelect';

interface RentSearchBarProps {
  isSearchOn: boolean;
}

const RentSearchBar: React.FC<RentSearchBarProps> = ({ isSearchOn }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      price: null,
    },
  });

  return (
    <div
      className={`absolute flex w-full bg-white transition duration-100
${isSearchOn ? 'opacity-100 h-auto' : 'opacity-0 h-[0px]'}
`}
    >
      <div className='grid xl:flex grid-cols-3 lg:grid-cols-4 xl:flex-row justify-center pl-[56px] md:pl-[72px] py-4 pr-4 gap-2 md:gap-x-4 md:gap-y-2'>
        <div className='relative w-auto h-auto'>
          <input
            type='number'
            id='min-price'
            min={500}
            max={15000}
            step={100}
            placeholder='최저가'
            className='relative w-[100%] h-[100%] border-[1px] border-neutral-300 rounded-md py-1 px-4 text-sm text-end'
          />
          <label htmlFor='min-price' className='absolute top-2 left-2'>
            $
          </label>
        </div>
        <RentSearchSelect placeholder={'침실'} />
        <RentSearchSelect placeholder={'화장실'} />
        <RentSearchSelect placeholder={'지하철'} />
        <RentSearchSelect placeholder={'평점'} />
        <RentSearchSelect placeholder={'기간'} />
      </div>
    </div>
  );
};
export default RentSearchBar;
