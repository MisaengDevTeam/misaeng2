'use client';

import { User } from '@prisma/client';
import Container from '../Container';
import Logo from './Logo';
import ServiceMenu from './ServiceMenu';
import UserMenu from './UserMenu';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import useLoginModal from '../hooks/useLoginModal';
import { useState } from 'react';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data: session } = useSession();
  const currentUser = session?.user;

  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(loginModal.isOpen);

  return (
    <div className='fixed w-full shadow-md z-20 bg-[#fff]'>
      <div className='py-1 sm:py-4 border-b'>
        <Container>
          <div className='relative flex flex-row justify-between items-center'>
            <Link href='/'>
              <Logo />
            </Link>
            <ServiceMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            <UserMenu
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              currentUser={currentUser}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};
export default Navbar;
