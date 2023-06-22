'use client';

import rmAvatarFinder from '@/app/lib/rmAvatarFinder';
import { categoryColorizer } from '@/app/lib/rmColorizer';
import Image from 'next/image';
import RoommateInfoContainer from './RoommateInfoContainer';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import QueryString from 'query-string';

interface RoommateListingCardProps {
  category: string;
  gender: string;
  status: string;
  mbti: string;
  age: string;
  city: string;
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

  return (
    <div
      onClick={() => {
        rentIndividualOpen();
        handleClick(id);
      }}
      className='flex flex-col justify-center p-3 gap-2 w-full bg-white rounded-lg hover:shadow-lg transition cursor-pointer border'
    >
      <div
        className={`w-full text-center text-[#fff] py-1/2 font-light text-[12px] sm:text-sm md:text-base rounded-full ${categoryColorizer(
          category
        )} `}
      >
        {category}
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
        city={city}
      />
    </div>
  );
};
export default RoommateListingCard;
