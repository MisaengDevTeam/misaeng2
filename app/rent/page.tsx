'use client';

import { useCallback, useEffect, useState } from 'react';
import { getListings } from '../actions/getListings';
import EmptyState from '../components/EmptyState';
import Searchbar from '../components/Searchbar';
import RentPageBody from '../components/rentpage/RentPageBody';
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreen';
import RentIndividualModal from '../components/modal/RentIndividualModal';
import useRentIndividualModal from '../components/hooks/useRentIndividualModal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const RentPage = () => {
  const [safeListings, setSafeListings] = useState([]);
  const [initListings, setInitListings] = useState([]);
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
  }, [initListings]);

  const params = useSearchParams();
  const rentlistingid = params?.get('rentlisting');
  const pathname = usePathname();
  const router = useRouter();

  // console.log(pathname);

  // console.log(router);

  if (rentlistingid) console.log('hi');

  if (isLoading) {
    return <LoadingScreen />; // You can replace this with a loading spinner or similar
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
      />
    </div>
  );
};

export default RentPage;
