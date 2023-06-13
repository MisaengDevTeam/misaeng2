'use client';

import { ITypeAndId } from '@/types/MyPageTypes';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import QueryString from 'query-string';
import Image from 'next/image';
import BuySellIndiInfo from '../modal/buysellindividual/BuySellIndiInfo';
import MyEditDeleteButton from './MyEditDeleteButton';
import dateFormatter from '@/app/lib/dateFormatter';
import { BUY_SELL_STATUS } from '@/types/BuySellTypes';

interface MyBuySellListingCardProps {
  listing: any;
  buysellIndividualOpen: () => void;
  confirmOpen: () => void;
  setTypeAndIt: (type: ITypeAndId) => void;
}

const MyBuySellListingCard: React.FC<MyBuySellListingCardProps> = ({
  listing,
  buysellIndividualOpen,
  confirmOpen,
  setTypeAndIt,
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
          url: '/mypage/buy-sell-listing/',
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );
  return (
    <div className='flex flex-col sm:flex-row w-full gap-4 group rounded-lg hover:bg-[#EC662A]/10 cursor-pointer'>
      <div
        onClick={() => {
          buysellIndividualOpen();
          handleClick((listing as any)._id);
        }}
        className='w-full sm:w-[30%] sm:max-w-[160px]'
      >
        <div className='flex justify-center overflow-hidden w-full relative border border-[#EC662A] rounded-lg bg-[#fff]'>
          <Image
            className='w-[100%] aspect-square rounded-lg object-cover group-hover:scale-110 transition'
            width={0}
            height={0}
            sizes='100%'
            src={
              listing.pictures[0] != ''
                ? listing.pictures[0]
                : '/assets/images/logo/logo_square.png'
            }
            alt='img'
          />
        </div>
      </div>
      <div className='flex flex-col w-full sm:w-[70%] sm:max-w-[840px] px-4 pb-4 sm:px-0 sm:pb-0 justify-center'>
        <div className='truncate font-semibold text-lg py-1 w-[90%] sm:w-full sm:max-w-[260px] md:max-w-[400px] lg:max-w-[540px] xl:max-w-[640px]'>{`${listing.title}`}</div>
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
          <div
            onClick={() => {
              buysellIndividualOpen();
              handleClick((listing as any)._id);
            }}
            className='flex flex-col justify-between text-lg sm:text-[14px] font-light w-full'
          >
            <BuySellIndiInfo
              label={'카테고리'}
              description={`${listing.category} / ${listing.subcategory}`}
            />
            <BuySellIndiInfo
              label={'상태'}
              description={
                BUY_SELL_STATUS.find((item) => item.value === listing.status)
                  ?.label || ''
              }
            />
            <BuySellIndiInfo
              label={'작성일'}
              description={dateFormatter(new Date(listing.createdAt))}
            />
            <BuySellIndiInfo
              label={'가격'}
              description={`$ ${listing.price.toLocaleString()}`}
            />
          </div>
          <div className='flex flex-row sm:flex-col justify-center items-center w-full sm:w-[120px] gap-2'>
            <MyEditDeleteButton label={'수정하기'} onClick={() => {}} editEl />
            <MyEditDeleteButton
              label={'삭제하기'}
              onClick={() => {
                confirmOpen();
                setTypeAndIt({ type: 'buysell', id: (listing as any)._id });
              }}
              deleteEl
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyBuySellListingCard;
