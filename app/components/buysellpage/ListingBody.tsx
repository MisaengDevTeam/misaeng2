'use client';

import dateFormatter from '@/app/lib/dateFormatter';
import { BuySellListing } from '@prisma/client';
import Image from 'next/image';

interface ListingBodyProps {
  listings: BuySellListing[] | null;
}

const ListingBody: React.FC<ListingBodyProps> = ({ listings }) => {
  return (
    <div className='w-full h-full relative'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 gap-2 md:gap-4 md:pl-4 pt-4 md:pt-0'>
        {listings?.map((listing) => (
          <div key={listing.id} className='relative cursor-pointer group'>
            <div className='flex justify-center overflow-hidden w-full relative border border-[#EC662A] rounded-lg '>
              <Image
                className='w-[100%] h-auto rounded-lg object-cover group-hover:scale-110 transition'
                width={0}
                height={0}
                sizes='100%'
                src={listing.pictures[0]}
                alt='img'
              />
            </div>
            <div className='p-1'>
              <div className='truncate font-semibold'>{listing.title}</div>
              <div className='flex flex-col justify-between md:text-sm lg:text-base font-light'>
                <div>
                  {listing.category}/{listing.subcategory}
                </div>
                <div className='font-bold text-[#EC662A] text-end'>{`$ ${listing.price.toLocaleString()}`}</div>
                <div className='text-end text-sm md:text-sm lg:text-base font-light'>{`작성일: ${dateFormatter(
                  new Date(listing.createdAt)
                )}`}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListingBody;
