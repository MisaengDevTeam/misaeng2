'use client';

import { IconType } from 'react-icons';

interface BlogSubMenuItemProps {
  firstline: string;
  secondline: string;
  icon?: IconType;
}

const BlogSubMenuItem: React.FC<BlogSubMenuItemProps> = ({
  firstline,
  secondline,
  icon: Icon,
}) => {
  return (
    <div className='flex flex-row w-full p-2 justify-between hover:bg-[#EC662A]/10 rounded-xl cursor-pointer'>
      <div className='text-lg sm:text-[12px] lg:text-base'>
        <p>{firstline}</p>
        <p>{secondline}</p>
      </div>
      {Icon && (
        <div className='flex justify-center items-center w-1/5'>
          <Icon />
        </div>
      )}
    </div>
  );
};
export default BlogSubMenuItem;
