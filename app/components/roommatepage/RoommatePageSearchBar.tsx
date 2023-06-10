'use client';

import { useEffect, useMemo, useState } from 'react';
import Container from '../Container';
import SearchButton from '../inputs/search/SearchButton';
import SearchSelect from '../inputs/search/SearchSelect';
import { SEARCH_TYPES, ROOMMATE_MAP } from '@/types/RoommateTypes';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { RoommateListing } from '@prisma/client';

interface RoommatePageSearchBarProps {
  setListings: (listings: RoommateListing[]) => void;
  setDefaultListing: () => void;
}

const RoommatePageSearchBar: React.FC<RoommatePageSearchBarProps> = ({
  setListings,
  setDefaultListing,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearchbarOn, setIsSearchbarOn] = useState(false);
  const [selectedCity, setSelectedCity] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [locationOptions, setLocationOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const router = useRouter();

  const cityOptions = useMemo(() => {
    return Object.keys(ROOMMATE_MAP).map((key) => ({ label: key, value: key }));
  }, []);

  const { handleSubmit, setValue } = useForm<FieldValues>({
    defaultValues: {
      category: null,
      gender: null,
      status: null,
      roomtype: null,
      length: null,
      mbti: null,
      age: null,
      pet: null,
      smoke: null,
      city: null,
      district: null,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  useEffect(() => {
    if (selectedCity) {
      setLocationOptions(
        ROOMMATE_MAP[selectedCity.value as keyof typeof ROOMMATE_MAP]
      );
    }
  }, [selectedCity]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      axios
        .post(`/api/roommateListing/roommateListing`, { roommateOption: data })
        .then((response) => {
          setListings(response.data.searchedListings);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsSearchbarOn(false); // Close Searchbar After Search
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`w-full h-auto shadow-sm bg-neutral-200  cursor-pointer hover:bg-neutral-100 transition ${
        isSearchbarOn ? 'pb-4' : 'pb-0'
      }`}
    >
      <Container>
        <div
          onClick={() => {
            setIsSearchbarOn(!isSearchbarOn);
          }}
          className='relative flex justify-center p-2 lg:p-3'
        >
          {isSearchbarOn ? '클릭하여 검색창 닫기' : '클릭하여 검색창 열기'}
        </div>
        {isSearchbarOn && (
          <div className='w-full pb-4 z-20 bg-[#fff] flex flex-col justify-center border-2 border-[#EC662A] rounded-xl'>
            <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 justify-center h-auto gap-2 p-4'>
              <SearchSelect
                placeholder={'카테고리'}
                options={SEARCH_TYPES.CATEGORY}
                onChange={(value) => {
                  setCustomValue('category', value);
                }}
              />
              <SearchSelect
                placeholder={'성별'}
                options={SEARCH_TYPES.GENDER}
                onChange={(value) => {
                  setCustomValue('gender', value);
                }}
              />
              <SearchSelect
                placeholder={'학생/직장인'}
                options={SEARCH_TYPES.STATUS}
                onChange={(value) => {
                  setCustomValue('status', value);
                }}
              />
              <SearchSelect
                placeholder={'방 종류'}
                options={SEARCH_TYPES.ROOMTYPE}
                onChange={(value) => {
                  setCustomValue('roomtype', value);
                }}
              />
              <SearchSelect
                placeholder={'희망 기간'}
                options={SEARCH_TYPES.LENGTH}
                onChange={(value) => {
                  setCustomValue('length', value);
                }}
              />
              <SearchSelect
                placeholder={'MBTI'}
                options={SEARCH_TYPES.MBTI}
                onChange={(value) => {
                  setCustomValue('mbti', value);
                }}
              />
              <SearchSelect
                placeholder={'연령'}
                options={SEARCH_TYPES.AGE}
                onChange={(value) => {
                  setCustomValue('age', value);
                }}
              />
              <SearchSelect
                placeholder={'반려동물'}
                options={SEARCH_TYPES.PET}
                onChange={(value) => {
                  setCustomValue('pet', value);
                }}
              />
              <SearchSelect
                placeholder={'흡연'}
                options={SEARCH_TYPES.SMOKE}
                onChange={(value) => {
                  setCustomValue('smoke', value);
                }}
              />
              <SearchSelect
                placeholder={'도시'}
                options={cityOptions}
                onChange={(value) => {
                  setSelectedCity({ label: value, value: value });

                  setCustomValue('city', value);
                }}
              />

              {selectedCity && (
                <SearchSelect
                  placeholder={'위치'}
                  options={locationOptions}
                  onChange={(value) => {
                    setCustomValue('district', value);
                  }}
                />
              )}
            </div>
            <div className='w-[100%] h-[36px] flex justify-center'>
              <div className='flex w-[50%] gap-4 justify-center'>
                <SearchButton label={'초기화'} onClick={setDefaultListing} />
                <SearchButton
                  disabled={isLoading}
                  label={'검색'}
                  onClick={handleSubmit(onSubmit)}
                />
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
export default RoommatePageSearchBar;
