'use client';

import { signOut } from 'next-auth/react';
import UserMenuItem from './UserMenuItem';
import { useRouter } from 'next/navigation';

interface UserMenuWithUserProps {
  roommateModalOpen: () => void;
  rentModalOpen: () => void;
  buysellModalOpen: () => void;
}

const UserMenuWithUser: React.FC<UserMenuWithUserProps> = ({
  roommateModalOpen,
  rentModalOpen,
  buysellModalOpen,
}) => {
  const router = useRouter();
  return (
    <div className='absolute rounded-xl shadow-md border-[1px] border-neutral-600 w-[50vw] md:w-[180px] bg-white overflow-hidden right-0 top-12 text-md z-20'>
      <UserMenuItem
        mobileVisible
        label='렌트 찾기'
        onClick={() => {
          router.push('/rent');
        }}
      />
      <UserMenuItem
        mobileVisible
        label='룸메 찾기'
        onClick={() => {
          router.push('/roommate');
        }}
      />
      <UserMenuItem
        mobileVisible
        label='사고팔기'
        onClick={() => {
          router.push('/buysell');
        }}
      />
      <UserMenuItem
        label='렌트찾기 등록하기'
        onClick={() => {
          rentModalOpen();
        }}
      />
      <UserMenuItem
        label='룸메찾기 등록하기'
        onClick={() => {
          roommateModalOpen();
        }}
      />
      <UserMenuItem
        label='사고팔기 등록하기'
        onClick={() => {
          buysellModalOpen();
        }}
      />
      <UserMenuItem
        label='마이 페이지'
        onClick={() => {
          router.push('/mypage');
        }}
      />
      <UserMenuItem
        label='고객 센터'
        onClick={() => {
          router.push('/customer');
        }}
      />
      <UserMenuItem
        label='로그 아웃'
        onClick={() => signOut({ callbackUrl: '/' })}
      />
    </div>
  );
};
export default UserMenuWithUser;
