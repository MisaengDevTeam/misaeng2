'use client';

import { FieldValues, UseFormRegister } from 'react-hook-form';
import Heading from '../../Heading';
import { AMENITY, FEATURE } from '@/types/RentTypes';
import RentCompAmenity from './RentCompAmenity';
import RentCompFeature from './RentCompFeature';

interface RentModalAmenityProps {
  onChange: (subcat: string, value: any) => void;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  amenity: string[];
  feature: string[];
}

const RentModalAmenity: React.FC<RentModalAmenityProps> = ({
  onChange,
  register,
  errors,
  amenity,
  feature,
}) => {
  return (
    <div>
      <Heading title='렌트하시는 방의 편의시설에 대해 알려주세요 (4/6)' />
      <div className='flex flex-col mt-4 gap-4'>
        <div className='flex flex-col gap-2'>
          <div>건물 편의시설</div>
          <div className='grid grid-cols-4 gap-2'>
            {AMENITY.map((item) => (
              <RentCompAmenity
                amenity={amenity}
                key={item.value}
                item={item}
                register={register}
                errors={errors}
                onChange={onChange}
              />
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div>방 편의시설</div>
          <div className='grid grid-cols-4 gap-2'>
            {FEATURE.map((item) => (
              <RentCompFeature
                feature={feature}
                key={item.value}
                item={item}
                register={register}
                errors={errors}
                onChange={onChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RentModalAmenity;
