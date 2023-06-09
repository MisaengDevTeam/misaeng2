'use client';

import Container from '../Container';
import SearchButton from '../inputs/search/SearchButton';
import SearchSelect from '../inputs/search/SearchSelect';

interface RoommatePageSearchBarProps {}

const RoommatePageSearchBar: React.FC<RoommatePageSearchBarProps> = ({}) => {
  const testOption = [
    { label: 'test1', value: 'test1' },
    { label: 'test2', value: 'test2' },
    { label: 'test3', value: 'test3' },
  ];
  return (
    <div className='w-full h-auto shadow-sm'>
      <Container>
        <div className='flex flex-row justify-center h-auto gap-4 p-2 md:p-4'>
          <SearchSelect
            placeholder={'카테고리'}
            options={testOption}
            onChange={() => {}}
          />
          <SearchSelect
            placeholder={'성별'}
            options={testOption}
            onChange={() => {}}
          />
          <SearchSelect
            placeholder={'학생/직장인'}
            options={testOption}
            onChange={() => {}}
          />
          <SearchSelect
            placeholder={'방 종류'}
            options={testOption}
            onChange={() => {}}
          />
          <SearchSelect
            placeholder={'희망 기간'}
            options={testOption}
            onChange={() => {}}
          />
          <SearchSelect
            placeholder={'연령'}
            options={testOption}
            onChange={() => {}}
          />
          <SearchSelect
            placeholder={'반려동물'}
            options={testOption}
            onChange={() => {}}
          />
          <SearchSelect
            placeholder={'흡연'}
            options={testOption}
            onChange={() => {}}
          />
          <SearchSelect
            placeholder={'도시'}
            options={testOption}
            onChange={() => {}}
          />
          <SearchSelect
            placeholder={'위치'}
            options={testOption}
            onChange={() => {}}
          />
          <SearchButton label={'검색'} onClick={() => {}} />
        </div>
      </Container>
    </div>
  );
};
export default RoommatePageSearchBar;
