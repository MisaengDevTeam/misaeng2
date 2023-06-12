'use client';

import dateFormatter from '@/app/lib/dateFormatter';
import { BuySellListing } from '@prisma/client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import QueryString from 'query-string';

interface ListingBodyProps {
  listings: BuySellListing[] | null;
  buySellIndividualOpen: () => void;
}

const ListingBody: React.FC<ListingBodyProps> = ({
  listings,
  buySellIndividualOpen,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(
    (buysellId: string) => {
      let currentQuery = {};

      if (params) {
        currentQuery = QueryString.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        buyselllisting: buysellId,
      };

      if (params?.get('buyselllisting') == buysellId) {
        delete updatedQuery.category;
      }

      const url = QueryString.stringifyUrl(
        {
          url: '/buysell/',
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );

  return (
    <div className='w-full h-auto max-h-[80vh] relative h-auto max-h-[80vh] overflow-y-scroll overflow-x-hidden border-dashed border-t md:border-none border-[#EC662A]'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 gap-2 md:gap-4 md:pl-4 pt-4 md:pt-0'>
        {listings?.map((listing) => (
          <div
            onClick={() => {
              buySellIndividualOpen();
              handleClick((listing as any)._id);
            }}
            key={listing.id}
            className='relative cursor-pointer group'
          >
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
