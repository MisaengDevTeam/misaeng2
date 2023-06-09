'use client';

import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { IconType } from 'react-icons';

interface RentIndiFooterButtonProps {
  label: string;
  onClick?: () => void;
  icon: IconType;
  color: string;
}

const RentIndiFooterButton: React.FC<RentIndiFooterButtonProps> = ({
  label,
  icon: Icon,
  color,
}) => {
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('주소가 복사되었습니다!');
    } catch (err) {
      toast.error(`Something went wrong!`);
      console.error('Failed to copy text: ', err);
    }
  }, []);
  return (
    <div
      onClick={handleCopy}
      className={`flex items-center gap-1 cursor-pointer py-1 px-2 transition rounded-lg hover:font-bold
      
      `}
    >
      <Icon size={16} color={color} />
      {label}
    </div>
  );
};
export default RentIndiFooterButton;
