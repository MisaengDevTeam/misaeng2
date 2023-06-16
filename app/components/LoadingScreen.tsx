'use client';

import Image from 'next/image';
import LoadingSpinner from './LoadingSpinner';

interface LoadingScreenProps {
  messagetitle?: string;
  messagesubtitle?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  messagetitle,
  messagesubtitle,
}) => {
  return (
    <div className='absolute top-0 left-0 w-full h-full bg-white rounded-lg flex flex-col justify-center items-center gap-4'>
      <Image
        src={`/assets/images/logo/logo_vertical.png`}
        width={180}
        height={90}
        alt='logo'
      />
      <LoadingSpinner />
      <div className='flex flex-col text-center'>
        <p>{messagetitle}</p>
        <p>{messagesubtitle}</p>
      </div>
    </div>
  );
};
export default LoadingScreen;
