'use client';

import Image from 'next/image';

interface AvatarProps {
  imgsrc?: string | null | undefined;
  mypage?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ imgsrc, mypage }) => {
  return (
    <Image
      className='rounded-full border border-neutral-200'
      height={mypage ? '160' : '30'}
      width={mypage ? '160' : '30'}
      alt='Avatar'
      priority={false}
      src={imgsrc || '/assets/images/avatar/default_avatar.png'}
    />
  );
};
export default Avatar;
