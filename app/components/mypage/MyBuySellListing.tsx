'use client';

import { useSession } from 'next-auth/react';
import MyPageSubNav from './MyPageSubNav';
import Avatar from '../Avatar';
import { ITypeAndId } from '@/types/MyPageTypes';

interface MyBuySellListingProps {
  currentUser: any;
  setTypeAndIt: (type: ITypeAndId) => void;
}

const MyBuySellListing: React.FC<MyBuySellListingProps> = ({ currentUser }) => {
  return (
    <div className='flex flex-col sm:flex-row justify-center w-full gap-4 py-4 sm:py-8'>
      <div className='flex flex-col justify-center items-center w-full sm:w-[340px] border-2 border-neutral-100 shadow-lg rounded-xl p-4 gap-6'>
        <div className='flex flex-col justify-center items-center w-full mt-4'>
          <Avatar
            imgsrc={
              currentUser?.newImage
                ? currentUser?.newImage[0]
                : currentUser?.image
            }
            mypage
          />
        </div>

        <div className='flex flex-col gap-2 px-4'>
          <div></div>

          <div className='text-neutral-500 font-light'>
            ** 회원님의 이미지는 본인을 나타낼 수 있는 가장 큰 요소입니다.
            타인에게 불쾌감을 줄 수 있는 사진은 저희 미생팀에서 삭제할 수
            있습니다.
          </div>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row w-full max-w-[860px] border-2 border-neutral-100 shadow-lg rounded-xl p-4 sm:p-8 gap-6 sm:gap-8'>
        <div className='flex flex-col gap-6 w-full'></div>
        <div className='flex flex-col w-full gap-6'></div>
      </div>
    </div>
  );
};
export default MyBuySellListing;
