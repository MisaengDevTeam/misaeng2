'use client';

import { IconType } from 'react-icons';
import { MdMicrowave, MdOutlineLocalLaundryService } from 'react-icons/md';
import { TbAirConditioning, TbWashMachine } from 'react-icons/tb';
import { MdOutlineBathtub, MdOutlineBalcony } from 'react-icons/md';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useCallback } from 'react';

const ICONS: { [key: string]: IconType } = {
  MdMicrowave,
  MdOutlineLocalLaundryService,
  TbAirConditioning,
  TbWashMachine,
  MdOutlineBathtub,
  MdOutlineBalcony,
};

interface RentCompFeatureProps {
  item: any;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  feature: string[];
  onChange: (subcat: string, value: any) => void;
}

const RentCompFeature: React.FC<RentCompFeatureProps> = ({
  item,
  register,
  errors,
  feature,
  onChange,
}) => {
  const { label, value, icon } = item;
  const Icon = ICONS[icon];

  const handleSelect = useCallback(
    (value: string) => {
      if (feature.includes(value)) {
        const addValueFeature = feature.filter((item) => item !== value);
        onChange('feature', addValueFeature);
      } else {
        onChange('feature', [...feature, value]);
      }
    },
    [feature, onChange]
  );
  return (
    <div
      className={`flex flex-col xl:flex-row items-center justify-center py-1 px-2 border-[1px] cursor-pointer gap-1 lg:gap-2 rounded-lg hover:border-[#EC662A] hover:text-[#EC662A]
      
      
      ${
        feature.includes(value)
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
export default RentCompFeature;
