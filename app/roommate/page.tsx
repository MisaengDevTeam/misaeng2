'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import EmptyState from '../components/EmptyState';
import RoommateIndividualModal from '../components/modal/RoommateIndividualModal';
import RoommatePageBody from '../components/roommatepage/RoommatePageBody';
import RoommatePageSearchBar from '../components/roommatepage/RoommatePageSearchBar';
import axios from 'axios';
import { RoommateListing } from '@prisma/client';
import LoadingScreen from '../components/LoadingScreen';
import useRoommateIndividualModal from '../components/hooks/useRoommateIndividualModal';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const RoommatePage = ({}) => {
  const hasModalOpened = useRef(false);
  const [listings, setListings] = useState<RoommateListing[] | null>(null);
  const [initListings, setInitListings] = useState<RoommateListing[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const roommateIndividualModal = useRoommateIndividualModal();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/roommateListing/roommateListing`
        );
        setInitListings(response.data.initListings);
        setListings(response.data.initListings);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const params = useSearchParams();
  const rentlistingid = params?.get('roommatelisting');

  useEffect(() => {
    if (
      !hasModalOpened.current &&
      rentlistingid &&
      roommateIndividualModal.onOpen
    ) {
      roommateIndividualModal.onOpen();
      hasModalOpened.current = true;
    }
  }, [roommateIndividualModal, roommateIndividualModal.onOpen, rentlistingid]);

  const setDefaultListing = useCallback(() => {
    setListings(initListings);
  }, [initListings]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <RoommateIndividualModal />
      <RoommatePageSearchBar
        setListings={setListings}
        setDefaultListing={setDefaultListing}
      />
      {listings?.length != 0 ? (
        <RoommatePageBody
          listings={listings}
          RoommateIndividualOpen={roommateIndividualModal.onOpen}
        />
      ) : (
        <div className='w-full h-[250px] flex justify-center items-center my-[60px]'>
          <div className='relative flex flex-col justify-center items-center w-[300px] h-auto gap-4'>
            <Image
              width={160}
              height={120}
              src={`/assets/images/logo/logo_vertical.png`}
              alt='no_listing'
            />
            <p className='text-lg'>{`검색결과가 없습니다.`}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default RoommatePage;
