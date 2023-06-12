'use client';

import { BUY_SELL_CATEGORY } from '@/types/BuySellTypes';

interface SearchCategoryProps {
  isCategoryBoxOpen: boolean;
  setIsCategoryBoxOpen: (isOpen: boolean) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
}

const SearchCategory: React.FC<SearchCategoryProps> = ({
  isCategoryBoxOpen,
  setIsCategoryBoxOpen,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div
      className={`w-full mt-2 md:mt-0 md:relative md:flex flex-row rounded-xl border border-[#EC662A]
    ${isCategoryBoxOpen ? 'flex' : 'hidden'}
    ${selectedCategory ? 'md:w-[320px]' : 'md:w-[160px]'}
    `}
    >
      <div className='flex flex-col w-full rounded-l-xl'>
        {Object.entries(BUY_SELL_CATEGORY).map(([key, value]) => (
          <div
            onClick={() => {
              setSelectedCategory(key);
            }}
            key={key}
            className='cursor-pointer hover:bg-[#EC662A]/25 transition text-center py-2 rounded-xl'
          >
            {key}
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div
          className={`flex flex-col w-full rounded-r-xl border-dashed border-l border-[#EC662A]
        
        `}
        >
          {BUY_SELL_CATEGORY[
            selectedCategory as keyof typeof BUY_SELL_CATEGORY
          ].map((item) => (
            <div
              onClick={() => {
                setIsCategoryBoxOpen(!isCategoryBoxOpen);
              }}
              className='cursor-pointer hover:bg-orange-300 transition text-center py-2 rounded-xl'
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
