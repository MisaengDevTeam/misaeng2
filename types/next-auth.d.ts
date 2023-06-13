import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: Date;
      image: string;
      jobLocation?: string;
      kakaoId?: string;
      nickname?: string;
      phone?: string;
      status?: string;
      newImage?: string[];
    };
  }
}
