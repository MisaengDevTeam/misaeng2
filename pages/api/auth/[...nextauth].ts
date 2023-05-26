import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import prisma from '../../../app/lib/prismaDb';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST as string,
        port: process.env.EMAIL_SERVER_PORT as string,
        auth: {
          user: process.env.EMAIL_SERVER_USER as string,
          pass: process.env.EMAIL_SERVER_PASSWORD as string,
        },
      },
      from: process.env.EMAIL_FROM as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV == 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
