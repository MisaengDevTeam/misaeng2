'use client';

import { signOut } from 'next-auth/react';
import UserMenuItem from './UserMenuItem';
import { useRouter } from 'next/navigation';

interface UserMenuWithUserProps {
  toggleSession: () => void;
  roommateModalOpen: () => void;
  rentModalOpen: () => void;
  buysellModalOpen: () => void;
}

const UserMenuWithUser: React.FC<UserMenuWithUserProps> = ({
  toggleSession,
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
          toggleSession();
        }}
      />
      <UserMenuItem
        mobileVisible
        label='룸메 찾기'
        onClick={() => {
          router.push('/roommate');
          toggleSession();
        }}
      />
      <UserMenuItem
        mobileVisible
        label='사고팔기'
        onClick={() => {
          router.push('/buysell');
          toggleSession();
        }}
      />
      <UserMenuItem
        label='렌트찾기 등록하기'
        onClick={() => {
          rentModalOpen();
          toggleSession();
        }}
      />
      <UserMenuItem
        label='룸메찾기 등록하기'
        onClick={() => {
          roommateModalOpen();
          toggleSession();
        }}
      />
      <UserMenuItem
        label='사고팔기 등록하기'
        onClick={() => {
          buysellModalOpen();
          toggleSession();
        }}
      />
      <UserMenuItem label='마이 페이지' onClick={() => {}} />
      <UserMenuItem label='고객 센터' onClick={() => {}} />
      <UserMenuItem
        label='로그 아웃'
        onClick={() => signOut({ callbackUrl: '/' })}
      />
    </div>
  );
};
export default UserMenuWithUser;
