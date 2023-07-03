'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
      <div className='w-full md:w-[50%]'>
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
      </div>
    </div>
  );
};
export default ClientForm;
