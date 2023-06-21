'use client';

import Slider from 'react-slick';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';
import RentIndiReviewCard from './RentIndiReviewCard';
import { useState } from 'react';

interface RentIndiReviewProps {
  title: string;
  subtitle: string;
  reviewInfo: any[];
}

const RentIndiReview: React.FC<RentIndiReviewProps> = ({
  title,
  subtitle,
  reviewInfo,
}) => {
  const [openReviewDetail, setOpenReviewDetail] = useState(false);
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    accessibility: true,
  };

  const emptyReviewBox = {
    averageRate: 0,
    buildingRate: 0,
    buildingReview: '아직 리뷰가 없습니다.',
    safeRate: 0,
    safeReview: '아직 리뷰가 없습니다.',
    transportationRate: 0,
    transportationReview: '아직 리뷰가 없습니다.',
    convenienceRate: 0,
    convenienceReview: '아직 리뷰가 없습니다.',
  };
  return (
    <div className='flex flex-col gap-2'>
      <div className='font-semibold text-lg'>{title}</div>
      <div className='font-light text-sm text-neutral-500'>
        {reviewInfo.length != 0
          ? subtitle
          : `현재 리스팅은 아직 리뷰가 없는 리스팅입니다.`}
      </div>

      <Slider {...sliderSettings}>
        {reviewInfo.length != 0 ? (
          reviewInfo.map((item) => (
            <RentIndiReviewCard
              key={(item as any)._id}
              reviewDetail={item}
              openReviewDetail={openReviewDetail}
              setOpenReviewDetail={() => setOpenReviewDetail(!openReviewDetail)}
            />
          ))
        ) : (
          <RentIndiReviewCard
            openReviewDetail={openReviewDetail}
            setOpenReviewDetail={() => setOpenReviewDetail(!openReviewDetail)}
            reviewDetail={emptyReviewBox}
          />
        )}

        {/* <RentIndiReviewCard
          openReviewDetail={openReviewDetail}
          setOpenReviewDetail={() => setOpenReviewDetail(!openReviewDetail)}
        /> */}
      </Slider>
    </div>
  );
};
export default RentIndiReview;
