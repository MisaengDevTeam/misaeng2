'use client';

import { useState } from 'react';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';

interface RentIndiReviewCardProps {
  reviewDetail: boolean;
  setReviewDetail: () => void;
}

const RentIndiReviewCard: React.FC<RentIndiReviewCardProps> = ({
  reviewDetail,
  setReviewDetail,
}) => {
  return (
    <>
      <div className='w-full flex flex-col items-center mb-4'>
        <div className='flex flex-col justify-center items-center w-full h-[240px] '>
          <div className='flex flex-col bg-[#fafafa] w-[90%] h-[90%] rounded-lg shadow-lg p-4'>
            <div className='flex flex-row items-center justify-center w-full h-[30%] gap-2'>
              <div>추천 평점</div>
              <div className='flex flex-row gap-1'>
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarHalf />
                <BsStar />
              </div>
              <div>3.8</div>
            </div>
            <hr />
            <div className='grid grid-cols-4 w-full h-[60%]'>
              <div className='flex flex-col justify-center items-center'>
                <div>건물</div>
                <div className='flex flex-row gap-1 text-[12px]'>
                  <BsStarFill />
                  <BsStarFill />
                </div>
                <div className='flex flex-row gap-1 text-[12px]'>
                  <BsStarFill />
                  <BsStarHalf />
                  <BsStar />
                </div>
                <div>3.8</div>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <div>안전</div>
                <div className='flex flex-row gap-1 text-[12px]'>
                  <BsStarFill />
                  <BsStarFill />
                </div>
                <div className='flex flex-row gap-1 text-[12px]'>
                  <BsStarFill />
                  <BsStarHalf />
                  <BsStar />
                </div>
                <div>3.8</div>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <div>교통</div>
                <div className='flex flex-row gap-1 text-[12px]'>
                  <BsStarFill />
                  <BsStarFill />
                </div>
                <div className='flex flex-row gap-1 text-[12px]'>
                  <BsStarFill />
                  <BsStarHalf />
                  <BsStar />
                </div>
                <div>3.8</div>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <div>편의</div>
                <div className='flex flex-row gap-1 text-[12px]'>
                  <BsStarFill />
                  <BsStarFill />
                </div>
                <div className='flex flex-row gap-1 text-[12px]'>
                  <BsStarFill />
                  <BsStarHalf />
                  <BsStar />
                </div>
                <div>3.8</div>
              </div>
            </div>
            <hr />
            <div
              onClick={setReviewDetail}
              className='flex flex-row justify-between'
            >
              <div className='text-[12px] font-semibold cursor-pointer'>
                클릭하여 자세히 보기
              </div>
              <div className='text-[12px] font-semibold'>
                밀어서 다른 리뷰 보기
              </div>
            </div>
          </div>
        </div>
        {reviewDetail && (
          <div className='flex flex-col bg-[#fafafa] w-[90%] h-[90%] rounded-lg shadow-lg p-4 gap-2'>
            <div>
              <div className='font-semibold'>건물</div>
              <div className='text-sm font-light'> HELLO WORLD</div>
            </div>
            <div>
              <div className='font-semibold'>안전</div>
              <div className='text-sm font-light'> HELLO WORLD</div>
            </div>
            <div>
              <div className='font-semibold'>교통</div>
              <div className='text-sm font-light'> HELLO WORLD</div>
            </div>
            <div>
              <div className='font-semibold'>편의</div>
              <div className='text-sm font-light'> HELLO WORLD</div>
            </div>
            <hr />
            <div
              onClick={setReviewDetail}
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
