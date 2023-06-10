'use client';

import EmptyState from '../components/EmptyState';
import useBuySellRegisterModal from '../components/hooks/useBuySellRegisterModal';

const BuySellPage = ({}) => {
  const buySellRegisterModal = useBuySellRegisterModal();
  return (
    <div className='w-full flex flex-col justify-center items-center gap-8 p-8'>
      <div
        onClick={buySellRegisterModal.onOpen}
        className='bg-[#EC662A] text-[#FFFFFF] p-2 cursor-pointer'
      >
        OPEN MODAL
      </div>
      <div>HELLO WORLD SIMON</div>
    </div>
  );
};
export default BuySellPage;
