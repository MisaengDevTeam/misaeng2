'use client';

import { RentListing } from '@prisma/client';
import Image from 'next/image';
import Map from '../Map';

interface RentPageBodyProps {
  listings: RentListing[];
  groupedMapListings: any;
}

const RentPageBody: React.FC<RentPageBodyProps> = ({
  listings,
  groupedMapListings,
}) => {
  return (
    <div className='flex flex-row'>
      <div className='w-[50%] xl:w-[65%] h-[70vh]'>
        <Map initCoordinate={[-74.0085514, 40.7127503]} height='[70vh]' />
      </div>
      <div className='w-[50%] xl:w-[35%] h-[70vh] flex flex-col'>
        <div className='flex flex-row justify-between items-center p-4'>
          <div>Total {listings.length} listings</div>
          <div className='cursor-pointer bg-[#EC662A] text-white py-1 px-4 rounded-lg'>
            전체 리스팅 다시보기
          </div>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 p-4 pt-0 overflow-x-hidden	overflow-y-scroll	gap-2'>
          {listings.map((list) => (
            <div
              key={list.title}
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
