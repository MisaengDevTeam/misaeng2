'use client';

import { useEffect, useState } from 'react';
import { getListings } from '../actions/getListings';
import EmptyState from '../components/EmptyState';
import Searchbar from '../components/Searchbar';
import RentPageBody from '../components/rentpage/RentPageBody';
import axios from 'axios';

const RentPage = () => {
  const [safeListings, setSafeListings] = useState([]);
  const [mapListings, setMapListings] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/rentListing/rentListing`);
        console.log(response.data);
        setSafeListings(response.data.recentListings);
        setMapListings(response.data.mapListing);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or similar
  }

  return (
    <div>
      {/* <Searchbar /> */}
      {
        <RentPageBody
          listings={safeListings}
          mapListings={mapListings}
          setSafeListings={setSafeListings}
        />
      }

      {/* <EmptyState title='렌트찾기' /> */}
    </div>
  );
};

export default RentPage;
