'use client';

import { useEffect, useMemo, useState } from 'react';
import Container from '../Container';
import SearchButton from '../inputs/search/SearchButton';
import SearchSelect from '../inputs/search/SearchSelect';
import { SEARCH_TYPES, ROOMMATE_MAP } from '@/types/RoommateTypes';
import { useRouter } from 'next/navigation';

interface RoommatePageSearchBarProps {}

const RoommatePageSearchBar: React.FC<RoommatePageSearchBarProps> = ({}) => {
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

  useEffect(() => {
    if (selectedCity) {
      setLocationOptions(
        ROOMMATE_MAP[selectedCity.value as keyof typeof ROOMMATE_MAP]
      );
    }
  }, [selectedCity]);

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
                onChange={() => {}}
              />
              <SearchSelect
                placeholder={'성별'}
                options={SEARCH_TYPES.GENDER}
                onChange={() => {}}
              />
              <SearchSelect
                placeholder={'학생/직장인'}
                options={SEARCH_TYPES.STATUS}
                onChange={() => {}}
              />
              <SearchSelect
                placeholder={'방 종류'}
                options={SEARCH_TYPES.ROOMTYPE}
                onChange={() => {}}
              />
              <SearchSelect
                placeholder={'희망 기간'}
                options={SEARCH_TYPES.LENGTH}
                onChange={() => {}}
              />
              <SearchSelect
                placeholder={'MBTI'}
                options={SEARCH_TYPES.MBTI}
                onChange={() => {}}
              />
              <SearchSelect
                placeholder={'연령'}
                options={SEARCH_TYPES.AGE}
                onChange={() => {}}
              />
              <SearchSelect
                placeholder={'반려동물'}
                options={SEARCH_TYPES.PET}
                onChange={() => {}}
              />
              <SearchSelect
                placeholder={'흡연'}
                options={SEARCH_TYPES.SMOKE}
                onChange={() => {}}
              />
              <SearchSelect
                placeholder={'도시'}
                options={cityOptions}
                onChange={(value) =>
                  setSelectedCity({ label: value, value: value })
                }
              />

              {selectedCity && (
                <SearchSelect
                  placeholder={'위치'}
                  options={locationOptions}
                  onChange={() => {}}
                />
              )}
            </div>
            <div className='w-[100%] h-[36px] flex justify-center'>
              <div className='flex w-[50%] gap-4 justify-center'>
                <SearchButton
                  label={'초기화'}
                  onClick={() => {
                    router.refresh();
                  }}
                />
                <SearchButton
                  label={'검색'}
                  onClick={() => {
                    setIsSearchbarOn(!isSearchbarOn);
                  }}
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
