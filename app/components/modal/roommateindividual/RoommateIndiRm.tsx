'use client';

import { MBTI_TYPE } from '@/types/RoommateTypes';

interface RoommateIndiRmProps {
  title: string;
  rmgender: string;
  rmstatus: string;
  rmage: string;
  rmpet: string;
  rmsmoke: string;
}

const RoommateIndiRm: React.FC<RoommateIndiRmProps> = ({
  title,
  rmgender,
  rmstatus,
  rmage,
  rmpet,
  rmsmoke,
}) => {
  return (
    <div>
      <div className='text-semibold'>{title}</div>
      <div>{rmgender}</div>
      <div>{rmstatus}</div>
      <div>{rmage}</div>
      <div>{rmpet}</div>
      <div>{rmsmoke}</div>
    </div>
  );
};
export default RoommateIndiRm;
