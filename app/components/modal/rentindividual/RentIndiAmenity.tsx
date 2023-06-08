'use client';

import { IAmenity } from '@/types/RentTypes';
import { useCallback } from 'react';

interface RentIndiAmenityProps {
  title: string;
  items: string[];
  type?: IAmenity[];
}

const RentIndiAmenity: React.FC<RentIndiAmenityProps> = ({
  title,
  items,
  type,
}) => {
  const findLabelByValue = useCallback(
    (value: string, array: IAmenity[]): string => {
      const item = array.find((item) => item.value === value);
      return item ? item.label : '';
    },
    []
  );

  return (
    <div className='flex flex-col gap-2'>
      <div className='font-semibold text-lg'>{title}</div>
      <div className='grid grid-cols-3 gap-x-2 gap-y-1'>
        {items.map((item) => (
          <div
            key={item}
            className='flex justify-center items-center py-1 px-2 border-[1px] border-[#EC662A] rounded-full font-light text-[12px] sm:text-sm md:text-base'
          >
            {findLabelByValue(item, type as IAmenity[])}
          </div>
        ))}
      </div>
    </div>
  );
};
export default RentIndiAmenity;
