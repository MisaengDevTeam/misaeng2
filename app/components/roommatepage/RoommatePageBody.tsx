'use client';

import { RoommateListing } from '@prisma/client';
import Container from '../Container';
import RoommateListingCard from './RoommateListingCard';
import useRoommateIndividualModal from '../hooks/useRoommateIndividualModal';

interface RoommatePageBodyProps {
  listings: RoommateListing[];
  RoommateIndividualOpen: () => void;
}

const RoommatePageBody: React.FC<RoommatePageBodyProps> = ({
  listings,
  RoommateIndividualOpen,
}) => {
  return (
    <div className='py-8 h-auto max-h-[500px] overflow-y-scroll overflow-x-hidden'>
      <Container>
        <div className='grid grid-cols-3 sm:grid-cols-4 md::grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4'>
          {listings.map((listing) => {
            return (
              <RoommateListingCard
                rentIndividualOpen={RoommateIndividualOpen}
                key={(listing as any)._id}
                id={(listing as any)._id}
                category={listing.category}
                gender={listing.selfgender}
                status={listing.selfstatus}
                mbti={listing.selfmbti}
                age={listing.selfage}
                city={listing.city}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};
export default RoommatePageBody;
