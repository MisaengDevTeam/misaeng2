'use client';

import rmAvatarFinder from '@/app/lib/rmAvatarFinder';
import { categoryColorizer } from '@/app/lib/rmColorizer';
import Image from 'next/image';
import RoommateInfoContainer from './RoommateInfoContainer';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import QueryString from 'query-string';

interface RoommateListingCardProps {
  category: string;
  gender: string;
  status: string;
  mbti: string;
  age: string;
  city: string;
  district: string;
  price: number;
  length: string;
  id: string;
  rentIndividualOpen: () => void;
}

const RoommateListingCard: React.FC<RoommateListingCardProps> = ({
  category,
  gender,
  status,
  mbti,
  age,
  city,
  price,
  length,
  district,
  id,
  rentIndividualOpen,
}) => {
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
          url: '/roommate/',
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );

  const commonCSS = `w-full text-center py-1/2 font-light text-[12px] sm:text-sm md:text-base rounded-full border border-neutral-300 bg-neutral-100`;

  return (
    <div
      onClick={() => {
        rentIndividualOpen();
        handleClick(id);
      }}
      className='flex flex-col justify-center p-3 gap-2 w-full bg-white rounded-lg hover:shadow-lg transition cursor-pointer border'
    >
      <div className='flex flex-col gap-1'>
        <div className={`grid grid-cols-2 gap-1`}>
          <div className={commonCSS}>$ {price.toLocaleString()}</div>
          <div className={commonCSS}>{length.substring(0, 2)}</div>
        </div>
        <div className={commonCSS}>{district}</div>
      </div>
      <div className='flex justify-center w-full relative'>
        <Image
          className='w-[80%] h-auto rounded-t-lg'
          width={0}
          height={0}
          sizes='100%'
          src={rmAvatarFinder(gender, status)}
          alt='img'
        />
      </div>
      <RoommateInfoContainer
        gender={gender}
        status={status}
        mbti={mbti}
        age={age}
      />
    </div>
  );
};
export default RoommateListingCard;
