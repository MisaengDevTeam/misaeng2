'use Client';

import { useRouter, useSearchParams } from 'next/navigation';
import useRoommateIndividualModal from '../hooks/useRoommateIndividualModal';
import Modal from './Modal';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { RoommateListing } from '@prisma/client';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import rmAvatarFinder from '@/app/lib/rmAvatarFinder';
import RoommateContext from './roommateindividual/RoommateContext';
import RoommateIndiAttr from './roommateindividual/RoommateIndiAttr';
import RentIndiFooterButton from './rentindividual/RentIndiFooterButton';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { FaRegShareSquare } from 'react-icons/fa';
import { RiAlarmWarningLine } from 'react-icons/ri';
import Button from '../Button';
import toast from 'react-hot-toast';
import useReportModal from '../hooks/useReportModal';
import Textarea from '../inputs/Textarea';

interface RoommateIndividualModalProps {
  mypage?: boolean;
}

const RoommateIndividualModal: React.FC<RoommateIndividualModalProps> = ({
  mypage,
}) => {
  const form = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState<number>(1);
  const [currentListing, setCurrentListing] = useState<RoommateListing | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const params = useSearchParams();
  const roommateid = params?.get('roommatelisting');
  const router = useRouter();
  const { data: session } = useSession();
  const currentUser = session?.user;
  const userName = currentUser?.name;
  const userEmail = currentUser?.email;

  const [like, setLike] = useState(false);
  const roommateIndividualModal = useRoommateIndividualModal();
  const reportModal = useReportModal();

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

  const sendContactEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setEmailSent(true);

    if (form.current !== null) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_BUYSELL_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_ROOMMATE_TEMPLATE_ID!,
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

  const reportListing = () => {
    roommateIndividualModal.onClose();
    reportModal.onOpen();
  };

  if (!currentListing) return null;

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
  const detailArray = [`$ ${price.toLocaleString()}`, movedate];

  let bodyContent: JSX.Element | null;

  if (step == 1) {
    bodyContent = (
      <div className='flex flex-col gap-4 h-[60vh] overflow-y-scroll p-2 items-center'>
        <div className='flex justify-center w-full max-w-[400px] relative'>
          <Image
            className='w-[80%] h-auto rounded-lg border border-[#EC662A]'
            width={0}
            height={0}
            sizes='100%'
            src={rmAvatarFinder(selfgender, selfstatus)}
            alt='img'
          />
        </div>
        <div className='w-full flex flex-col gap-4 md:gap-8'>
          <RoommateContext title='간단한 자기소개' description={description} />
          <RoommateIndiAttr
            title='희망 위치'
            arr={[city, district]}
            findLocation
          />
          <RoommateIndiAttr title='저는요?' arr={selfArray} />
          <RoommateIndiAttr title='제가 찾는 룸메는요?' arr={rmArray} />
          <RoommateIndiAttr title='예산 / 입주희망일' arr={detailArray} />
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
            <div>룸메이트 문의가 발송되었습니다 !</div>
            <div>
              룸메이트 주의사항을
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
          placeholer='상대방에게 자신을 소개하세요'
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
          className='text-white bg-[#EC662A] mt-3 py-2 font-light rounded-lg hover:shadow-lg'
        >
          현재 리스팅 판매자 연락하기
        </button>
      </form>
    );
  }

  const footerContent = (
    <div className='mt-6 sm:mt-0'>
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
        {
          step == 1 && (
            <Button
              onClick={() => {
                setStep(2);
              }}
              label={'판매자 연락하기'}
            />
          )
          //  : (
          //   <Button
          //     label={'뒤로가기'}
          //     onClick={() => {
          //       setStep(1);
          //     }}
          //   ></Button>
          // )
        }
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={roommateIndividualModal.isOpen}
      onClose={roommateIndividualModal.onClose}
      title={'.'}
      body={bodyContent!}
      footer={footerContent}
      mypage={mypage}
      separator
    />
  );
};
export default RoommateIndividualModal;
