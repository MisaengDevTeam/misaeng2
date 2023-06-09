import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import prisma from '@/app/lib/prismaDb';
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
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
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
  // debug: process.env.NODE_ENV == 'development',
  // debug: true,
  pages: { signIn: '/' },
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async session({ session, token, user }) {
      const currentUser = await prisma.user.findUnique({
        where: {
          email: session.user!.email as string,
        },
      });

      session = {
        ...session,
        user: {
          ...user,
          id: currentUser?.id as string,
          name: currentUser?.name as string,
          email: currentUser?.email as string,
          image: currentUser?.image as string,
          newImage: currentUser?.newImage as string[],
          emailVerified: currentUser?.emailVerified as Date,
          nickname: currentUser?.nickname as string,
          phone: currentUser?.phone as string,
          kakaoId: currentUser?.kakaoId as string,
          status: currentUser?.status as string,
          jobLocation: currentUser?.jobLocation as string,
        },
      };

      return session;
    },
  },

  jwt: {
    maxAge: 60 * 60 * 12,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
