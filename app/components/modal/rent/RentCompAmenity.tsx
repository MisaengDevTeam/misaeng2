'use client';

import { IconType } from 'react-icons';
import { MdSecurity } from 'react-icons/md';
import { CgGym } from 'react-icons/cg';
import { TbElevator, TbSofa, TbLiveView } from 'react-icons/tb';
import {
  MdOutlineGarage,
  MdOutlinePool,
  MdOutlineWifi,
  MdOutlineOutdoorGrill,
  MdOutlineSoupKitchen,
  MdOutlineLocalLaundryService,
  MdOutlineSportsBasketball,
  MdOutlineSportsGolf,
  MdOutlineSportsGymnastics,
} from 'react-icons/md';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useCallback, useState } from 'react';

const ICONS: { [key: string]: IconType } = {
  MdSecurity,
  CgGym,
  TbElevator,
  TbSofa,
  TbLiveView,
  MdOutlineGarage,
  MdOutlinePool,
  MdOutlineWifi,
  MdOutlineOutdoorGrill,
  MdOutlineSoupKitchen,
  MdOutlineLocalLaundryService,
  MdOutlineSportsBasketball,
  MdOutlineSportsGolf,
  MdOutlineSportsGymnastics,
};

interface RentCompAmenityProps {
  item: any;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  amenity: string[];
  onChange: (subcat: string, value: any) => void;
}

const RentCompAmenity: React.FC<RentCompAmenityProps> = ({
  item,
  register,
  errors,
  amenity,
  onChange,
}) => {
  const { label, value, icon } = item;
  const Icon = ICONS[icon];

  const handleSelect = useCallback(
    (value: string) => {
      if (amenity.includes(value)) {
        const addValueAmenity = amenity.filter((item) => item !== value);
        onChange('amenity', addValueAmenity);
      } else {
        onChange('amenity', [...amenity, value]);
      }
    },
    [amenity, onChange]
  );
  return (
    <div
      className={`flex flex-col xl:flex-row items-center justify-center py-1 px-2 border-[1px] cursor-pointer gap-1 lg:gap-2 rounded-lg hover:border-[#EC662A] hover:text-[#EC662A]
      
      
      ${
        amenity.includes(value)
          ? 'bg-[#EC662A]/[0.1] border-[#EC662A] text-[#EC662A]'
          : 'bg-white border-neutral-300 text-neutral-400 '
      }
      
      `}
      onClick={() => {
        handleSelect(value);
      }}
    >
      <Icon className='text-[22px] lg:text-[22px] xl:text-[16px] ' />
      <span className='text-[10px] lg:text-[12px] xl:text-[16px] '>
        {label}
      </span>
    </div>
  );
};
export default RentCompAmenity;
