'use client';

import { useEffect, useRef, useState } from 'react';
import EmptyState from '../components/EmptyState';
import RoommateIndividualModal from '../components/modal/RoommateIndividualModal';
import RoommatePageBody from '../components/roommatepage/RoommatePageBody';
import RoommatePageSearchBar from '../components/roommatepage/RoommatePageSearchBar';
import axios from 'axios';
import { RoommateListing } from '@prisma/client';
import LoadingScreen from '../components/LoadingScreen';
import useRoommateIndividualModal from '../components/hooks/useRoommateIndividualModal';
import { useSearchParams } from 'next/navigation';

const RoommatePage = ({}) => {
  const hasModalOpened = useRef(false);
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <RoommateIndividualModal />
      <RoommatePageSearchBar />
      {initListings && (
        <RoommatePageBody
          listings={initListings}
          RoommateIndividualOpen={roommateIndividualModal.onOpen}
        />
      )}

      {/* <EmptyState title='룸메찾기' /> */}
    </div>
  );
};
export default RoommatePage;
