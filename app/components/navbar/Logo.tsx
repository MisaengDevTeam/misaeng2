'use client';

import Image from 'next/image';

interface LogoProps {}

const Logo: React.FC<LogoProps> = ({}) => {
  return (
    <>
      <Image
        className='hidden md:block cursor-pointer'
        src='/assets/images/logo/logo_horizon.png'
        width={210}
        height={45}
        alt='logo_horizon'
      />
      <Image
        className='md:hidden cursor-pointer'
        src='/assets/images/logo/logo_square.png'
        width={56}
        height={56}
        alt='logo_square'
      />
    </>
  );
};
export default Logo;
