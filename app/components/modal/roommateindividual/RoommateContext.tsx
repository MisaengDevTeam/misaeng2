'use client';

import { roommateContext, MBTI_TYPE } from '@/types/RoommateTypes';
import { CgSmile } from 'react-icons/cg';

interface RoommateContextProps {
  title: string;
  description: string;
}

const RoommateContext: React.FC<RoommateContextProps> = ({
  title,
  description,
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='font-semibold text-lg'>{title}</div>
      <div className='font-light whitespace-pre-wrap'>{description}</div>
    </div>
  );
};
export default RoommateContext;
