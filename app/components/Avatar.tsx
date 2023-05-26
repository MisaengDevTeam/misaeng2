'use client';

import Image from 'next/image';

interface AvatarProps {
  imgsrc?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ imgsrc }) => {
  return (
    <Image
      className='rounded-full'
      height='30'
      width='30'
      alt='Avatar'
      src={imgsrc || '/assets/images/avatar/default_avatar.png'}
    />
  );
};
export default Avatar;
