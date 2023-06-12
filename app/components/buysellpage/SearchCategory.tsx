'use client';

import { BUY_SELL_CATEGORY } from '@/types/BuySellTypes';

interface SearchCategoryProps {
  isCategoryBoxOpen: boolean;
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
}

const SearchCategory: React.FC<SearchCategoryProps> = ({
  isCategoryBoxOpen,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div
      className={`bg-orange-500 w-full  md:relative md:flex flex-row shadow-md
    ${isCategoryBoxOpen ? 'flex' : 'hidden'}
    ${selectedCategory ? 'md:w-[320px]' : 'md:w-[160px]'}
    `}
    >
      <div className='flex flex-col w-full shadow-md'>
        {Object.entries(BUY_SELL_CATEGORY).map(([key, value]) => (
          <div
            onClick={() => {
              setSelectedCategory(key);
            }}
            key={key}
            className='cursor-pointer hover:bg-green-200 transition text-center py-2'
          >
            {key}
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div
          className={`flex flex-col w-full
        
        `}
        >
          {BUY_SELL_CATEGORY[
            selectedCategory as keyof typeof BUY_SELL_CATEGORY
          ].map((item) => (
            <div
              className='cursor-pointer hover:bg-green-200 transition text-center py-2'
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchCategory;
