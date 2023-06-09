'use client';

import EmptyState from '../components/EmptyState';
import RoommateIndividualModal from '../components/modal/RoommateIndividualModal';
import RoommatePageBody from '../components/roommatepage/RoommatePageBody';
import RoommatePageSearchBar from '../components/roommatepage/RoommatePageSearchBar';

const RoommatePage = ({}) => {
  return (
    <div>
      <RoommateIndividualModal />
      <RoommatePageSearchBar />
      <RoommatePageBody />
      {/* <EmptyState title='룸메찾기' /> */}
    </div>
  );
};
export default RoommatePage;
