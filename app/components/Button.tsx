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
      className={`relative justify-center rounded-lg hover:bg-[#EC662A] hover:text-white transition w-full h-full
      ${
        disabled
          ? 'cursor-not-allowed bg-gray-800 opacity-70'
          : 'cursor-pointer bg-orange-500'
      }
      
    ${
      outline
        ? 'bg-white border-black text-black'
        : 'bg-orange-500 border-orange-500 text-white'
    } 
    
    ${
      small
        ? 'py-1 text-sm font-light border-[1px]'
        : 'py-3 text-md font-semibold border-2'
    }
    `}
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
