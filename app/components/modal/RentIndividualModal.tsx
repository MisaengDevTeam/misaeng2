'use client';

import { useSession } from 'next-auth/react';
import Modal from './Modal';
import useRentIndividualModal from '../hooks/useRentIndividualModal';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
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
import toast from 'react-hot-toast';

interface RentRegisterModalProps {
  mypage?: boolean;
}

const RentRegisterModal: React.FC<RentRegisterModalProps> = ({ mypage }) => {
  const [step, setStep] = useState<number>(1);
  const [buildingInfo, setBuildingInfo] = useState<any>(null);
  const [buildingToSubwayInfo, setBuildingToSubwayInfo] = useState<any>(null);
  const [reviewInfo, setReviewInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [currentListing, setCurrentListing] = useState<RentListing | null>(
    null
  );

  const { data: session } = useSession();
  const currentUser = session?.user;
  const params = useSearchParams();
  const rentlistingid = params?.get('rentlisting');
  const router = useRouter();

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
          setReviewInfo(res.data.reviewInfo);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }

    // setCurrentListing(response)
  }, [rentlistingid]);

  const rentIndividualModal = useRentIndividualModal();

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

  const headerTitle = `${currentListing.title}`;

  let bodyContent: JSX.Element | null;

  if (step == 1) {
    bodyContent = (
      <div
        className={`h-[100%] sm:h-[61vh] overflow-x-hidden overflow-y-scroll`}
      >
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
            reviewInfo={reviewInfo}
          />
          {/* <RentIndiDescription
            title='房源简介'
            description={currentListing.description}
          />
          <RentIndiAmenity
            title='大楼设施'
            items={currentListing.amenity}
            type={AMENITY}
          />
          <RentIndiAmenity
            title='公寓设施'
            items={currentListing.feature}
            type={FEATURE}
          />
          <RentIndiDetail
            title='其他'
            category={currentListing.category}
            broker={currentListing.broker}
            utility={currentListing.utility}
          />
          <RentIndiMap title='位置' coordinate={buildingInfo.coordinate} />
          <RentIndiSubway title='周边交通' subway={buildingToSubwayInfo} />
          <RentIndiReview title='最新点评' subtitle='' /> */}
        </div>
      </div>
    );
  }
  if (step == 2) {
    bodyContent = (
      <div className='flex flex-col items-center py-[36px] gap-8'>
        <div className='text-lg font-semibold'>
          이메일: {currentListing.contact[0]}
        </div>
        <div className='text-lg font-semibold'>
          연락처: {currentListing.contact[1]}
        </div>
        <div className='text-lg font-semibold'>
          카카오톡: {currentListing.contact[2]}
        </div>
      </div>
    );
  }

  let footerContent = (
    <div className='h-full my-2'>
      <div className={`flex justify-evenly`}>
        {/* <RentIndiFooterButton
          color='#EC662A'
          label='赞'
          onClick={() => {
            setLike(!like);
          }}
          icon={like ? BsHeartFill : BsHeart}
        />
        <RentIndiFooterButton
          color='#9DCAEB'
          label='分享'
          onClick={handleCopy}
          icon={FaRegShareSquare}
        />
        <RentIndiFooterButton
          color='#D0342C'
          label='举报'
          onClick={() => {}}
          icon={RiAlarmWarningLine}
        /> */}
        {/* <RentIndiFooterButton
          color='#EC662A'
          label='좋아요'
          onClick={() => {
            setLike(!like);
          }}
          icon={like ? BsHeartFill : BsHeart}
        /> */}
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
      <div className='w-full h-[56px] sm:h-auto mt-1'>
        {step == 1 ? (
          <Button
            onClick={() => {
              setStep(2);
            }}
            label={'판매자 연락하기'}
          />
        ) : (
          <Button
            label={'뒤로가기'}
            onClick={() => {
              setStep(1);
            }}
          ></Button>
        )}
      </div>
      {/* <div className='w-full h-[56px] sm:h-auto mt-2'>
        <Button onClick={() => {}} label={'我要申请 :)'} />
      </div> */}
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentIndividualModal.isOpen}
      onClose={rentIndividualModal.onClose}
      title={headerTitle}
      body={bodyContent!}
      footer={footerContent}
      mypage={mypage}
      rentindividual
      separator
    />
  );
};
export default RentRegisterModal;
