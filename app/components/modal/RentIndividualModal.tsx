'use client';

import { useSession } from 'next-auth/react';
import Modal from './Modal';
import useRentIndividualModal from '../hooks/useRentIndividualModal';
import { useEffect, useState } from 'react';
import Button from '../Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingScreen from '../LoadingScreen';
import { useRouter, useSearchParams } from 'next/navigation';
import { RentListing } from '@prisma/client';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

interface RentRegisterModalProps {
  title: string;
  individualListing: any;
}

const RentRegisterModal: React.FC<RentRegisterModalProps> = ({
  title,
  individualListing,
}) => {
  const [currentListing, setCurrentListing] = useState<RentListing | null>(
    null
  );
  const params = useSearchParams();
  const rentlistingid = params?.get('rentlisting');
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = session?.user;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    accessibility: true,
  };

  useEffect(() => {
    setIsLoading(true);
    if (rentlistingid) {
      axios
        .post(`/api/rentListing/rentListing`, {
          rentId: rentlistingid,
        })
        .then((res) => setCurrentListing(res.data.listingInfo[0]))
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
    <div
      className={` 
  ${isLoading ? 'h-[500px]' : 'h-auto'}
  `}
    >
      <div className='mt-4 mb-10'>
        <Slider {...sliderSettings}>
          {currentListing.imageSrc.map((image) => (
            <div className='w-full bg-neutral-300' key={image}>
              <Image src={image} width={360} height={240} alt='rent_image' />
            </div>
          ))}
        </Slider>
      </div>
      <hr />
      <div>$ {currentListing.price.toLocaleString()}</div>
    </div>
  );

  let footerContent = <></>;

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentIndividualModal.isOpen}
      onClose={rentIndividualModal.onClose}
      title={headerTitle}
      body={bodyContent}
      footer={footerContent}
      loadingScreen={
        <LoadingScreen
          messagetitle='요청하신 리스팅을 로딩 중입니다.'
          messagesubtitle='잠시만 기다려 주십시오.'
        />
      }
    />
  );
};
export default RentRegisterModal;
