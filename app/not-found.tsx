'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='flex justify-center w-full h-[90vh] md:h-[50vh]'>
      <div className='flex flex-col items-center justify-center w-full md:w-[50%] py-8 gap-4'>
        <Image
          width={180}
          height={120}
          src={'/assets/images/logo/logo_vertical.png'}
          alt={'logo'}
        />
        <h1>페이지가 존재하지 않습니다.</h1>
        <div className='flex w-full md:w-[50%] justify-center'>
          <button
            onClick={() => {
              router.back();
            }}
            className='w-[50%] max-w-[360px] bg-[#EC662A] text-[#FFF] py-2 rounded-full hover:shadow-lg'
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}
