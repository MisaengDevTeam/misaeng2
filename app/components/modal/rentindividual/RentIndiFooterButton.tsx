'use client';

import { useCallback } from 'react';
import { IconType } from 'react-icons';

interface RentIndiFooterButtonProps {
  label: string;
  onClick: () => void;
  icon: IconType;
  color: string;
}

const RentIndiFooterButton: React.FC<RentIndiFooterButtonProps> = ({
  label,
  onClick,
  icon: Icon,
  color,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-1 cursor-pointer py-1 px-2 transition rounded-lg hover:font-bold
      
      `}
    >
      <Icon size={16} color={color} />
      {label}
    </div>
  );
};
export default RentIndiFooterButton;
