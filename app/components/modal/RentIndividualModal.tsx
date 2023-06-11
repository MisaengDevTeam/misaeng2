'use client';

import { useSession } from 'next-auth/react';
import Modal from './Modal';
import useRentIndividualModal from '../hooks/useRentIndividualModal';
import { useEffect, useState } from 'react';
import Button from '../Button';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { RentListing } from '@prisma/client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RentIndiPicture from './rentindividual/RentIndiPicture';
import RentIndiBasic from './rentindividual/RentIndiBasic';
import RentIndiDescription from './rentindividual/RentIndiDescription';
import RentIndiAmenity from './rentindividual/RentIndiAmenity';

import { AMENITY, FEATURE } from '@/types/RentTypes';
import dateFormatter from '@/app/lib/dateFormatter';
import RentIndiMap from './rentindividual/RentIndiMap';
import RentIndiSubway from './rentindividual/RentIndiSubway';
import RentIndiReview from './rentindividual/RentIndiReview';

import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { FaRegShareSquare } from 'react-icons/fa';
import { RiAlarmWarningLine } from 'react-icons/ri';
import RentIndiFooterButton from './rentindividual/RentIndiFooterButton';
import RentIndiDetail from './rentindividual/RentIndiDetail';

interface RentRegisterModalProps {}

const RentRegisterModal: React.FC<RentRegisterModalProps> = ({}) => {
  const [currentListing, setCurrentListing] = useState<RentListing | null>(
    null
  );
  const [buildingInfo, setBuildingInfo] = useState<any>(null);
  const [buildingToSubwayInfo, setBuildingToSubwayInfo] = useState<any>(null);
  const params = useSearchParams();
  const rentlistingid = params?.get('rentlisting');
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = session?.user;
  const [like, setLike] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (rentlistingid) {
      axios
        .post(`/api/rentListing/rentListing`, {
          rentId: rentlistingid,
        })
        .then((res) => {
          setCurrentListing(res.data.listingInfo[0]);
          setBuildingInfo(res.data.buildingInfo[0]);
          setBuildingToSubwayInfo(res.data.buildingToSubwayInfo);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }

    // setCurrentListing(response)
  }, [rentlistingid]);

  const rentIndividualModal = useRentIndividualModal();
  if (!currentListing) return null;

  const headerTitle = `${currentListing.title}`;

  const bodyContent = (
    <div className={`h-[100%] sm:h-[61vh] overflow-x-hidden overflow-y-scroll`}>
      <div className='flex justify-between text-xs text-neutral-700'>
        <div className='md:text-sm'>
          작성일: {dateFormatter(new Date(currentListing.createdAt))}
        </div>
        <div className='md:text-sm'>오늘: {dateFormatter(new Date())}</div>
      </div>
      <RentIndiPicture pictures={currentListing.imageSrc} />
      <hr />
      <div className='flex flex-col gap-6 p-4'>
        <RentIndiBasic
          bed={currentListing.bedCount}
          bath={currentListing.bathCount}
          movedate={currentListing.moveDate}
          price={currentListing.price}
        />
        <RentIndiDescription
          title='상세설명'
          description={currentListing.description}
        />
        <RentIndiAmenity
          title='건물 편의시설'
          items={currentListing.amenity}
          type={AMENITY}
        />
        <RentIndiAmenity
          title='방 편의시설'
          items={currentListing.feature}
          type={FEATURE}
        />
        <RentIndiDetail
          title='기타사항'
          category={currentListing.category}
          broker={currentListing.broker}
          utility={currentListing.utility}
        />
        <RentIndiMap title='위치' coordinate={buildingInfo.coordinate} />
        <RentIndiSubway title='주변 지하철' subway={buildingToSubwayInfo} />
        <RentIndiReview
          title='리뷰'
          subtitle='최신 리뷰부터 순차적이며, 최대 10개까지 표시됩니다.'
        />
      </div>
    </div>
  );

  let footerContent = (
    <div className='h-full my-2'>
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
          icon={FaRegShareSquare}
        />
        <RentIndiFooterButton
          color='#D0342C'
          label='신고하기'
          onClick={() => {}}
          icon={RiAlarmWarningLine}
        />
      </div>
      <div className='w-full h-[56px] sm:h-auto mt-2'>
        <Button onClick={() => {}} label={'판매자 연락하기'} />
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentIndividualModal.isOpen}
      onClose={rentIndividualModal.onClose}
      title={headerTitle}
      body={bodyContent}
      footer={footerContent}
      rentindividual
      separator
    />
  );
};
export default RentRegisterModal;
