'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import QueryString from 'query-string';

interface BlogHotCardProps {
  title: string;
  imgsrc: string;
  id: string;
  BlogIndividualOpen: () => void;
}

const BlogHotCard: React.FC<BlogHotCardProps> = ({
  title,
  id,
  imgsrc,
  BlogIndividualOpen,
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
      className='flex justify-center overflow-hidden w-full relative border border-[#EC662A] rounded-lg bg-[#fff] group cursor-pointer'
    >
      <Image
        className='relative w-[100%] aspect-square lg:aspect-video rounded-lg object-cover group-hover:scale-110 transition'
        width={0}
        height={0}
        sizes='100%'
        src={imgsrc}
        alt='img'
      />
      <div className='flex justify-center items-center absolute w-full h-[40px] bottom-0 bg-neutral-900/50 text-[#fff] font-semibold text-sm md:text-base text-center'>
        <p className='w-[80%] truncate'>{title}</p>
      </div>
    </div>
  );
};
export default BlogHotCard;
