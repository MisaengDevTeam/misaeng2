'use client';

import { useSession } from 'next-auth/react';
import MyEdit from '../../components/mypage/MyEdit';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import MyRentListing from '@/app/components/mypage/MyRentListing';
import MyRoommateListing from '@/app/components/mypage/MyRoommateListing';
import MyBuySellListing from '@/app/components/mypage/MyBuySellListing';
import Container from '@/app/components/Container';
import MyPageSubNav from '@/app/components/mypage/MyPageSubNav';
import Avatar from '@/app/components/Avatar';
import RentIndividualModal from '@/app/components/modal/RentIndividualModal';
import ConfirmModal from '@/app/components/modal/ConfirmModal';
import { useState } from 'react';
import { ITypeAndId } from '@/types/MyPageTypes';
import RoommateIndividualModal from '@/app/components/modal/RoommateIndividualModal';

interface pageProps {}

const MyPage: React.FC<pageProps> = ({}) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const currentUser = session?.user;
  const [typeAndId, setTypeAndIt] = useState<ITypeAndId>({
    type: null,
    id: null,
  });

  if (!currentUser) return null;

  const routeComponents = {
    '/tempmypage/edit': <MyEdit currentUser={currentUser} />,
    '/tempmypage/rent-listing': (
      <MyRentListing currentUser={currentUser} setTypeAndIt={setTypeAndIt} />
    ),
    '/tempmypage/roommate-listing': (
      <MyRoommateListing
        currentUser={currentUser}
        setTypeAndIt={setTypeAndIt}
      />
    ),
    '/tempmypage/buy-sell-listing': (
      <MyBuySellListing currentUser={currentUser} setTypeAndIt={setTypeAndIt} />
    ),
  };

  return (
    <div className='w-full h-auto'>
      <ConfirmModal typeAndId={typeAndId} />
      <RentIndividualModal mypage />
      <RoommateIndividualModal mypage />
      <Container>
        <MyPageSubNav />
        {routeComponents[pathname as keyof typeof routeComponents] || null}
      </Container>
    </div>
  );
};
export default MyPage;
