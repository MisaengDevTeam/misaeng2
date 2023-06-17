'use client';

import dateFormatter from '@/app/lib/dateFormatter';
import Image from 'next/image';
import useBlogIndividualModal from '../hooks/useBlogIndividualModal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import QueryString from 'query-string';

interface BlogPageListingCardProps {
  category: string;
  title: string;
  imgsrc: string;
  description: string;
  createdAt: Date;
  author: string;
  authorImg: string;
  id: string;
  BlogIndividualOpen: () => void;
}

const BlogPageListingCard: React.FC<BlogPageListingCardProps> = ({
  category,
  title,
  BlogIndividualOpen,
  id,
  imgsrc,
  description,
  createdAt,
  author,
  authorImg,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(
    (blogId: string) => {
      let currentQuery = {};

      if (params) {
        currentQuery = QueryString.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        bloglisting: blogId,
      };

      if (params?.get('bloglisting') == blogId) {
        delete updatedQuery.category;
      }

      const url = QueryString.stringifyUrl(
        {
          url: '/blog/',
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
        BlogIndividualOpen();
        handleClick(id);
      }}
      className='flex flex-row w-full mb-6 gap-4 group cursor-pointer'
    >
      <div className='flex justify-center overflow-hidden w-[35%] max-w-[140px] aspect-square relative border border-[#EC662A] rounded-lg bg-[#fff] group cursor-pointer'>
        <Image
          className='relative w-full aspect-square rounded-lg object-cover group-hover:scale-110 transition'
          width={0}
          height={0}
          sizes='100%'
          src={imgsrc}
          alt='img'
        />
      </div>
      <div className='w-[65%] sm:w-[70%] py-2 flex flex-col justify-center'>
        {/* <div className='font-semibold'>카테고리: {category}</div> */}
        <p className='font-bold break-words md:truncate md:text-lg'>{title}</p>
        <div className='flex flex-col sm:flex-row justify-between sm:py-1'>
          <div className='flex gap-1'>
            <Image
              className='border border-[#EC662A] rounded-full'
              width={20}
              height={20}
              src={authorImg}
              alt={'g'}
            />
            <p className='text-[14px] text-neutral-600'>{author}</p>
          </div>
          <p className='text-[14px] text-neutral-600'>
            작성일: {dateFormatter(new Date(createdAt))}
          </p>
        </div>
        <p className='break-words overflow-hidden hidden sm:block sm:h-[64px] text-[14px] font-light'>
          {description}
        </p>
      </div>
    </div>
  );
};
export default BlogPageListingCard;
