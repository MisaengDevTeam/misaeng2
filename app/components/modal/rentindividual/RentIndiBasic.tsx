'use client';

import { useCallback } from 'react';

import { IoBedOutline } from 'react-icons/io5';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiBath } from 'react-icons/bi';
import { BsCurrencyDollar } from 'react-icons/bs';

interface RentIndiBasicProps {
  bed: string;
  bath: string;
  movedate: string;
  price: number;
}

const RentIndiBasic: React.FC<RentIndiBasicProps> = ({
  bed,
  bath,
  movedate,
  price,
}) => {
  const trimBedBath = useCallback((str: string) => {
    if (str == 'Studio' || str == 'Share') return str;
    return str.slice(0, -4);
  }, []);

  return (
    <div className='grid grid-cols-4'>
      <div className='flex flex-col gap-1 justify-center items-center border-x-[1px] border-neutral-300'>
        <IoBedOutline size={20} />
        <span className='font-light'>{trimBedBath(bed)}</span>
      </div>
      <div className='flex flex-col gap-1 justify-center items-center border-r-[1px] border-neutral-300'>
        <BiBath size={20} />
        <span className='font-light'>{trimBedBath(bath)}</span>
      </div>
      <div className='flex flex-col gap-1 justify-center items-center border-r-[1px] border-neutral-300'>
        <AiOutlineCalendar size={20} />
        <span className='font-light'>{movedate.slice(0, -5)}</span>
      </div>
      <div className='flex flex-col gap-1 justify-center items-center border-r-[1px] border-neutral-300'>
        <BsCurrencyDollar size={20} />
        <span className='font-light'>{price.toLocaleString()}</span>
      </div>
    </div>
  );
};
export default RentIndiBasic;
