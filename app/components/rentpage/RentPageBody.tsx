'use client';

import { RentListing } from '@prisma/client';
import Image from 'next/image';
import Map from '../Map';
import { useState } from 'react';
import {
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardDoubleArrowDown,
} from 'react-icons/md';
import { MapListing } from '@/types/RentTypes';
import useRentIndividualModal from '../hooks/useRentIndividualModal';
import axios from 'axios';
import RentListingCard from './RentListingCard';

interface RentPageBodyProps {
  listings: RentListing[];
  mapListings: MapListing;
  setSafeListings: any;
  rentIndividualOpen: () => void;
  setDefaultListing: () => void;
  setIndividualListing: (listingInfo: any) => void;
}

const RentPageBody: React.FC<RentPageBodyProps> = ({
  listings,
  mapListings,
  setSafeListings,
  setDefaultListing,
  rentIndividualOpen,
  setIndividualListing,
}) => {
  const [isListingOn, setIsListingOn] = useState<boolean>(false);

  // const getBuildingData = async (rentId: string) => {
  //   try {
  //     const response = await axios.post(`/api/rentListing/rentListing`, {
  //       rentId,
  //     });
  //     setIndividualListing({
  //       listingInfo: response.data.listingInfo[0],
  //       buildingInfo: response.data.buildingInfo[0],
  //     });
  //   } catch (error) {
  //   } finally {
  //   }
  // };

  return (
    <div className='relative flex flex-row'>
      <div
        className={`relative ${
          isListingOn ? 'hidden' : 'flex'
        } w-full sm:w-[50%] lg:w-[55%] h-[70vh]`}
      >
        <Map
          initCoordinate={[-74.0085514, 40.7127503]}
          rentmain
          mapListings={mapListings}
          setSafeListings={setSafeListings}
        />
      </div>
      <div
        className={`sm:relative sm:flex w-full sm:w-[50%] lg:w-[45%] sm:h-[70vh] flex flex-col bg-white
      ${isListingOn ? 'relative h-full' : 'absolute h-1/2 bottom-0'}
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
              <span>클릭하여 리스팅 더보기</span>{' '}
              <MdOutlineKeyboardDoubleArrowUp size={20} />
            </div>
          )}
        </div>
        <div className='flex flex-row justify-between items-center p-4 shadow-md sm:shadow-none'>
          <div>Total {listings.length} listings</div>
          <div
            onClick={setDefaultListing}
            className='cursor-pointer bg-[#EC662A] text-white py-1 px-4 rounded-lg'
          >
            전체 리스팅 다시보기
          </div>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 p-4 sm:pt-0 overflow-x-hidden overflow-y-scroll gap-2'>
          {listings.map((list) => (
            <RentListingCard
              key={(list as any)._id}
              rentIndividualOpen={rentIndividualOpen}
              list={list}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default RentPageBody;
