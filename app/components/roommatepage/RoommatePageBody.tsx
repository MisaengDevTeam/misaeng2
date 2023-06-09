'use client';

import { RoommateListing } from '@prisma/client';
import Container from '../Container';
import RoommateListingCard from './RoommateListingCard';
import useRoommateIndividualModal from '../hooks/useRoommateIndividualModal';

interface RoommatePageBodyProps {
  listings: RoommateListing[] | null;
  RoommateIndividualOpen: () => void;
}

const RoommatePageBody: React.FC<RoommatePageBodyProps> = ({
  listings,
  RoommateIndividualOpen,
}) => {
  return (
    <div className='py-4 h-auto max-h-[80vh] overflow-y-scroll overflow-x-hidden'>
      <Container>
        <div className='w-full flex justify-center'>
          <div className='max-w-[1720px] grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4'>
            {listings?.map((listing) => {
              return (
                <RoommateListingCard
                  rentIndividualOpen={RoommateIndividualOpen}
                  key={(listing as any)._id}
                  id={(listing as any)._id}
                  length={listing.length}
                  price={listing.price}
                  category={listing.category}
                  gender={listing.selfgender}
                  status={listing.selfstatus}
                  mbti={listing.selfmbti}
                  age={listing.selfage}
                  city={listing.city}
                  district={listing.district}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};
export default RoommatePageBody;
