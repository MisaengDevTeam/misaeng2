'use client';

import { BUY_SELL_CATEGORY } from '@/types/BuySellTypes';
import { BuySellListing } from '@prisma/client';
import axios from 'axios';
import { useState } from 'react';

interface SearchCategoryProps {
  isCategoryBoxOpen: boolean;
  setIsCategoryBoxOpen: (isOpen: boolean) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  setListings: (listings: BuySellListing[]) => void;
}

const SearchCategory: React.FC<SearchCategoryProps> = ({
  isCategoryBoxOpen,
  setIsCategoryBoxOpen,
  selectedCategory,
  setSelectedCategory,
  setListings,
}) => {
  const [searchCategory, setSearchCategory] = useState<string | null>(null);
  const [searchSubCategory, setSearchSubCategory] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const onSearch = async (category: string, subcategory?: string) => {
    const buysellOption = { category, subcategory };
    setIsLoading(true);
    await axios
      .post(`/api/buysellListing/buysellListing`, { buysellOption })
      .then((res) => {
        // console.log(res);
        setListings(res.data.searchedListings);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };
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
              setSearchCategory(key);
              onSearch(key);
            }}
            key={key}
            className={`cursor-pointer hover:bg-[#EC662A]/25 transition text-center py-2 rounded-xl ${
              selectedCategory === key ? 'font-bold bg-[#EC662A]/25' : ''
            }`}
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
          <div className='flex flex-col justify-between h-full'>
            <div>
              {BUY_SELL_CATEGORY[
                selectedCategory as keyof typeof BUY_SELL_CATEGORY
              ].map((item) => (
                <div
                  onClick={() => {
                    setIsCategoryBoxOpen(!isCategoryBoxOpen);
                    setSearchSubCategory(item);
                    onSearch(searchCategory!, item);
                  }}
                  className={`cursor-pointer hover:bg-orange-300 transition text-center py-2 rounded-xl ${
                    searchSubCategory === item ? 'bg-orange-300 font-bold' : ''
                  }`}
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
            <div
              onClick={() => {
                setSelectedCategory(null);
              }}
              className='py-2 text-center cursor-pointer'
            >
              메뉴 축소 하기
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchCategory;
