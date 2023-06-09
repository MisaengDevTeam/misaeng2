'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import RentPageBody from '../components/rentpage/RentPageBody';
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreen';
import RentIndividualModal from '../components/modal/RentIndividualModal';
import useRentIndividualModal from '../components/hooks/useRentIndividualModal';
import { useSearchParams } from 'next/navigation';

const RentPage = () => {
  const hasModalOpened = useRef(false);

  const [safeListings, setSafeListings] = useState([]);
  const [initListings, setInitListings] = useState([]);
  const [initMapListings, setInitMapListings] = useState([]);
  const [individualListing, setIndividualListing] = useState({});
  const [mapListings, setMapListings] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/rentListing/rentListing`);

        setSafeListings(response.data.recentListings);
        setInitListings(response.data.recentListings);
        setMapListings(response.data.mapListing);
        setInitMapListings(response.data.mapListing);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const rentIndividualModal = useRentIndividualModal();

  const setDefaultListing = useCallback(() => {
    setSafeListings(initListings);
    setMapListings(initMapListings);
  }, [initListings, initMapListings]);

  const params = useSearchParams();
  const rentlistingid = params?.get('rentlisting');

  useEffect(() => {
    if (
      !hasModalOpened.current &&
      rentlistingid &&
      rentIndividualModal.onOpen
    ) {
      rentIndividualModal.onOpen();
      hasModalOpened.current = true;
    }
  }, [rentIndividualModal, rentIndividualModal.onOpen, rentlistingid]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <RentIndividualModal
        title='THIS IS RENT INDIVIDUAL PAGE TITLE'
        individualListing={individualListing}
      />
      <RentPageBody
        listings={safeListings}
        mapListings={mapListings}
        setSafeListings={setSafeListings}
        setDefaultListing={setDefaultListing}
        rentIndividualOpen={rentIndividualModal.onOpen}
        setIndividualListing={setIndividualListing}
        setMapListings={setMapListings}
      />
    </div>
  );
};

export default RentPage;
