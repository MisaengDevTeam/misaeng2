import ClientOnly from './components/ClientOnly';
import LoginModal from './components/modal/LoginModal';
import Navbar from './components/navbar/Navbar';

import './globals.css';
import { Nunito_Sans } from 'next/font/google';
import ToasterProvider from './components/ToasterProvider';
import RoommateRegisterModal from './components/modal/RoommateRegisterModal';
import SessProvider from './components/SessProvider';
import Footer from './components/footer/Footer';
import RentRegisterModal from './components/modal/RentRegisterModal';
import BuySellRegisterModal from './components/modal/BuySellRegisterModal';
import BlogIndividualModal from './components/modal/BlogIndividualModal';
import ReportModal from './components/modal/ReportModal';

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
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      />
      <body className={`${font.className}`}>
        <ClientOnly>
          <SessProvider>
            <ToasterProvider />
            <LoginModal />
            <RentRegisterModal />
            <RoommateRegisterModal />
            <BuySellRegisterModal />
            <BlogIndividualModal />
            <ReportModal />
            <Navbar />
            <div className='w-full h-[65px] sm:h-[89px] md:h-[77px]'></div>
            {children}
            <Footer />
          </SessProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
