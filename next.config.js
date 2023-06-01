/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'phinf.pstatic.net',
      'misaeng.s3.amazonaws.com',
      'k.kakaocdn.net',
      'picsum.photos',
    ],
  },
};

module.exports = nextConfig;
