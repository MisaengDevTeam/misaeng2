'use client';

import { signOut } from 'next-auth/react';
import UserMenuItem from './UserMenuItem';

interface UserMenuWithUserProps {
  toggleSession: () => void;
}

const UserMenuWithUser: React.FC<UserMenuWithUserProps> = ({
  toggleSession,
}) => {
  return (
    <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[130px] bg-white overflow-hidden right-0 top-15 md:top-12 text-sm'>
      <UserMenuItem label='렌트 찾기' onClick={() => {}} />
      <UserMenuItem label='룸메 찾기' onClick={() => {}} />
      <UserMenuItem label='마이 페이지' onClick={() => {}} />
      <UserMenuItem label='고객 센터' onClick={() => {}} />
      <UserMenuItem label='로그 아웃' onClick={() => signOut()} />
    </div>
  );
};
export default UserMenuWithUser;
