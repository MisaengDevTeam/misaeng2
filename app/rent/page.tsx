import { useEffect } from 'react';
import { getListings } from '../actions/getListings';
import EmptyState from '../components/EmptyState';
import Searchbar from '../components/Searchbar';
import RentPageBody from '../components/rentpage/RentPageBody';

const RentPage = async () => {
  const { listings, groupedMapListings } = await getListings();

  const safeListings = listings.map((listing) => ({
    ...listing,
    createdAt: new Date(listing.createdAt),
  }));

  // console.log(listings);

  // console.log(groupedMapListings);

  return (
    <div>
      <Searchbar />
      <RentPageBody
        listings={safeListings}
        groupedMapListings={groupedMapListings}
      />
      {/* <EmptyState title='렌트찾기' /> */}
    </div>
  );
};

export default RentPage;
