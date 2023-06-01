import ClientOnly from './components/ClientOnly';
import LoginModal from './components/modal/LoginModal';
import Navbar from './components/navbar/Navbar';

import './globals.css';
import { Nunito_Sans } from 'next/font/google';
import ToasterProvider from './components/ToasterProvider';
import RoommateRegisterModal from './components/modal/RoommateRegisterModal';
import SessProvider from './components/SessProvider';
import Footer from './components/footer/Footer';

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
  return (
    <html lang='en'>
      <body className={`${font.className}`}>
        <ClientOnly>
          <SessProvider>
            <ToasterProvider />
            <LoginModal />
            <RoommateRegisterModal />
            <Navbar />
            {children}
            <Footer />
          </SessProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
