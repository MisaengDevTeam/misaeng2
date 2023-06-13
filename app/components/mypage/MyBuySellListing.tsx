'use client';

import { useSession } from 'next-auth/react';
import MyPageSubNav from './MyPageSubNav';
import Avatar from '../Avatar';
import { ITypeAndId } from '@/types/MyPageTypes';
import { useEffect, useState } from 'react';
import useBuySellIndividualModal from '../hooks/useBuySellIndividualModal';
import useConfirmModal from '../hooks/useConfirmModal';
import LoadingScreen from '../LoadingScreen';
import axios from 'axios';
import MyBuySellListingCard from './MyBuySellListingCard';

interface MyBuySellListingProps {
  currentUser: any;
  setTypeAndIt: (type: ITypeAndId) => void;
}

const MyBuySellListing: React.FC<MyBuySellListingProps> = ({
  currentUser,
  setTypeAndIt,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState<any[] | null>(null);

  const buysellIndividualModal = useBuySellIndividualModal();
  const confirmModal = useConfirmModal();

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(`/api/userInfo/userInfo`, {
        uid: currentUser.id,
        mypage: 'buysell',
      })
      .then((res) => {
        setListings(res.data.buysellInfo);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser.id]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className='flex flex-col sm:flex-row justify-center w-full gap-4 py-4 sm:py-8'>
      <div className='flex flex-col justify-center items-center w-full sm:w-[340px] border-2 border-neutral-100 shadow-lg rounded-xl p-4 gap-6 sm:max-h-[440px]'>
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
      <div className='flex flex-col w-full max-w-[860px] border-2 border-neutral-100 shadow-lg rounded-xl p-4 sm:p-8 gap-6 sm:gap-8'>
        <div className='flex flex-col sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
          {listings?.map((listing) => (
            <MyBuySellListingCard
              key={(listing as any)._id}
              listing={listing}
              buysellIndividualOpen={buysellIndividualModal.onOpen}
              confirmOpen={confirmModal.onOpen}
              setTypeAndIt={setTypeAndIt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MyBuySellListing;
