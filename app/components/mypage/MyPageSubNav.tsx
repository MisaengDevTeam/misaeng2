'use client';

import { usePathname, useRouter } from 'next/navigation';
import MySubNavItem from './MySubNavItem';

interface MyPageSubNavProps {}

const MyPageSubNav: React.FC<MyPageSubNavProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      className={`flex sm:justify-center w-full gap-8 p-5 pb-0 sm:pb-4 border-b border-neutral-200 overflow-x-auto whitespace-nowrap
    
    `}
    >
      <MySubNavItem
        pathname={'/mypage/edit'}
        label={'개인정보 관리'}
        selected={pathname == '/mypage/edit'}
      />

      <MySubNavItem
        pathname={'/mypage/rent-listing'}
        label={'렌트목록 관리'}
        selected={pathname == '/mypage/rent-listing'}
      />
      <MySubNavItem
        pathname={'/mypage/roommate-listing'}
        label={'룸메목록 관리'}
        selected={pathname == '/mypage/roommate-listing'}
      />
      <MySubNavItem
        pathname={'/mypage/buy-sell-listing'}
        label={'사고팔기목록 관리'}
        selected={pathname == '/mypage/buy-sell-listing'}
      />
    </div>
  );
};
export default MyPageSubNav;
