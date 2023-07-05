'use client';

import Modal from './Modal';
import useRentIndividualModal from '../hooks/useRentIndividualModal';
import Button from '../Button';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RentListing } from '@prisma/client';
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';

import emailjs from '@emailjs/browser';

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
import { RiAlarmWarningLine, RiKakaoTalkFill } from 'react-icons/ri';
import { MdEmail, MdPhone, MdTextsms } from 'react-icons/md';
import RentIndiFooterButton from './rentindividual/RentIndiFooterButton';
import RentIndiDetail from './rentindividual/RentIndiDetail';
import toast from 'react-hot-toast';
import RentIndiContact from './rentindividual/RentIndiContact';
import RentIndiContactButton from './rentindividual/RentIndiContactButton';
import Image from 'next/image';
import useReportModal from '../hooks/useReportModal';

interface RentIndividualModalProps {
  mypage?: boolean;
}

const RentIndividualModal: React.FC<RentIndividualModalProps> = ({
  mypage,
}) => {
  const form = useRef<HTMLFormElement>(null);

  const [step, setStep] = useState<number>(1);
  const [buildingInfo, setBuildingInfo] = useState<any>(null);
  const [buildingToSubwayInfo, setBuildingToSubwayInfo] = useState<any>(null);
  const [reviewInfo, setReviewInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [contact, setContact] = useState('kakao');
  const [currentListing, setCurrentListing] = useState<RentListing | null>(
    null
  );
  const [emailSent, setEmailSent] = useState(false);

  const { data: session } = useSession();
  const currentUser = session?.user;
  const params = useSearchParams();
  const rentlistingid = params?.get('rentlisting');
  const router = useRouter();

  const rentIndividualModal = useRentIndividualModal();
  const reportModal = useReportModal();

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

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('주소가 복사되었습니다!');
    } catch (err) {
      toast.error(`Something went wrong!`);
      console.error('Failed to copy text: ', err);
    }
  }, []);

  const sendContactEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current !== null) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID!,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        )
        .then(
          (result) => {
            console.log(result.text);
            setEmailSent(true);
          },
          (error) => {
            console.log(error.text);
          }
        );
    } else {
      console.error('form.current is null');
    }
  };

  const reportListing = () => {
    rentIndividualModal.onClose();
    reportModal.onOpen();
  };

  if (!currentListing) return null;

  const headerTitle = `${currentListing.title}`;

  const generateContact = (means: string) => {
    const currentLink =
      `I would like to ask this room: ${window.location.href}`.toLocaleLowerCase();
    switch (means) {
      case 'kakao':
        return (
          <div className='w-full h-full flex flex-col items-center justify-center gap-2 py-2'>
            <div className='flex justify-center items-center w-[42vw] max-w-[360px]'>
              <Image
                width={200}
                height={300}
                src={'/assets/images/img/qr_image.png'}
                alt={'qr_image'}
              />
            </div>
            <button
              onClick={() => {
                handleCopy();
                router.push('https://open.kakao.com/o/sQbwnisf');
              }}
              className='flex justify-center items-center w-[80%] h-[40px] max-w-[240px] bg-[#FFD800] rounded-lg gap-1'
            >
              <RiKakaoTalkFill size={24} />
              <span> 여기를 클릭해서 방 문의하기!</span>
            </button>
          </div>
        );
      // case 'email':
      //   return emailSent ? (
      //     <div className='flex flex-col w-full h-full justify-center items-center gap-1'>
      //       <Image
      //         width={200}
      //         height={300}
      //         src={'/assets/images/logo/logo_vertical.png'}
      //         alt={'logo'}
      //       />
      //       <p>문의가 완료되었습니다!</p>
      //       <p>가능한 빨리 답변드리도록 하겠습니다!</p>
      //     </div>
      //   ) : (
      //     <form
      //       ref={form}
      //       onSubmit={sendContactEmail}
      //       className='flex flex-col w-full max-w-[480px] py-2 sm:py-4 gap-1 overflow-y-scroll h-full'
      //     >
      //       <RentIndiContact
      //         label={'이름'}
      //         placeholder={'이름'}
      //         maxLength={24}
      //         name={'contact_name'}
      //       />
      //       <RentIndiContact
      //         label={'직업'}
      //         placeholder={'학생 또는 직장인'}
      //         maxLength={10}
      //         name={'contact_status'}
      //       />
      //       <RentIndiContact
      //         label={'이메일'}
      //         placeholder={'이메일'}
      //         maxLength={30}
      //         name={'contact_email'}
      //       />
      //       <RentIndiContact
      //         label={'연락처'}
      //         placeholder={'한국 또는 미국 전화번호'}
      //         maxLength={15}
      //         name={'contact_phone'}
      //       />
      //       <RentIndiContact
      //         label={'카톡아이디'}
      //         placeholder={'연락 가능한 카톡 아이디'}
      //         maxLength={36}
      //         name={'contact_kakao'}
      //       />
      //       <input
      //         readOnly
      //         className='hidden'
      //         name={'contact_listing'}
      //         value={window.location.href}
      //       />
      //       <button
      //         type='submit'
      //         className='text-white bg-[#3944BC] mt-3 py-2 text-sm font-light rounded-lg hover:shadow-lg'
      //       >
      //         이메일로 뉴욕 방찾기!
      //       </button>
      //     </form>
      //   );
      case 'phone':
        return (
          <div className='w-full h-full flex flex-col items-center justify-center gap-4 py-2'>
            <div>미생 USA: +1 914 294 8785</div>
            <a
              href='tel:9142948785'
              className='flex items-center justify-center w-full bg-green-400 text-[#FFF] py-2 rounded-xl gap-2'
            >
              <MdPhone size={20} />
              <p>클릭하여 전화 상담하기</p>
            </a>
            <a
              href={`sms:9142948785&body=${currentLink}`}
              className='flex items-center justify-center w-full bg-blue-400 text-[#FFF] py-2 rounded-xl gap-2'
            >
              <MdTextsms size={20} />
              클릭하여 문자 보내기
            </a>
          </div>
        );
    }
  };

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
      <div className='flex flex-col items-center py-2 gap-2 px-4 h-full'>
        <div className='w-full grid grid-cols-2 gap-2 mt-1'>
          {/* <RentIndiContactButton
            label={'이메일'}
            bgColor={'bg-[#3944BC]'}
            icon={MdEmail}
            onClick={() => {
              setContact('email');
            }}
          /> */}
          <RentIndiContactButton
            label={'전화'}
            bgColor={'bg-[#028A0F]'}
            icon={MdPhone}
            onClick={() => {
              setContact('phone');
            }}
          />
          <RentIndiContactButton
            label={'카카오톡'}
            bgColor={'bg-[#FFD800]'}
            icon={RiKakaoTalkFill}
            onClick={() => {
              setContact('kakao');
            }}
          />
        </div>
        {generateContact(contact)}
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
          onClick={reportListing}
          icon={RiAlarmWarningLine}
        />
      </div>
      <div className='w-full h-[7vh] sm:h-auto mt-1'>
        {step == 1 ? (
          <Button
            onClick={() => {
              setStep(2);
            }}
            label={'리스팅 문의하기'}
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
export default RentIndividualModal;
