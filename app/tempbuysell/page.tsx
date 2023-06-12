'use client';

import { useState } from 'react';
import Container from '../components/Container';
import EmptyState from '../components/EmptyState';
import ListingBody from '../components/buysellpage/ListingBody';
import SearchCategory from '../components/buysellpage/SearchCategory';
import useBuySellRegisterModal from '../components/hooks/useBuySellRegisterModal';
import { BUY_SELL_CATEGORY } from '@/types/BuySellTypes';

const BuySellPage = ({}) => {
  const [isCategoryBoxOpen, setIsCategoryBoxOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const buySellRegisterModal = useBuySellRegisterModal();
  return (
    <div className='w-full flex bg-blue-300'>
      <Container>
        {/* <div className='flex flex-row justify-center items-center bg-green-300 py-4'>
          SEARCH BAR
        </div> */}
        <div className='flex flex-col md:flex-row w-full justify-center items-start bg-red-200 py-4 md:py-8'>
          <div
            onClick={() => {
              setIsCategoryBoxOpen(!isCategoryBoxOpen);
            }}
            className='w-full bg-yellow-600 flex justify-center items-center md:hidden'
          >
            CLICK TO OPEN THE CATEGORY BOX
          </div>
          <SearchCategory
            isCategoryBoxOpen={isCategoryBoxOpen}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <ListingBody />
        </div>
      </Container>
      {/* <div
        onClick={buySellRegisterModal.onOpen}
        className='bg-[#EC662A] text-[#FFFFFF] p-2 cursor-pointer'
      >
        OPEN MODAL
      </div> */}
    </div>
  );
};
export default BuySellPage;
