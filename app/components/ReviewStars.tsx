import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

interface StarsProps {
  value: number;
}

const Stars: React.FC<StarsProps> = ({ value }) => {
  const roundedValue = Math.round(value * 2) / 2;
  const stars = [];

  for (let i = 0; i < Math.floor(roundedValue); i++) {
    stars.push(<BsStarFill key={i} size={24} color='#FFCD3C' />);
  }

  if (!Number.isInteger(roundedValue)) {
    stars.push(<BsStarHalf key={'half'} size={24} color='#FFCD3C' />);
  }

  while (stars.length < 5) {
    stars.push(
      <BsStar key={`empty${stars.length}`} size={24} color='#BCBCBC' />
    );
  }

  return <div className='flex flex-row'>{stars}</div>;
};

export default Stars;
