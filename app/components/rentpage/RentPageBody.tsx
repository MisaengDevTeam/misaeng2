'use client';

import { RentListing } from '@prisma/client';
import Map from '../Map';
import { useState } from 'react';
import {
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardDoubleArrowDown,
} from 'react-icons/md';
import { MapListing } from '@/types/RentTypes';
import { TbHomeSearch } from 'react-icons/tb';
import { IoClose } from 'react-icons/io5';
import RentListingCard from './RentListingCard';
import RentSearchBar from './RentSearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';

interface RentPageBodyProps {
  totalLength: number;
  listings: RentListing[];
  mapListings: MapListing;
  setMapListings: any;
  rentIndividualOpen: () => void;
  setDefaultListing: () => void;
  setIndividualListing: (listingInfo: any) => void;
  fetchData: any;
  infiniteScrollNext: any;
}

const RentPageBody: React.FC<RentPageBodyProps> = ({
  infiniteScrollNext,
  totalLength,
  fetchData,
  listings,
  mapListings,
  setDefaultListing,
  rentIndividualOpen,
  setIndividualListing,
  setMapListings,
}) => {
  const [searchListings, setSearchListings] = useState<any[]>([]);
  const [isListingOn, setIsListingOn] = useState<boolean>(false);
  const [isSearchOn, setIsSearchOn] = useState<boolean>(false);

  return (
    <div className='relative flex flex-row h-[93vh] sm:h-[90vh]'>
      <div
        className={`relative ${
          isListingOn ? 'hidden' : 'flex'
        } w-full sm:w-[50%] lg:w-[55%] h-[70vh] sm:h-[90vh]`}
      >
        <Map
          initCoordinate={[-74.0085514, 40.7127503]}
          rentmain
          mapListings={mapListings}
          setSearchListings={setSearchListings}
        />
        <RentSearchBar
          isSearchOn={isSearchOn}
          setIsSearchOn={setIsSearchOn}
          setSearchListings={setSearchListings}
          setMapListings={setMapListings}
        />
        <div
          onClick={() => setIsSearchOn(!isSearchOn)}
          className={`absolute flex justify-center items-center h-[36px] bg-[#EC662A] left-3 md:left-5 top-3 md:top-5 rounded-full border-[2px] border-[#FFFFFF] bg-[#EC662A] gap-1 cursor-pointer
        ${isSearchOn ? 'w-[36px]' : 'w-[72px]'}
        `}
        >
          {isSearchOn ? (
            <IoClose size={20} color='#fff' />
          ) : (
            <TbHomeSearch size={20} color='#fff' />
          )}
          {isSearchOn ? '' : <p className='text-[#fff] text-sm'>검색</p>}
        </div>
      </div>
      <div
        className={`sm:relative sm:flex w-full sm:w-[50%] lg:w-[45%] sm:h-[90vh] flex flex-col bg-white
        ${isListingOn ? 'relative h-full' : 'absolute h-[63%] bottom-0'}
        
      `}
      >
        <div
          onClick={() => setIsListingOn(!isListingOn)}
          className={`flex sm:hidden justify-center items-center w-full py-2 border-[1px] border-neutral-500`}
        >
          {isListingOn ? (
            <div className='flex flex-row w-full h-full items-center justify-center'>
              <span>클릭하여 리스팅 닫기</span>
              <MdOutlineKeyboardDoubleArrowDown size={20} />
            </div>
          ) : (
            <div className='flex flex-row items-center'>
              <span>클릭하여 리스팅만 보기</span>{' '}
              <MdOutlineKeyboardDoubleArrowUp size={20} />
            </div>
          )}
        </div>
        <div className='flex flex-row justify-between items-center p-4 shadow-md sm:shadow-none'>
          <div>
            Total{' '}
            {searchListings.length != 0 ? searchListings.length : totalLength}{' '}
            listings
          </div>

          <div
            onClick={setDefaultListing}
            className='cursor-pointer bg-[#EC662A] text-white py-1 px-4 rounded-lg'
          >
            전체 리스팅 다시보기
          </div>
        </div>
        {/* <div className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 min-[1960px]:grid-cols-4 min-[2400px]:grid-cols-5 p-4 sm:pt-0 overflow-x-hidden overflow-y-scroll gap-2'> */}
        {searchListings.length != 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 min-[1960px]:grid-cols-4 min-[2400px]:grid-cols-5 p-4 sm:pt-0 overflow-x-hidden overflow-y-scroll gap-2'>
            {searchListings.map((list) => (
              <RentListingCard
                key={(list as any)._id + searchListings.indexOf(list)}
                rentIndividualOpen={rentIndividualOpen}
                list={list}
              />
            ))}
          </div>
        ) : (
          <InfiniteScroll
            className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 min-[1960px]:grid-cols-4 min-[2400px]:grid-cols-5 p-4 sm:pt-0 overflow-x-hidden overflow-y-scroll gap-2'
            next={infiniteScrollNext}
            hasMore={listings.length < totalLength}
            scrollThreshold={0.8}
            height={'83vh'}
            loader={
              <div className='w-full flex justify-center'>Loading...</div>
            }
            dataLength={listings.length}
            endMessage={
              <div className='flex justify-center items-center w-full h-full bg-neutral-300 rounded-lg'></div>
            }
          >
            {listings.map((list) => (
              <RentListingCard
                key={(list as any)._id + listings.indexOf(list)}
                rentIndividualOpen={rentIndividualOpen}
                list={list}
              />
            ))}
          </InfiniteScroll>
        )}

        {/* </div> */}
      </div>
    </div>
  );
};
export default RentPageBody;
