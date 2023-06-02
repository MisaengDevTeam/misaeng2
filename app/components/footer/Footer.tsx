'use client';

import Image from 'next/image';
import FooterMenuItem from './FooterMenuItem';
import FooterCopyright from './FooterCopyright';

const Footer = ({}) => {
  return (
    <div className='w-full bg-[#EC662A]/20 flex flex-col justify-center items-center gap-8 py-16'>
      <div className='flex flex-col sm:flex-row gap-6 sm:gap-12 text-center'>
        <FooterMenuItem title='서비스 이용약관' href='' />
        <FooterMenuItem title='개인정보취급방침' href='' />
        <FooterMenuItem title='마케팅정보 수신동의' href='' />
      </div>
      <Image
        src={`/assets/images/logo/logo_vertical.png`}
        alt='footer_logo'
        width={120}
        height={60}
      />
      <FooterCopyright
        address={'20 River Rd, New York, NY, 10044'}
        email={'misaeng.dev@gmail.com'}
        copyright={'ⓒ2022, Misaeng, Inc, All Rights Reserved'}
      />
    </div>
  );
};
export default Footer;
