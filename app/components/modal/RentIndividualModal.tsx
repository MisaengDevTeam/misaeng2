'use client';

import { useSession } from 'next-auth/react';
import Modal from './Modal';
import useRentIndividualModal from '../hooks/useRentIndividualModal';
import { useCallback, useEffect, useState } from 'react';
import Button from '../Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingScreen from '../LoadingScreen';
import { useRouter, useSearchParams } from 'next/navigation';
import { RentListing } from '@prisma/client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import RentIndiPicture from './rentindividual/RentIndiPicture';
import RentIndiBasic from './rentindividual/RentIndiBasic';
import RentIndiDescription from './rentindividual/RentIndiDescription';
import RentIndiAmenity from './rentindividual/RentIndiAmenity';

import { AMENITY, FEATURE } from '@/types/RentTypes';
import dateFormatter from '@/app/lib/dateFormatter';

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

  console.log(currentListing);
  const headerTitle = `${currentListing.title}`;

  const bodyContent = (
    <div className={`h-[70vh] overflow-x-hidden overflow-y-scroll`}>
      <div className='text-end text-xs text-neutral-700'>
        작성일: {dateFormatter(new Date(currentListing.createdAt))}
      </div>
      <RentIndiPicture pictures={currentListing.imageSrc} />
      <hr />
      <div className='flex flex-col gap-4 p-4'>
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
          title={'건물 편의시설'}
          items={currentListing.amenity}
          type={AMENITY}
        />
        <RentIndiAmenity
          title={'방 편의시설'}
          items={currentListing.feature}
          type={FEATURE}
        />
      </div>
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
      cardindividual
    />
  );
};
export default RentRegisterModal;
