'use client';

import Image from 'next/image';

interface BlogHotCardProps {
  title: string;
  imgsrc: string;
}

const BlogHotCard: React.FC<BlogHotCardProps> = ({ title, imgsrc }) => {
  return (
    <div className='flex justify-center overflow-hidden w-full relative border border-[#EC662A] rounded-lg bg-[#fff] group cursor-pointer'>
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
