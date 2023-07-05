'use client';

import Image from 'next/image';

interface pageProps {}

const RoommatePage = ({}) => {
  return (
    <div className='flex flex-col w-full justify-center items-center h-[90vh] md:h-[50vh] gap-4'>
      <Image
        width={180}
        height={120}
        src={'/assets/images/logo/logo_vertical.png'}
        alt={'logo'}
      />
      <div>현재 룸메이트 찾기 서비스를 이용하실 수 없습니다.</div>
      <div>웹사이트 이용에 불편함을 드려 죄송합니다.</div>
    </div>
  );
};
export default RoommatePage;
