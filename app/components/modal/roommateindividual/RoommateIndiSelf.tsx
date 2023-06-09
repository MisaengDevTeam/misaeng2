'use client';

import { MBTI_TYPE } from '@/types/RoommateTypes';

interface RoommateIndiSelfProps {
  title: string;
  selfgender: string;
  selfstatus: string;
  selfage: string;
  selfmbti: string;
  selfpet: string;
  selfsmoke: string;
}

const RoommateIndiSelf: React.FC<RoommateIndiSelfProps> = ({
  title,
  selfgender,
  selfstatus,
  selfage,
  selfmbti,
  selfpet,
  selfsmoke,
}) => {
  return (
    <div>
      <div className='text-semibold'>{title}</div>
      <div>{selfgender}</div>
      <div>{selfstatus}</div>
      <div>{selfage}</div>
      <div>{selfmbti}</div>
      <div>{selfpet}</div>
      <div>{selfsmoke}</div>
      <div>{MBTI_TYPE[selfmbti as keyof typeof MBTI_TYPE]}</div>
    </div>
  );
};
export default RoommateIndiSelf;
