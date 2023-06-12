'use client';

import { useCallback, useEffect, useState } from 'react';
import useRoommateIndividualModal from '../hooks/useRoommateIndividualModal';
import Modal from './Modal';
import RentIndiFooterButton from './rentindividual/RentIndiFooterButton';
import toast from 'react-hot-toast';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { FaRegShareSquare } from 'react-icons/fa';
import { RiAlarmWarningLine } from 'react-icons/ri';
import Button from '../Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { BuySellListing } from '@prisma/client';
import Image from 'next/image';
import useBuySellIndividualModal from '../hooks/useBuySellIndividualModal';
import BuySellIndiPicture from './buysellindividual/BuySellIndiPicture';
import dateFormatter from '@/app/lib/dateFormatter';

interface BuySellIndividualModalProps {}

const BuySellIndividualModal: React.FC<BuySellIndividualModalProps> = ({}) => {
  const [like, setLike] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentListing, setCurrentListing] = useState<BuySellListing | null>(
    null
  );
  const buySellIndividualModal = useBuySellIndividualModal();

  const params = useSearchParams();
  const buysellid = params?.get('buyselllisting');
  const router = useRouter();
  const { data: session } = useSession();
  const currentUser = session?.user;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('주소가 복사되었습니다!');
    } catch (err) {
      toast.error(`Something went wrong!`);
      console.error('Failed to copy text: ', err);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (buysellid) {
      axios
        .post(`/api/buysellListing/buysellListing`, {
          buysellId: buysellid,
        })
        .then((res) => {
          setCurrentListing(res.data.listingInfo[0]);
          console.log(res.data.listingInfo[0]);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [buysellid]);

  if (!currentListing) return null;

  const bodyContent = (
    <div className='flex flex-col h-[60vh] overflow-y-scroll'>
      <div className='flex justify-between text-xs text-neutral-700'>
        <div className='md:text-sm'>
          작성일: {dateFormatter(new Date(currentListing.createdAt))}
        </div>
        <div className='md:text-sm'>오늘: {dateFormatter(new Date())}</div>
      </div>
      <BuySellIndiPicture pictures={currentListing.pictures} />
      <hr />
      <div className='flex flex-col justify-center items-center gap-6 p-4'>
        <div className='font-bold text-lg'>{currentListing.title}</div>
        <div className='w-[70%]'>
          <div className='flex justify-between'>
            <div>물건 상태: </div>
            <div>{`${currentListing.status}`}</div>
          </div>

          <div>{`가격: $ ${currentListing.price.toLocaleString()}`}</div>
          <div>{`${currentListing.status}`}</div>
        </div>
      </div>
    </div>
  );

  const footerContent = (
    <div>
      <div className='flex justify-evenly'>
        <RentIndiFooterButton
          color='#EC662A'
          label='좋아요'
          onClick={() => {
            setLike(!like);
          }}
          icon={like ? BsHeartFill : BsHeart}
        />
        <RentIndiFooterButton
          color='#9DCAEB'
          label='공유하기'
          onClick={handleCopy}
          icon={FaRegShareSquare}
        />
        <RentIndiFooterButton
          color='#D0342C'
          label='신고하기'
          onClick={() => {}}
          icon={RiAlarmWarningLine}
        />
      </div>
      <div>
        <Button onClick={() => {}} label={'판매자 연락하기'} />
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={buySellIndividualModal.isOpen}
      onClose={buySellIndividualModal.onClose}
      title={currentListing.title}
      body={bodyContent}
      footer={footerContent}
      rentindividual
    />
  );
};
export default BuySellIndividualModal;
