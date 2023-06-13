'use client';

import Image from 'next/image';
import BuySellIndiInfo from '../modal/buysellindividual/BuySellIndiInfo';
import MyEditDeleteButton from './MyEditDeleteButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import QueryString from 'query-string';
import { ITypeAndId } from '@/types/MyPageTypes';

interface MyRentListingCardProps {
  listing: any;
  rentIndividualOpen: () => void;
  confirmOpen: () => void;
  setTypeAndIt: (type: ITypeAndId) => void;
}

const MyRentListingCard: React.FC<MyRentListingCardProps> = ({
  listing,
  rentIndividualOpen,
  confirmOpen,
  setTypeAndIt,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(
    (rentId: string) => {
      let currentQuery = {};

      if (params) {
        currentQuery = QueryString.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        rentlisting: rentId,
      };

      if (params?.get('rentlisting') == rentId) {
        delete updatedQuery.category;
      }

      const url = QueryString.stringifyUrl(
        {
          url: '/mypage/rent-listing/',
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );
  return (
    <div className='flex flex-col w-full gap-4 group rounded-lg hover:bg-[#EC662A]/10 cursor-pointer'>
      <div
        onClick={() => {
          rentIndividualOpen();
          handleClick((listing as any)._id);
        }}
        className='w-full'
      >
        <div className='flex justify-center overflow-hidden w-full relative border border-[#EC662A] rounded-lg bg-[#fff]'>
          <Image
            className='w-[100%] aspect-square sm:aspect-video rounded-lg object-cover group-hover:scale-110 transition'
            width={0}
            height={0}
            sizes='100%'
            src={
              listing.imageSrc[0] != ''
                ? listing.imageSrc[0]
                : '/assets/images/logo/logo_square.png'
            }
            alt='img'
          />
        </div>
      </div>
      <div className='flex flex-col w-full px-4 pb-4 sm:px-0 sm:pb-0 justify-center'>
        <div className='truncate font-semibold text-lg py-1 w-[90%] sm:w-full sm:max-w-[260px] md:max-w-[400px] lg:max-w-[540px] xl:max-w-[640px]'>{`${listing.title}`}</div>
        <div className='flex flex-col gap-2'>
          <div
            onClick={() => {
              rentIndividualOpen();
              handleClick((listing as any)._id);
            }}
            className='flex flex-col justify-between text-lg sm:text-[14px] font-light w-full'
          >
            <BuySellIndiInfo label={'침실 수'} description={listing.bedCount} />
            <BuySellIndiInfo
              label={'화장실 수'}
              description={listing.bathCount}
            />
            <BuySellIndiInfo
              label={'입주 가능 날짜'}
              description={listing.moveDate}
            />
            <BuySellIndiInfo
              label={'가격'}
              description={`$ ${listing.price.toLocaleString()}`}
            />
          </div>
          <div className='flex flex-row justify-center items-center w-full gap-2'>
            <MyEditDeleteButton label={'수정하기'} onClick={() => {}} editEl />
            <MyEditDeleteButton
              label={'삭제하기'}
              onClick={() => {
                confirmOpen();
                setTypeAndIt({ type: 'rent', id: (listing as any)._id });
              }}
              deleteEl
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyRentListingCard;
