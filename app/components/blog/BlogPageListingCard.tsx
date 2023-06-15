'use client';

import Image from 'next/image';

interface BlogPageListingCardProps {
  category: string;
  title: string;
  imgsrc: string;
  description: string;
}

const BlogPageListingCard: React.FC<BlogPageListingCardProps> = ({
  category,
  title,
  imgsrc,
  description,
}) => {
  return (
    <div className='flex flex-row w-full mb-6 gap-4 group cursor-pointer'>
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
              src={'/assets/images/logo/logo_square.png'}
              alt={'g'}
            />
            <p className='text-[14px] text-neutral-600'>Simon Lee</p>
          </div>
          <p className='text-[14px] text-neutral-600'>작성일: 06/14/2023</p>
        </div>
        <p className='break-words overflow-hidden hidden sm:block sm:h-[64px] text-[14px] font-light'>
          {description}
        </p>
      </div>
    </div>
  );
};
export default BlogPageListingCard;
