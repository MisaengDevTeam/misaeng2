import ClientOnly from './components/ClientOnly';
import LoginModal from './components/modal/LoginModal';
import Navbar from './components/navbar/Navbar';

import './globals.css';
import { Nunito_Sans } from 'next/font/google';
import { getCurrentUser } from './actions/getCurrentUser';
import ToasterProvider from './components/ToasterProvider';
import RoommateRegisterModal from './components/modal/RoommateRegisterModal';

const font = Nunito_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Misaeng',
  description: 'Find your home abroad',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={`${font.className}`}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RoommateRegisterModal />
          <Navbar currentUser={currentUser} />
          {children}
        </ClientOnly>
      </body>
    </html>
  );
}
