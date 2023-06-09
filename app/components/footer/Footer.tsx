'use client';

import Image from 'next/image';
import FooterMenuItem from './FooterMenuItem';
import FooterCopyright from './FooterCopyright';

const Footer = ({}) => {
  return (
    <div className='w-full bg-[#EC662A]/20 flex flex-col justify-center items-center gap-8 py-16'>
      <div className='flex flex-col sm:flex-row gap-6 sm:gap-12 text-center'>
        <FooterMenuItem title='서비스 이용약관' href='use-of-terms' />
        {/* <FooterMenuItem title='개인정보취급방침' href='' /> */}
        {/* <FooterMenuItem title='마케팅정보 수신동의' href='' /> */}
      </div>
      <Image
        src={`/assets/images/logo/logo_vertical.png`}
        alt='footer_logo'
        width={120}
        height={60}
        priority={false}
      />
      <FooterCopyright
        address={'980 6th Ave, New York, NY 10018'}
        email={'info@misaengusa.com'}
        copyright={'ⓒ 2023, All Rights Reserved. Misaengusa.com'}
      />
    </div>
  );
};
export default Footer;
