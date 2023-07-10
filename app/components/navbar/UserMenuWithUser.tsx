'use client';

import { signOut } from 'next-auth/react';
import UserMenuItem from './UserMenuItem';
import { useRouter } from 'next/navigation';

interface UserMenuWithUserProps {
  roommateModalOpen: () => void;
  rentModalOpen: () => void;
  buysellModalOpen: () => void;
  closeUserMenu: () => void;
}

const UserMenuWithUser: React.FC<UserMenuWithUserProps> = ({
  roommateModalOpen,
  rentModalOpen,
  buysellModalOpen,
  closeUserMenu,
}) => {
  const router = useRouter();
  return (
    <div className='absolute rounded-xl shadow-md border-[1px] border-neutral-600 w-[50vw] md:w-[180px] bg-white overflow-hidden right-0 top-12 text-md z-20'>
      <UserMenuItem
        mobileVisible
        label='렌트 찾기'
        onClick={async () => {
          closeUserMenu();
          router.push('/rent');
        }}
      />
      <UserMenuItem
        mobileVisible
        label='룸메 찾기'
        onClick={() => {
          closeUserMenu();
          router.push('/roommate');
        }}
      />
      <UserMenuItem
        mobileVisible
        label='사고팔기'
        onClick={() => {
          closeUserMenu();
          router.push('/buysell');
        }}
      />
      <UserMenuItem
        mobileVisible
        label='미국꿀팁'
        onClick={() => {
          closeUserMenu();
          router.push('/blog');
        }}
      />
      {/* <UserMenuItem
        label='미생 소개'
        onClick={() => {
          closeUserMenu();
          router.push('/about-us');
        }}
      /> */}
      {/* <UserMenuItem
        label='렌트찾기 등록하기'
        onClick={() => {
          closeUserMenu();
          rentModalOpen();
        }}
      />
      <UserMenuItem
        label='룸메찾기 등록하기'
        onClick={() => {
          closeUserMenu();
          roommateModalOpen();
        }}
      />
      <UserMenuItem
        label='사고팔기 등록하기'
        onClick={() => {
          closeUserMenu();
          buysellModalOpen();
        }}
      />
      <UserMenuItem
        label='마이 페이지'
        onClick={() => {
          closeUserMenu();
          router.push('/mypage/edit');
        }}
      /> */}
      <UserMenuItem
        label='문의 센터'
        onClick={() => {
          closeUserMenu();
          router.push('/customer');
        }}
      />
      {/* <UserMenuItem
        label='로그 아웃'
        onClick={() => {
          closeUserMenu();
          signOut({ callbackUrl: '/' });
        }}
      /> */}
    </div>
  );
};
export default UserMenuWithUser;
