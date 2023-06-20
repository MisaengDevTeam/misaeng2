'use client';

import Image from 'next/image';

const MainBannerImage = ({}) => {
  return (
    <div className='hidden md:block w-full h-[360px] relative overflow-hidden'>
      <Image
        src={`https://misaeng.s3.amazonaws.com/asset/img/main-1.png`}
        fill
        sizes='200'
        priority
        alt='mainbanner'
        className='object-cover h-full w-full brightness-75'
      />
      <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center '>
        <h1 className='text-base md:text-2xl lg:text-4xl text-white tracking-wider font-black'>
          미생은 여러분들의 성공적인 미국 생활을 응원합니다!
        </h1>
      </div>
    </div>
  );
};
export default MainBannerImage;
