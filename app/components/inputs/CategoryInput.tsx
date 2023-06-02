'use client';

import { IconType } from 'react-icons';

interface CategoryInputProps {
  category: string;
  description: string;
  icon: IconType;
  selected: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  category,
  description,
  icon: Icon,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(category)}
      className={`flex flex-row items-center justify-evenly gap-4 p-4 border-[2px] rounded-xl transition cursor-pointer hover:border-black
      ${selected ? 'border-[#EC662A]' : 'border-neutral-300'}
      ${selected ? 'bg-[#EC662A]/[0.1]' : 'bg-white'}
      `}
    >
      <Icon size={40} />
      <div className='flex flex-col gap-1 text-sm w-[80%]'>
        <h3>{category}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default CategoryInput;
