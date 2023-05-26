'use client';

import { User } from '@prisma/client';
import Container from '../Container';
import Logo from './Logo';
import ServiceMenu from './ServiceMenu';
import UserMenu from './UserMenu';
import Link from 'next/link';

interface NavbarProps {
  currentUser: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <div className='w-full shadow-sm z-10'>
      <div className='py-4 border-b'>
        <Container>
          <div className='relative flex flex-row justify-between items-center'>
            <Link href='/'>
              <Logo />
            </Link>
            <ServiceMenu />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};
export default Navbar;
