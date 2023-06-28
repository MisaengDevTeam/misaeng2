'use client';

import { IconType } from 'react-icons';

interface RentIndiContactButtonProps {
  label: string;
  bgColor: string;
  icon: IconType;
  onClick: () => void;
}

const RentIndiContactButton: React.FC<RentIndiContactButtonProps> = ({
  label,
  bgColor,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col sm:flex-row sm:gap-1 justify-center items-center w-full aspect-video max-h-[48px] rounded-lg font-light text-sm sm:text-base 
       ${bgColor} 
      ${label == '카카오톡' ? ' text-black' : ' text-white'}
      `}
    >
      <Icon className='text-base sm:text-2xl' />
      {label}
    </button>
  );
};
export default RentIndiContactButton;
