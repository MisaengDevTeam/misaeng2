'use Client';

import { useRouter, useSearchParams } from 'next/navigation';
import useRoommateIndividualModal from '../hooks/useRoommateIndividualModal';
import Modal from './Modal';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { RoommateListing } from '@prisma/client';
import Image from 'next/image';
import rmAvatarFinder from '@/app/lib/rmAvatarFinder';
import RoommateContext from './roommateindividual/RoommateContext';
import RoommateIndiAttr from './roommateindividual/RoommateIndiAttr';
import RoommateLocation from './roommateindividual/RoommateLocation';
import RentIndiFooterButton from './rentindividual/RentIndiFooterButton';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { FaRegShareSquare } from 'react-icons/fa';
import { RiAlarmWarningLine } from 'react-icons/ri';
import Button from '../Button';
import toast from 'react-hot-toast';

interface RoommateIndividualModalProps {}

const RoommateIndividualModal: React.FC<
  RoommateIndividualModalProps
> = ({}) => {
  const [currentListing, setCurrentListing] = useState<RoommateListing | null>(
    null
  );
  const params = useSearchParams();
  const roommateid = params?.get('roommatelisting');
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = session?.user;
  const [like, setLike] = useState(false);
  const roommateIndividualModal = useRoommateIndividualModal();

  useEffect(() => {
    setIsLoading(true);
    if (roommateid) {
      axios
        .post(`/api/roommateListing/roommateListing`, {
          roommateId: roommateid,
        })
        .then((res) => {
          setCurrentListing(res.data.listingInfo[0]);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [roommateid]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('주소가 복사되었습니다!');
    } catch (err) {
      toast.error(`Something went wrong!`);
      console.error('Failed to copy text: ', err);
    }
  }, []);

  if (!currentListing) return null;

  console.log(currentListing);

  const {
    category,
    price,
    movedate,
    length,
    description,
    city,
    district,
    createdAt,
    selfgender,
    selfstatus,
    selfage,
    selfmbti,
    selfpet,
    selfsmoke,
    rmgender,
    rmstatus,
    rmage,
    rmpet,
    rmsmoke,
  } = currentListing;
  const selfArray = [
    selfgender,
    selfstatus,
    selfage,
    selfmbti,
    selfpet,
    selfsmoke,
  ];

  const rmArray = [rmgender, rmstatus, rmage, rmpet, rmsmoke];
  const detailArray = [`$ ${price.toLocaleString()}`, movedate, length];

  const bodyContent = (
    <div className='flex flex-col gap-4 h-[60vh] overflow-y-scroll p-4'>
      <div className='flex justify-center w-full relatvie'>
        <Image
          className='w-[80%] h-auto rounded-lg border border-[#EC662A]'
          width={0}
          height={0}
          sizes='100%'
          src={rmAvatarFinder(selfgender, selfstatus)}
          alt='img'
        />
      </div>
      <RoommateLocation city={city} district={district} />
      <RoommateContext title='간단한 자기소개' description={description} />
      <RoommateIndiAttr title='저는요?' arr={selfArray} />
      <RoommateIndiAttr title='제가 찾는 룸메는요?' arr={rmArray} />
      <RoommateIndiAttr
        title='예산 / 입주희망일 / 입주기간'
        arr={detailArray}
      />
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
      <Button onClick={() => {}} label={'판매자 연락하기'} />
    </div>
  );

  return (
    <Modal
      isOpen={roommateIndividualModal.isOpen}
      onClose={roommateIndividualModal.onClose}
      title={category}
      body={bodyContent}
      footer={footerContent}
      separator
    />
  );
};
export default RoommateIndividualModal;
