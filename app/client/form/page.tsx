'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const ClientForm = ({}) => {
  const [iframeHeight, setIframeHeight] = useState('4500');
  const { data: session } = useSession();
  const currentUser = session?.user;

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth > 768) {
        setIframeHeight('4100');
      } else {
        setIframeHeight('4500');
      }
    };

    updateHeight();

    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!currentUser)
    return (
      <div className='flex flex-col items-center justify-center w-full py-8 my-8 gap-4'>
        <Image
          width={180}
          height={120}
          src={'/assets/images/logo/logo_vertical.png'}
          alt={'logo'}
        />
        <div>문의 작성을 위해 로그인 해주시기 바랍니다.</div>
      </div>
    );
  return (
    <div className='flex justify-center w-full py-8'>
      <div className='flex flex-col justify-center items-center w-full md:w-[50%]'>
        <iframe
          src='https://docs.google.com/forms/d/e/1FAIpQLSfctRz8F0yAjLZcqZYb9I1d2uIsnGm13IVlTm8IlijpdmR6cQ/viewform?embedded=true'
          width='100%'
          height={iframeHeight}
          frameBorder='0'
          marginHeight={0}
          marginWidth={0}
        >
          Loading…
        </iframe>
        <div className='flex w-full justify-center'>
          <button
            onClick={handleScrollTop}
            className='flex w-[80%] max-w-[360px] justify-center items-center bg-[#EC662A] text-[#FFF] rounded-full py-2 hover:shadow-xl'
          >
            맨위로 올라가기
          </button>
        </div>
      </div>
    </div>
  );
};
export default ClientForm;
