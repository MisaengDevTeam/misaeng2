'use Client';

import { useRouter, useSearchParams } from 'next/navigation';
import useRoommateIndividualModal from '../hooks/useRoommateIndividualModal';
import Modal from './Modal';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RoommateListing } from '@prisma/client';
import Image from 'next/image';
import rmAvatarFinder from '@/app/lib/rmAvatarFinder';
import RoommateIndiSelf from './roommateindividual/RoommateIndiSelf';
import RoommateIndiRm from './roommateindividual/RoommateIndiRm';

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

  const bodyContent = (
    <div>
      <div className='flex justify-center w-full relatvie'>
        <Image
          className='w-[80%] h-auto rounded-t-lg border border-[#EC662A]'
          width={0}
          height={0}
          sizes='100%'
          src={rmAvatarFinder(selfgender, selfstatus)}
          alt='img'
        />
      </div>
      <RoommateIndiSelf
        title='저는요...?'
        selfgender={selfgender}
        selfstatus={selfstatus}
        selfage={selfage}
        selfmbti={selfmbti}
        selfpet={selfpet}
        selfsmoke={selfsmoke}
      />
      <RoommateIndiRm
        title='저는요...?'
        rmgender={rmgender}
        rmstatus={rmstatus}
        rmage={rmage}
        rmpet={rmpet}
        rmsmoke={rmsmoke}
      />
    </div>
  );

  const footerContent = <div>ROOMMATE FOOTER</div>;

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
