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
      'res.cloudinary.com',
      'misaeng.s3.us-east-1.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
