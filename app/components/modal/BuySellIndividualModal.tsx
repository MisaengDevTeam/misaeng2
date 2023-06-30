'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useRoommateIndividualModal from '../hooks/useRoommateIndividualModal';
import emailjs from '@emailjs/browser';
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
import BuySellIndiInfo from './buysellindividual/BuySellIndiInfo';
import MapComponent from '../Map';
import Heading from '../Heading';
import { BUY_SELL_STATUS } from '@/types/BuySellTypes';
import useReportModal from '../hooks/useReportModal';
import Textarea from '../inputs/Textarea';

interface BuySellIndividualModalProps {
  mypage?: boolean;
}

const BuySellIndividualModal: React.FC<BuySellIndividualModalProps> = ({
  mypage,
}) => {
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [currentListing, setCurrentListing] = useState<BuySellListing | null>(
    null
  );
  const [emailSent, setEmailSent] = useState(false);

  const buySellIndividualModal = useBuySellIndividualModal();
  const reportModal = useReportModal();

  const params = useSearchParams();
  const buysellid = params?.get('buyselllisting');
  const router = useRouter();
  const { data: session } = useSession();
  const currentUser = session?.user;
  const userName = currentUser?.name;
  const userEmail = currentUser?.email;

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
    setIsLoading(true);
    setEmailSent(true);

    if (form.current !== null) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_BUYSELL_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_BUYSELL_TEMPLATE_ID!,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_BUYSELL_PUBLIC_KEY!
        )
        .then(
          (result) => {
            console.log(result.text);
            setEmailSent(true);
          },
          (error) => {
            console.log(error.text);
          }
        )
        .finally(() => {
          setTimeout(() => {
            setStep(1);
            setEmailSent(false);
            setIsLoading(false);
          }, 8000);
        });
    } else {
      console.error('form.current is null');
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (buysellid) {
      axios
        .post(`/api/buysellListing/buysellListing`, {
          buysellId: buysellid,
        })
        .then((res) => {
          setCurrentListing(res.data.listingInfo[0]);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [buysellid]);

  const reportListing = () => {
    buySellIndividualModal.onClose();
    reportModal.onOpen();
  };

  if (!currentListing) return null;

  let bodyContent: JSX.Element | null;

  if (step == 1) {
    bodyContent = (
      <div className='flex flex-col h-[60vh] overflow-y-scroll overflow-x-hidden'>
        <div className='flex justify-between text-xs text-neutral-700'>
          <div className='md:text-sm'>
            작성일: {dateFormatter(new Date(currentListing.createdAt))}
          </div>
          <div className='md:text-sm'>오늘: {dateFormatter(new Date())}</div>
        </div>
        <BuySellIndiPicture pictures={currentListing.pictures} />
        <hr />
        <div className='flex flex-col justify-center items-center gap-6 p-4'>
          <div className='font-bold text-lg w-full md:w-[80%] text-center'>
            {currentListing.title}
          </div>
          <div className='flex flex-col w-full md:w-[80%] gap-2'>
            <BuySellIndiInfo
              label='물건 상태'
              description={
                BUY_SELL_STATUS.find(
                  (item) => item.value === currentListing.status
                )?.label || ''
              }
            />
            <BuySellIndiInfo
              label='가격'
              description={`$ ${currentListing.price.toLocaleString()}`}
            />
            <BuySellIndiInfo
              label='카테고리'
              description={`${currentListing.category} / ${currentListing.subcategory}`}
            />
            <BuySellIndiInfo
              label='작성일'
              description={dateFormatter(new Date(currentListing.createdAt))}
            />
          </div>
          <div className='w-full'>
            <Heading title='상품 상세 설명' />
            <div>{currentListing.description}</div>
          </div>
          <div className='w-full'>
            <Heading title='판매자 위치' />
            <MapComponent
              showRange
              initCoordinate={currentListing.coordinate as [number, number]}
            />
          </div>
        </div>
      </div>
    );
  }
  if (step == 2) {
    bodyContent = emailSent ? (
      <div className='w-full'>
        <div className='flex flex-col items-center justify-center py-8 gap-4'>
          <div className='w-[85px] h-auto flex flex-col mb-4'>
            <div className='flex flex-row justify-center'>
              <div className='w-[9px] h-[9px] bg-[#EC662A] rounded-full'></div>
              <div className='w-[100%]'></div>
              <div className='w-[9px] h-[9px] bg-[#EC662A] rounded-full'></div>
            </div>
            <div className='w-[100%] h-[42px] border-b-2 border-l-2 border-r-2 border-[#EC662A] rounded-b-full mt-4'></div>
          </div>
          <div className='flex flex-col text-center gap-4'>
            <div>상품 문의가 발송되었습니다 !</div>
            <div>
              사고팔기 주의사항을
              <br />꼭 숙지하여 주시기 바랍니다
            </div>
            <div>8초후 리스팅 화면으로 돌아갑니다</div>
            <div>감사합니다 !</div>
          </div>
        </div>
      </div>
    ) : (
      <form
        ref={form}
        onSubmit={sendContactEmail}
        className='flex flex-col h-auto overflow-y-scroll overflow-x-hidden'
      >
        <label htmlFor='buyer_message' className='text-lg font-semibold'>
          문의 내용
        </label>
        <Textarea
          id={'buyer_message'}
          name={'buyer_message'}
          placeholer='판매자에게 궁금한 것을 물어보세요'
          onChange={() => {}}
          small
        />

        <input
          readOnly
          className='hidden'
          name={'listing_price'}
          value={`$ ${currentListing.price.toLocaleString()}`}
        />
        <input
          readOnly
          className='hidden'
          name={'user_name'}
          value={userName}
        />
        <input
          readOnly
          className='hidden'
          name={'user_email'}
          value={userEmail}
        />
        <input
          readOnly
          className='hidden'
          name={'listing_title'}
          value={currentListing.title}
        />
        <input
          readOnly
          className='hidden'
          name={'seller_email'}
          value={currentListing.contact[0]}
        />
        <input
          readOnly
          className='hidden'
          name={'listing_link'}
          value={window.location.href}
        />
        <button
          disabled={isLoading}
          type='submit'
          className='text-white bg-[#EC662A] mt-3 py-2 font-semibold rounded-lg hover:shadow-lg'
        >
          판매자에게 메시지 보내기
        </button>
      </form>
    );
  }

  const footerContent = (
    <div className='mt-0'>
      <div className='flex justify-evenly'>
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
      <div className='mt-2'>
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
    </div>
  );

  return (
    <Modal
      isOpen={buySellIndividualModal.isOpen}
      onClose={buySellIndividualModal.onClose}
      title={currentListing.title}
      body={bodyContent!}
      footer={footerContent}
      mypage={mypage}
      blogindividual
    />
  );
};
export default BuySellIndividualModal;
