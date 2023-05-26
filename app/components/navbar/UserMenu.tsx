'use client';

import { useCallback, useState } from 'react';
import UserMenuWithUser from './UserMenuWithUser';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import useLoginModal from '../hooks/useLoginModal';
import { User } from '@prisma/client';
import Avatar from '../Avatar';
import { signOut } from 'next-auth/react';

interface UserMenuProps {
  currentUser: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const [tempSession, setTempSession] = useState(false);

  console.log(currentUser);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const toggleUserSession = useCallback(() => {
    setTempSession((value) => !value);
    setIsOpen(false);
  }, []);

  const tempSessionFunction = useCallback(() => {
    loginModal.onOpen();
    toggleUserSession();
  }, [loginModal, toggleUserSession]);

  return !currentUser ? (
    <div>
      <div
        onClick={tempSessionFunction}
        className='text-lg cursor-pointer font-light hover:text-[#EC662A] hover:font-semibold'
      >
        간편 로그인 하기
      </div>
      {/* <button onClick={() => signOut()}>temp logout</button> */}
    </div>
  ) : (
    <div className='relative'>
      <div
        onClick={toggleOpen}
        className='flex flex-row gap-2 justify-center items-center py-2 px-4 border border-neutral-600 rounded-full cursor-pointer hover:shadow-md transition'
      >
        <AiOutlineMenu size={24} color='neutral-600' />
        <div className='hidden md:block'>
          <Avatar imgsrc={currentUser?.image} />
        </div>
      </div>
      {isOpen && <UserMenuWithUser toggleSession={toggleUserSession} />}
    </div>
  );
};
export default UserMenu;
