'use client';

import { IconBaseProps, IconType } from 'react-icons';
import Heading from '../../Heading';
import { MdCardTravel } from 'react-icons/md';
import { BsHouses, BsBuildings } from 'react-icons/bs';
import { RENT_TYPE } from '@/types/RentTypes';
import CategoryInput from '../../inputs/CategoryInput';

const ICONS: { [key: string]: IconType } = {
  MdCardTravel,
  BsHouses,
  BsBuildings,
};

interface RentModalCategoryProps {
  setValue: (id: string, value: any) => void;
  category: string;
}

const RentModalCategory: React.FC<RentModalCategoryProps> = ({
  setValue,
  category,
}) => {
  return (
    <div className='flex flex-col gap-2 md:gap-4'>
      <Heading title='카테고리를 선택해주세요 (1/6)' />
      {RENT_TYPE.map((item) => (
        <CategoryInput
          key={item.rentCategory}
          category={item.rentCategory}
          description={item.rentDescription}
          icon={ICONS[item.icon as keyof typeof ICONS]}
          selected={category == item.rentCategory}
          onClick={() => {
            setValue('category', item.rentCategory);
          }}
        />
      ))}
    </div>
  );
};
export default RentModalCategory;
