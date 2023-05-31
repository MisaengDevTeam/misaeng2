'use client';

import { SessionProvider } from 'next-auth/react';

interface SessProviderProps {
  children: React.ReactNode;
}

const SessProvider: React.FC<SessProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default SessProvider;
