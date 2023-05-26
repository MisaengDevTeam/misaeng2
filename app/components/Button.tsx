'use client';

import React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: IconType;
  label: React.ReactElement | string;
  outline?: boolean;
  disabled?: boolean;
  small?: boolean;
  iconSize?: number;
  type?: 'submit';
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  icon: Icon,
  label,
  outline,
  disabled,
  small,
  iconSize,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`relative justify-center disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:bg-[#EC662A] hover:text-white transition w-full 
    ${outline ? 'bg-white' : 'bg-orange-500'} 
    ${outline ? 'border-black' : 'border-orange-500'} 
    ${outline ? 'text-black' : 'text-white'}
    ${small ? 'py-1' : 'py-3'}
    ${small ? 'text-sm' : 'text-md'}
    ${small ? 'font-light' : 'font-semibold'}
    ${small ? 'border-[1px]' : 'border-2'}`}
    >
      {Icon && (
        <Icon
          size={iconSize ? iconSize : 24}
          className={`absolute 
          ${iconSize ? `left-5` : `left-4`} 
          ${iconSize ? `top-4` : `top-3`}`}
        />
      )}
      {label}
    </button>
  );
};
export default Button;
