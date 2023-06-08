'use client';

import Slider from 'react-slick';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';
import RentIndiReviewCard from './RentIndiReviewCard';
import { useState } from 'react';

interface RentIndiReviewProps {
  title: string;
  subtitle: string;
}

const RentIndiReview: React.FC<RentIndiReviewProps> = ({ title, subtitle }) => {
  const [reviewDetail, setReviewDetail] = useState(false);
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    accessibility: true,
  };
  return (
    <div className='flex flex-col gap-2'>
      <div className='font-semibold text-lg'>{title}</div>
      <div className='font-light text-sm text-neutral-500'>{subtitle}</div>

      <Slider {...sliderSettings}>
        <RentIndiReviewCard
          reviewDetail={reviewDetail}
          setReviewDetail={() => setReviewDetail(!reviewDetail)}
        />
        <RentIndiReviewCard
          reviewDetail={reviewDetail}
          setReviewDetail={() => setReviewDetail(!reviewDetail)}
        />
      </Slider>
    </div>
  );
};
export default RentIndiReview;
