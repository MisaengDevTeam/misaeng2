'use client';

import Image from 'next/image';

interface pageProps {}

const RoommatePage = ({}) => {
  return (
    <div className='flex flex-col w-full justify-center items-center h-[90vh] md:h-[50vh] pb-8'>
      <Image
        width={720}
        height={480}
        src={'/assets/images/img/setup.png'}
        alt={'logo'}
      />
      <div className='flex flex-col gap-4 justify-center items-center text-lg'>
        <div>개발자가 혼신의 힘을 다해 개발중 이예요 :D</div>
      </div>
    </div>
  );
};
export default RoommatePage;
