'use client';

import { RentListing } from '@prisma/client';
import Map from '../Map';
import { useEffect, useState } from 'react';
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
import LoadingScreen from '../LoadingScreen';
import Image from 'next/image';
import useRentNotiModal from '../hooks/useRentNotiModal';

interface RentPageBodyProps {
  totalLength: number;
  isLoading: boolean;
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
  isLoading,
  totalLength,
  fetchData,
  listings,
  mapListings,
  setDefaultListing,
  rentIndividualOpen,
  setIndividualListing,
  setMapListings,
}) => {
  const [searchListings, setSearchListings] = useState<any[] | null>(null);
  const [isListingOn, setIsListingOn] = useState<boolean>(false);
  const [isSearchOn, setIsSearchOn] = useState<boolean>(false);
  const [adviceOn, setAdviceOn] = useState<boolean>(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setTimeout(() => {
      setAdviceOn(false);
    }, 12000);

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine the height based on the window width
  let height;
  if (windowWidth > 640) {
    height = '83vh';
  } else {
    height = isListingOn ? '76vh' : '42vh';
  }

  return isLoading ? (
    <LoadingScreen />
  ) : (
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

        {adviceOn && (
          <div
            onClick={() => {
              setAdviceOn(false);
            }}
            className={`absolute bg-[#000]/70 w-full h-full transition 
            ${adviceOn ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div className='flex items-end pt-[40px] pl-[40px] sm:pt-[48px] sm:pl-[48px]'>
              <Image
                width={64}
                height={64}
                src={'/assets/images/img/arrow_map1.png'}
                alt={'arrow'}
              />
              <div className='text-[#fff] translate-y-2'>
                검색을 추천해요 :D
              </div>
            </div>
            <div className='flex flex-col px-4 py-2 text-[#FFF] text-sm gap-1'>
              <p>- 사진 업데이트가 다소 느린점 양해부탁드립니다</p>
              <p>- 카톡으로 연락하기를 통해 사진을 요청해보세요</p>
            </div>
          </div>
        )}
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
            {searchListings == null
              ? totalLength
              : searchListings?.length != 0
              ? searchListings?.length
              : `0`}{' '}
            listings
          </div>

          <div
            onClick={setDefaultListing}
            className='cursor-pointer bg-[#EC662A] text-white py-1 px-4 rounded-lg'
          >
            전체 리스팅 다시보기
          </div>
        </div>

        {searchListings == null ? (
          <InfiniteScroll
            next={infiniteScrollNext}
            hasMore={listings.length < totalLength}
            scrollThreshold={0.95}
            height={height}
            loader={
              <div className='w-full flex justify-center items-center h-[60px] bg-[#F6A484] text-[#FFFFFF] gap-8'>
                <Image
                  width={100}
                  height={30}
                  src={'/assets/images/logo/logo_white_horizontal_kor.png'}
                  alt={'logo'}
                />
              </div>
            }
            dataLength={listings.length}
            endMessage={
              <div className='w-full flex justify-center items-center h-[60px] bg-[#F6A484] text-[#FFFFFF] gap-8'>
                <Image
                  width={100}
                  height={30}
                  src={'/assets/images/logo/logo_white_horizontal_kor.png'}
                  alt={'logo'}
                />
                <span>더 이상 없어요 ㅠ</span>
              </div>
            }
          >
            <div className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 min-[1960px]:grid-cols-4 min-[2400px]:grid-cols-5 p-4 sm:pt-0 overflow-x-hidden overflow-y-scroll gap-2'>
              {listings.map((list) => {
                return (
                  <RentListingCard
                    key={(list as any)._id + listings.indexOf(list)}
                    rentIndividualOpen={rentIndividualOpen}
                    list={list}
                  />
                );
              })}
            </div>
          </InfiniteScroll>
        ) : searchListings?.length != 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 min-[1960px]:grid-cols-4 min-[2400px]:grid-cols-5 p-4 sm:pt-0 overflow-x-hidden overflow-y-scroll gap-2'>
            {searchListings?.map((list) => (
              <RentListingCard
                key={(list as any)._id + searchListings.indexOf(list)}
                rentIndividualOpen={rentIndividualOpen}
                list={list}
              />
            ))}
          </div>
        ) : (
          <div className='flex justify-center items-center w-full h-full'>
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};
export default RentPageBody;
