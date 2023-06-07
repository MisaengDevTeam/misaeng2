'use client';

import { useEffect, useState } from 'react';
import { getListings } from '../actions/getListings';
import EmptyState from '../components/EmptyState';
import Searchbar from '../components/Searchbar';
import RentPageBody from '../components/rentpage/RentPageBody';
import axios from 'axios';

const RentPage = () => {
  const [safeListings, setSafeListings] = useState([]);
  const [groupedMapListings, setGroupedMapListings] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/rentListing/rentListing`);
      setSafeListings(response.data.listings);
      setGroupedMapListings(response.data.groupedMapListings);
    };

    fetchData();
  }, []);

  console.log('SafeListings:', safeListings); // This will log safeListings whenever the component re-renders.
  console.log('GroupedMapListings:', groupedMapListings); // This will log groupedMapListings whenever the component re-renders.

  return (
    <div>
      <Searchbar />
      {safeListings && groupedMapListings && (
        <RentPageBody
          listings={safeListings}
          groupedMapListings={groupedMapListings}
        />
      )}

      {/* <EmptyState title='렌트찾기' /> */}
    </div>
  );
};

export default RentPage;
