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

interface RentPageBodyProps {
  listings: RentListing[];
  mapListings: MapListing;
}

const RentPageBody: React.FC<RentPageBodyProps> = ({
  listings,
  mapListings,
}) => {
  const [isListingOn, setIsListingOn] = useState<boolean>(false);
  return (
    <div className='relative flex flex-row'>
      <div
        className={`relative ${
          isListingOn ? 'hidden' : 'flex'
        } w-full sm:w-[50%] xl:w-[65%] h-[70vh]`}
      >
        <Map
          initCoordinate={[-74.0085514, 40.7127503]}
          rentmain
          mapListings={mapListings}
        />
      </div>
      <div
        className={`sm:relative sm:flex w-full sm:w-[50%] xl:w-[35%] sm:h-[70vh] flex flex-col bg-white
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
        <div className='flex flex-row justify-between items-center p-4'>
          <div>Total {listings.length} listings</div>
          <div className='cursor-pointer bg-[#EC662A] text-white py-1 px-4 rounded-lg'>
            전체 리스팅 다시보기
          </div>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 p-4 pt-0 overflow-x-hidden	overflow-y-scroll	gap-2'>
          {listings.map((list) => (
            <div
              key={list.imageSrc[0]}
              className='p-1 rounded-lg border-[1px] border-neutral-300 cursor-pointer group hover:border-[#EC662A]'
            >
              <div className='w-full relative overflow-hidden rounded-lg'>
                <Image
                  src={list.imageSrc[0]}
                  width={200}
                  height={120}
                  className='rounded-lg object-cover h-full w-full group-hover:scale-110 transition'
                  alt='thumbnail'
                />
              </div>
              <div className='flex flex-col px-1 mt-1 gap-0'>
                <div className='flex flex-row justify-between'>
                  <div className='text-sm'>{list.category}</div>
                  <div className='text-sm'>$ {list.price.toLocaleString()}</div>
                </div>
                <div className='flex flex-row justify-between'>
                  <div className='text-sm'>{list.bedCount}</div>
                  <div className='text-sm'>{list.bathCount}</div>
                </div>
                <div className='text-sm text-end'>
                  입주 가능일: {list.moveDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default RentPageBody;
