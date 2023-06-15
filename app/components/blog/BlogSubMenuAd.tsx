'use client';

import Image from 'next/image';

interface BlogSubMenuAdProps {}

const BlogSubMenuAd: React.FC<BlogSubMenuAdProps> = ({}) => {
  return (
    <div className='flex justify-center overflow-hidden w-full relative bg-[#fff] rounded-xl'>
      <Image
        className='relative w-[100%] aspect-video rounded-xl object-cover group-hover:scale-110 transition bg-neutral-700'
        width={0}
        height={0}
        sizes='100%'
        src={'/assets/images/logo/logo_square.png'}
        alt='img'
      />
      <div className='flex justify-center items-center absolute w-full h-full top-0 left-0 bg-neutral-900/50 text-[#fff] font-semibold text-sm md:text-base'>
        광고
      </div>
    </div>
  );
};
export default BlogSubMenuAd;
