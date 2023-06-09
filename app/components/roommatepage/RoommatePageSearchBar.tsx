'use client';

import { useEffect, useMemo, useState } from 'react';
import Container from '../Container';
import SearchButton from '../inputs/search/SearchButton';
import SearchSelect from '../inputs/search/SearchSelect';
import { SEARCH_TYPES, ROOMMATE_MAP } from '@/types/RoommateTypes';

interface RoommatePageSearchBarProps {}

const RoommatePageSearchBar: React.FC<RoommatePageSearchBarProps> = ({}) => {
  const [selectedCity, setSelectedCity] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [locationOptions, setLocationOptions] = useState<
    { value: string; label: string }[]
  >([]);

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
    <div className='w-full h-auto shadow-sm'>
      <Container>
        <div className='flex flex-row justify-center h-auto gap-4 p-2 md:p-4'>
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

          <SearchSelect
            placeholder={'위치'}
            options={locationOptions} // Update options based on selected city
            onChange={() => {}}
          />
          <div>
            <SearchButton label={'검색'} onClick={() => {}} />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default RoommatePageSearchBar;
