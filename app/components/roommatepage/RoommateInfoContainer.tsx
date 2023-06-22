'use client';

import { genderColorizer, statusColorizer } from '@/app/lib/rmColorizer';

interface RoommateInfoContainerProps {
  gender: string;
  status: string;
  mbti: string;
  age: string;
  city: string;
}

const RoommateInfoContainer: React.FC<RoommateInfoContainerProps> = ({
  gender,
  status,
  mbti,
  age,
  city,
}) => {
  const commonStyles =
    'rounded-full text-center text-[#fff] text-[12px] sm:text-sm md:text-base font-light';

  return (
    <div className='flex flex-col gap-1'>
      <div className='grid grid-cols-2  gap-1'>
        <div className={`${commonStyles} ${genderColorizer(gender)}`}>
          {gender}
        </div>
        <div className={`${commonStyles} ${statusColorizer(status)}`}>
          {status}
        </div>
        <div className={`${commonStyles} bg-[#9071D0]`}>{mbti}</div>
        <div className={`${commonStyles} bg-[#79573E]`}>{age}</div>
      </div>
      <div className={`${commonStyles} bg-[#EC662A]`}>{city}</div>
    </div>
  );
};
export default RoommateInfoContainer;
