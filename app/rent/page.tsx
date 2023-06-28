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

  const [safeListings, setSafeListings] = useState<any[]>([]);
  const [initMapListings, setInitMapListings] = useState([]);
  const [individualListing, setIndividualListing] = useState({});
  const [totalLength, setTotalLength] = useState(0);
  const [mapListings, setMapListings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [start, setStart] = useState<string>('0');

  const fetchData = async (start: string) => {
    try {
      const response = await axios.post(`/api/rentListing/rentListing`, {
        start,
      });
      if (Array.isArray(response.data.recentListings)) {
        setSafeListings((prev) => [...prev, ...response.data.recentListings]);
      } else {
        console.error(
          'recentListings is not an array:',
          response.data.recentListings
        );
      }
      // setInitListings(response.data.recentListings);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setIsLoading(false);
    }
    setStart((parseInt(start) + 20).toString());
  };

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await axios.get(`/api/rentListing/rentListing`);
        setMapListings(response.data.mapListing);
        // setInitMapListings(response.data.mapListing);
        setTotalLength(response.data.dataLength);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMapData();
  }, []);

  useEffect(() => {
    fetchData('0');
  }, []);

  const rentIndividualModal = useRentIndividualModal();

  const setDefaultListing = useCallback(() => {
    location.reload();
  }, []);

  const params = useSearchParams();
  const rentlistingid = params?.get('rentlisting');

  const infiniteScrollNext = useCallback(() => {
    fetchData(start.toString());
  }, [start]);

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

  return (
    <div>
      <RentIndividualModal />
      <RentPageBody
        isLoading={isLoading}
        fetchData={fetchData}
        totalLength={totalLength}
        infiniteScrollNext={infiniteScrollNext}
        listings={safeListings}
        mapListings={mapListings}
        setDefaultListing={setDefaultListing}
        rentIndividualOpen={rentIndividualModal.onOpen}
        setIndividualListing={setIndividualListing}
        setMapListings={setMapListings}
      />
    </div>
  );
};

export default RentPage;
