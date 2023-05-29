'use client';

import { IconType } from 'react-icons';

interface RmCategoryInputProps {
  roommateCategory: string;
  roommateCategoryDescription: string;
  icon: IconType;
  selected: boolean;
  onClick: (value: string) => void;
}

const RmCategoryInput: React.FC<RmCategoryInputProps> = ({
  roommateCategory,
  roommateCategoryDescription,
  icon: Icon,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(roommateCategory)}
      className={`flex flex-row gap-4 p-4 border-[2px] rounded-xl transition cursor-pointer hover:border-black
      ${selected ? 'border-[#EC662A]' : 'border-neutral-300'}
      ${selected ? 'bg-[#EC662A]/[0.1]' : 'bg-white'}
      `}
    >
      <Icon size={32} />
      <div className='flex flex-col gap-2'>
        <h3>{roommateCategory}</h3>
        <p>{roommateCategoryDescription}</p>
      </div>
    </div>
  );
};
export default RmCategoryInput;
