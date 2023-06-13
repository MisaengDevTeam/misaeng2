'use client';

import { useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { useRouter } from 'next/navigation';

interface pageProps {}

const DefaultPage: React.FC<pageProps> = ({}) => {
  const router = useRouter();
  useEffect(() => {
    router.push('/mypage/edit');
  }, [router]);
  return <LoadingScreen />;
};
export default DefaultPage;
