'use client';

import { useCallback, useState } from 'react';
import UserMenuWithUser from './UserMenuWithUser';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import useLoginModal from '../hooks/useLoginModal';
import Avatar from '../Avatar';
import useRoommateRegisterModal from '../hooks/useRoommateRegisterModal';
import useRentRegisterModal from '../hooks/useRentRegisterModal';

interface User {
  email?: string | null | undefined;
  image?: string | null | undefined;
  name?: string | null | undefined;
}

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const rentRegisterModal = useRentRegisterModal();
  const roommateRegisterModal = useRoommateRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(loginModal.isOpen);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const toggleUserSession = useCallback(() => {
    setIsOpen(false);
  }, []);

  return !currentUser ? (
    <div>
      <div
        onClick={loginModal.onOpen}
        className='text-lg cursor-pointer font-light hover:text-[#EC662A] hover:font-semibold'
      >
        간편 로그인 하기
      </div>
    </div>
  ) : (
    <div className='relative'>
      <div
        onClick={toggleOpen}
        className='flex flex-row gap-2 justify-center items-center py-2 px-4 border border-neutral-600 rounded-full cursor-pointer hover:shadow-md transition'
      >
        {isOpen ? (
          <IoCloseSharp size={24} color='neutral-600' />
        ) : (
          <AiOutlineMenu size={24} color='neutral-600' />
        )}
        <div className='hidden md:block'>
          <Avatar imgsrc={currentUser?.image} />
        </div>
      </div>
      {isOpen && (
        <UserMenuWithUser
          toggleSession={toggleUserSession}
          rentModalOpen={rentRegisterModal.onOpen}
          roommateModalOpen={roommateRegisterModal.onOpen}
        />
      )}
    </div>
  );
};
export default UserMenu;
