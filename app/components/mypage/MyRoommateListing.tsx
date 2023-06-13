'use client';

import { useSession } from 'next-auth/react';
import Avatar from '../Avatar';
import MyPageSubNav from './MyPageSubNav';
import { ITypeAndId } from '@/types/MyPageTypes';
import { useEffect, useState } from 'react';
import useRoommateIndividualModal from '../hooks/useRoommateIndividualModal';
import useConfirmModal from '../hooks/useConfirmModal';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen';
import Heading from '../Heading';
import MyRoommateSection from './MyRoommateSection';

interface MyRoommateListingProps {
  currentUser: any;
  setTypeAndIt: (type: ITypeAndId) => void;
}

const MyRoommateListing: React.FC<MyRoommateListingProps> = ({
  currentUser,
  setTypeAndIt,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [roomListings, setRoomListings] = useState<any[] | null>(null);
  const [roommateListings, setRoommateListings] = useState<any[] | null>(null);
  const [togetherListings, setTogetherListings] = useState<any[] | null>(null);

  const roommateIndividualModal = useRoommateIndividualModal();
  const confirmModal = useConfirmModal();

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(`/api/userInfo/userInfo`, {
        uid: currentUser.id,
        mypage: 'roommate',
      })
      .then((res) => {
        console.log(res);
        setRoomListings(res.data.roomInfo);
        setRoommateListings(res.data.roommateInfo);
        setTogetherListings(res.data.togetherInfo);
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
      <div className='flex flex-col w-full max-w-[860px] rounded-xl gap-4 sm:gap-8'>
        {roommateListings && (
          <div className='flex w-full justify-center items-center border-2 border-neutral-100 shadow-lg p-4 sm:p-8 rounded-xl'>
            <MyRoommateSection
              title={'룸메 찾아요'}
              listing={roommateListings}
              roommateIndividualModalOpen={roommateIndividualModal.onOpen}
              confirmOpen={confirmModal.onOpen}
              setTypeAndIt={setTypeAndIt}
            />
          </div>
        )}

        {roomListings && (
          <div className='flex w-full justify-center items-center border-2 border-neutral-100 shadow-lg p-4 sm:p-8 rounded-xl'>
            <MyRoommateSection
              title={'방 찾아요'}
              listing={roomListings}
              roommateIndividualModalOpen={roommateIndividualModal.onOpen}
              confirmOpen={confirmModal.onOpen}
              setTypeAndIt={setTypeAndIt}
            />
          </div>
        )}
        {togetherListings && (
          <div className='flex w-full justify-center items-center border-2 border-neutral-100 shadow-lg p-4 sm:p-8 rounded-xl'>
            <MyRoommateSection
              title={'같이 방 찾아요'}
              listing={togetherListings}
              roommateIndividualModalOpen={roommateIndividualModal.onOpen}
              confirmOpen={confirmModal.onOpen}
              setTypeAndIt={setTypeAndIt}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default MyRoommateListing;
