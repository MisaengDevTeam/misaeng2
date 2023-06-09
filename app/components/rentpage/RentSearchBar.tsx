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
import RentSearchSelect from '../inputs/rentsearch/RentSearchSelect';
import Button from '../Button';
import RentSearchButton from '../inputs/rentsearch/RentSearchButton';
import { SEARCH_OPTIONS } from '@/types/RentTypes';
import axios from 'axios';

interface RentSearchBarProps {
  isSearchOn: boolean;
  setSafeListings: any;
  setMapListings: any;
}

const RentSearchBar: React.FC<RentSearchBarProps> = ({
  isSearchOn,
  setSafeListings,
  setMapListings,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      rentMinPrice: null,
      bed: null,
      bath: null,
      category: null,
      subway: null,
      review: null,
      broker: null,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const rentMinPrice = watch('rentMinPrice');
  const bed = watch('bed');
  const bath = watch('bath');
  const category = watch('category');
  const subway = watch('subway');
  const review = watch('review');
  const broker = watch('broker');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      axios
        .post(`/api/rentListing/rentListing`, { rentOption: data })
        .then((response) => {
          // console.log(response);
          setSafeListings?.(response.data.searchedListing);
          setMapListings?.(response.data.searchedMapListing);
        });
    } catch (error) {}

    // console.log({ rentOption: data });
    // console.log(rentMinPrice.target.value);
    // console.log(bed.value);
    // console.log(bath.value);
    // console.log(category.value);
    // console.log(subway.value);
    // console.log(review.value);
  };

  return (
    <div
      className={`absolute flex bg-white transition duration-100 justify-center
${isSearchOn ? 'opacity-100 h-auto w-full' : 'opacity-0 h-[0px] w-[0px]'}
`}
    >
      <div className='grid xl:flex grid-cols-3 lg:grid-cols-4 xl:flex-row justify-center pl-[56px] md:pl-[72px] py-4 pr-4 gap-2 md:gap-x-4 md:gap-y-2'>
        <div className='relative w-auto h-auto'>
          <input
            type='number'
            id='rentMinPrice'
            onChange={(value) => {
              setCustomValue('rentMinPrice', value.target.value);
            }}
            min={500}
            max={15000}
            step={100}
            placeholder='최저가'
            className='relative w-[100%] h-[100%] border-[1px] border-neutral-300 rounded-md py-1 px-4 text-sm text-end'
          />
          <label htmlFor='rentMinPrice' className='absolute top-2 left-2'>
            $
          </label>
        </div>
        <RentSearchSelect
          placeholder={'침실'}
          options={SEARCH_OPTIONS.bed}
          onChange={(value) => {
            setCustomValue('bed', value);
          }}
        />
        <RentSearchSelect
          placeholder={'화장실'}
          options={SEARCH_OPTIONS.bath}
          onChange={(value) => setCustomValue('bath', value)}
        />
        <RentSearchSelect
          placeholder={'기간'}
          options={SEARCH_OPTIONS.category}
          onChange={(value) => setCustomValue('category', value)}
        />
        <RentSearchSelect
          placeholder={'지하철'}
          disabled
          multiple
          options={SEARCH_OPTIONS.subway}
          onChange={(value) => setCustomValue('subway', value)}
        />
        <RentSearchSelect
          placeholder={'평점'}
          disabled
          lastItemToHide
          options={SEARCH_OPTIONS.review}
          onChange={(value) => setCustomValue('review', value)}
        />
        <RentSearchSelect
          placeholder={'중개비'}
          disabled
          lastItemToHide
          options={SEARCH_OPTIONS.broker}
          onChange={(value) => setCustomValue('broker', value)}
        />
        <RentSearchButton label='검색' onClick={handleSubmit(onSubmit)} />
      </div>
    </div>
  );
};
export default RentSearchBar;
