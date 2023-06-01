'use client';

import { useRouter } from 'next/navigation';

interface FooterMenuItemProps {
  title: string;
  href: string;
}

const FooterMenuItem: React.FC<FooterMenuItemProps> = ({ title, href }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/${href}`)}
      className='font-[100] cursor-pointer'
    >
      {title}
    </div>
  );
};
export default FooterMenuItem;
