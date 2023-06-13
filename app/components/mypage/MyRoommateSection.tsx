'use client';

import Image from 'next/image';
import Heading from '../Heading';
import rmAvatarFinder from '@/app/lib/rmAvatarFinder';
import BuySellIndiInfo from '../modal/buysellindividual/BuySellIndiInfo';
import MyEditDeleteButton from './MyEditDeleteButton';
import QueryString from 'query-string';
import dateFormatter from '@/app/lib/dateFormatter';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { ITypeAndId } from '@/types/MyPageTypes';

interface MyRoommateSectionProps {
  title: string;
  listing: any;
  roommateIndividualModalOpen: () => void;
  confirmOpen: () => void;
  setTypeAndIt: (type: ITypeAndId) => void;
}

const MyRoommateSection: React.FC<MyRoommateSectionProps> = ({
  title,
  listing,
  roommateIndividualModalOpen,
  confirmOpen,
  setTypeAndIt,
}) => {
  // console.log(listing);

  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(
    (roommateId: string) => {
      let currentQuery = {};

      if (params) {
        currentQuery = QueryString.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        roommatelisting: roommateId,
      };

      if (params?.get('roommatelisting') == roommateId) {
        delete updatedQuery.category;
      }

      const url = QueryString.stringifyUrl(
        {
          url: '/mypage/roommate-listing/',
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );

  return (
    <div className='w-full'>
      <Heading title={title} />
      <div className='flex flex-col sm:flex-row w-full gap-4 group rounded-lg hover:bg-[#EC662A]/10 cursor-pointer '>
        <div className='flex flex-col w-full sm:max-w-[840px] px-4 pb-4 sm:px-0 sm:pb-0 justify-center'>
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
            <div
              onClick={() => {
                roommateIndividualModalOpen();
                handleClick((listing as any)._id);
              }}
              className='flex justify-between text-lg sm:text-[14px] font-light w-full gap-4'
            >
              <div className='flex flex-col justify-between w-full'>
                <BuySellIndiInfo
                  label={'작성일'}
                  description={dateFormatter(new Date(listing.createdAt))}
                />
                <BuySellIndiInfo
                  label={'입주 가능 날짜'}
                  description={dateFormatter(new Date(listing.movedate))}
                />
                <BuySellIndiInfo
                  label={'방 종류'}
                  description={listing.roomtype}
                />
                <BuySellIndiInfo
                  label={'희망 가격'}
                  description={`$ ${listing.price.toLocaleString()}`}
                />
              </div>
              <div
                className={`flex flex-col justify-between w-full hidden md:flex`}
              >
                <BuySellIndiInfo label={'지역'} description={listing.city} />
                <BuySellIndiInfo
                  label={'위치'}
                  description={listing.district}
                />
                <BuySellIndiInfo
                  label={'희망 계약 기간'}
                  description={listing.length}
                />

                <BuySellIndiInfo
                  label={'카테고리'}
                  description={listing.category}
                />
              </div>
            </div>
            <div className='flex flex-row sm:flex-col justify-center items-center w-full sm:w-[120px] gap-2'>
              <MyEditDeleteButton
                label={'수정하기'}
                onClick={() => {}}
                editEl
              />
              <MyEditDeleteButton
                label={'삭제하기'}
                onClick={() => {
                  confirmOpen();
                  setTypeAndIt({ type: 'roommate', id: (listing as any)._id });
                }}
                deleteEl
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyRoommateSection;
