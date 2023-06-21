'use client';

import { useState } from 'react';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';
import Stars from '../../ReviewStars';

interface RentIndiReviewCardProps {
  openReviewDetail: boolean;
  setOpenReviewDetail: () => void;
  reviewDetail: any;
}

const RentIndiReviewCard: React.FC<RentIndiReviewCardProps> = ({
  openReviewDetail,
  setOpenReviewDetail,
  reviewDetail,
}) => {
  return (
    <>
      <div className='w-full flex flex-col items-center mb-4'>
        <div className='flex flex-col justify-center items-center w-full h-[240px] '>
          <div className='flex flex-col bg-[#fafafa] w-[90%] h-[90%] rounded-lg shadow-lg p-4'>
            <div className='flex flex-row items-center justify-center w-full h-[30%] gap-2'>
              {/* <div>综合评分</div> */}
              <div>추천 평점</div>
              <div className='flex flex-row gap-1 items-center justify-center'>
                <Stars value={reviewDetail.averageRate} />
              </div>
              <div>{reviewDetail.averageRate}</div>
            </div>
            <hr />
            <div className='grid grid-cols-4 w-full h-[60%]'>
              <div className='flex flex-col justify-center items-center'>
                {/* <div>大楼</div> */}
                <div>건물</div>
                <Stars value={reviewDetail.buildingRate} rentModal />
                <div>{reviewDetail.buildingRate}</div>
              </div>
              <div className='flex flex-col justify-center items-center'>
                {/* <div>安全</div> */}
                <div>안전</div>
                <Stars value={reviewDetail.safeRate} rentModal />
                <div>{reviewDetail.safeRate}</div>
              </div>
              <div className='flex flex-col justify-center items-center'>
                {/* <div>交通</div> */}
                <div>교통</div>
                <Stars value={reviewDetail.transportationRate} rentModal />
                <div>{reviewDetail.transportationRate}</div>
              </div>
              <div className='flex flex-col justify-center items-center'>
                {/* <div>生活服务</div> */}
                <div>편의</div>
                <Stars value={reviewDetail.convenienceRate} rentModal />
                <div>{reviewDetail.convenienceRate}</div>
              </div>
            </div>
            <hr />
            <div
              onClick={setOpenReviewDetail}
              className='flex flex-row justify-between'
            >
              {/* <div className='text-[12px] font-semibold cursor-pointer'>
                展开评论
              </div>
              <div className='text-[12px] font-semibold'>右滑下一条</div> */}
              <div className='text-[12px] font-semibold cursor-pointer'>
                클릭하여 자세히 보기
              </div>
              <div className='text-[12px] font-semibold'>
                밀어서 다른 리뷰 보기
              </div>
            </div>
          </div>
        </div>
        {openReviewDetail && (
          <div className='flex flex-col bg-[#fafafa] w-[90%] h-[90%] rounded-lg shadow-lg p-4 gap-2'>
            <div>
              {/* <div className='font-semibold'>大楼</div> */}
              <div className='font-semibold'>건물</div>
              <div className='text-sm font-light'>
                {reviewDetail.buildingReview}
              </div>
            </div>
            <div>
              {/* <div className='font-semibold'>安全</div> */}
              <div className='font-semibold'>안전</div>
              <div className='text-sm font-light'>
                {reviewDetail.safeReview}
              </div>
            </div>
            <div>
              {/* <div className='font-semibold'>交通</div> */}
              <div className='font-semibold'>교통</div>
              <div className='text-sm font-light'>
                {reviewDetail.transportationReview}
              </div>
            </div>
            <div>
              {/* <div className='font-semibold'>生活服务</div> */}
              <div className='font-semibold'>편의</div>
              <div className='text-sm font-light'>
                {reviewDetail.convenienceReview}
              </div>
            </div>
            <hr />
            <div
              onClick={setOpenReviewDetail}
              className='w-full pt-2 text-center text-sm cursor-pointer'
            >
              클릭하여 자세한 리뷰 닫기
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default RentIndiReviewCard;
