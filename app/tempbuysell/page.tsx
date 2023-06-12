'use client';

import { useEffect, useState } from 'react';
import Container from '../components/Container';
import EmptyState from '../components/EmptyState';
import ListingBody from '../components/buysellpage/ListingBody';
import SearchCategory from '../components/buysellpage/SearchCategory';
import useBuySellRegisterModal from '../components/hooks/useBuySellRegisterModal';
import { BUY_SELL_CATEGORY } from '@/types/BuySellTypes';
import axios from 'axios';
import { BuySellListing } from '@prisma/client';

const BuySellPage = ({}) => {
  const [isCategoryBoxOpen, setIsCategoryBoxOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [initListings, setInitListings] = useState<BuySellListing[] | null>(
    null
  );
  const [listings, setListings] = useState<BuySellListing[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const buySellRegisterModal = useBuySellRegisterModal();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/buysellListing/buysellListing`);
        setInitListings(response.data.initListings);
        setListings(response.data.initListings);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-full flex'>
      <Container>
        {/* <div className='flex flex-row justify-center items-center bg-green-300 py-4'>
          SEARCH BAR
        </div> */}
        <div className='flex flex-col md:flex-row w-full justify-center items-start py-4 md:py-8'>
          <div
            onClick={() => {
              setIsCategoryBoxOpen(!isCategoryBoxOpen);
            }}
            className='w-full flex justify-center items-center md:hidden py-2 mb-3 bg-[#EC662A] text-[#fff] rounded-xl'
          >
            {isCategoryBoxOpen
              ? '카테고리 닫기'
              : '클릭하여 카테고리별 상품을 찾아보세요'}
          </div>
          <SearchCategory
            isCategoryBoxOpen={isCategoryBoxOpen}
            setIsCategoryBoxOpen={setIsCategoryBoxOpen}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <ListingBody listings={listings} />
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
