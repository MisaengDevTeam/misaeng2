'use client';

import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';

import SearchSelect from '../inputs/search/SearchSelect';
import SearchButton from '../inputs/search/SearchButton';
import { SEARCH_OPTIONS } from '@/types/RentTypes';
import axios from 'axios';
import { useState } from 'react';

interface SearchBarProps {
  isSearchOn: boolean;
  setSearchListings: any;
  setMapListings: any;
  setIsSearchOn: (setIsSearchOn: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isSearchOn,
  setSearchListings,
  setMapListings,
  setIsSearchOn,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, setValue } = useForm<FieldValues>({
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      axios
        .post(`/api/rentListing/rentListing`, { rentOption: data })
        .then((response) => {
          setSearchListings?.(response.data.searchedListing);
          setMapListings?.(response.data.searchedMapListing);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsSearchOn(!isSearchOn);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`absolute flex bg-white transition duration-100 justify-center
${isSearchOn ? 'opacity-100 h-auto w-full' : 'opacity-0 h-[0px] w-[0px]'}
`}
    >
      <div className='grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-8 2xl:gap-1 justify-center pl-[56px] md:pl-[72px] py-4 pr-4 gap-2 md:gap-x-4 md:gap-y-2 xl:gap-x-8'>
        <div className='relative w-auto h-auto'>
          <input
            type='number'
            id='rentMinPrice'
            onChange={(value) => {
              setCustomValue('rentMinPrice', value.target.value);
            }}
            min={500}
            max={30000}
            step={100}
            placeholder='최고가'
            className='relative w-[100%] h-[100%] border-[1px] border-neutral-300 rounded-md py-1 px-4 text-sm text-end'
          />
          <label htmlFor='rentMinPrice' className='absolute top-2 left-2'>
            $
          </label>
        </div>
        <SearchSelect
          placeholder={'침실'}
          options={SEARCH_OPTIONS.bed}
          onChange={(value) => {
            setCustomValue('bed', value);
          }}
        />
        <SearchSelect
          placeholder={'화장실'}
          options={SEARCH_OPTIONS.bath}
          onChange={(value) => setCustomValue('bath', value)}
        />
        <SearchSelect
          placeholder={'기간'}
          options={SEARCH_OPTIONS.category}
          onChange={(value) => setCustomValue('category', value)}
        />
        <SearchSelect
          placeholder={'지하철'}
          disabled
          multiple
          options={SEARCH_OPTIONS.subway}
          onChange={(value) => setCustomValue('subway', value)}
        />
        <SearchSelect
          placeholder={'평점'}
          disabled
          lastItemToHide
          options={SEARCH_OPTIONS.review}
          onChange={(value) => setCustomValue('review', value)}
        />
        <SearchSelect
          placeholder={'중개비'}
          disabled
          lastItemToHide
          options={SEARCH_OPTIONS.broker}
          onChange={(value) => setCustomValue('broker', value)}
        />
        <SearchButton
          disabled={isLoading}
          label='검색'
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
};
export default SearchBar;
