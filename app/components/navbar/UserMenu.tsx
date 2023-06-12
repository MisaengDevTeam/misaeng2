'use client';

import { useCallback, useEffect, useState } from 'react';
import UserMenuWithUser from './UserMenuWithUser';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import useLoginModal from '../hooks/useLoginModal';
import Avatar from '../Avatar';
import useRoommateRegisterModal from '../hooks/useRoommateRegisterModal';
import useRentRegisterModal from '../hooks/useRentRegisterModal';
import useBuySellRegisterModal from '../hooks/useBuySellRegisterModal';

interface User {
  email?: string | null | undefined;
  image?: string | null | undefined;
  name?: string | null | undefined;
}

interface UserMenuProps {
  currentUser?: User | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
  isOpen,
  setIsOpen,
}) => {
  const rentRegisterModal = useRentRegisterModal();
  const roommateRegisterModal = useRoommateRegisterModal();
  const buySellRegisterModal = useBuySellRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [currentUser]);

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const closeUserMenu = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  if (isLoading) {
    return <div />;
  }

  return (
    <div>
      {!currentUser ? (
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
              closeUserMenu={closeUserMenu}
              rentModalOpen={rentRegisterModal.onOpen}
              roommateModalOpen={roommateRegisterModal.onOpen}
              buysellModalOpen={buySellRegisterModal.onOpen}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default UserMenu;
