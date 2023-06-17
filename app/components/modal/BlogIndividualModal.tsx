'use client';

import { useSearchParams } from 'next/navigation';
import useBlogIndividualModal from '../hooks/useBlogIndividualModal';
import Modal from './Modal';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BlogListing } from '@prisma/client';
import ReactQuill from 'react-quill';
import dateFormatter from '@/app/lib/dateFormatter';
import Image from 'next/image';

interface BlogIndividualModalProps {}

const BlogIndividualModal: React.FC<BlogIndividualModalProps> = ({}) => {
  const [currentListing, setCurrentListing] = useState<BlogListing | null>(
    null
  );

  const blogIndividualModal = useBlogIndividualModal();
  const params = useSearchParams();
  const blogid = params?.get('bloglisting');

  const { data: session } = useSession();
  const currentUser = session?.user;

  const [like, setLike] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (blogid) {
      axios
        .post(`/api/blogListing/blogListing`, {
          blogId: blogid,
          start: 0,
          number: 1,
        })
        .then((res) => {
          setCurrentListing(res.data.blogListing[0]);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [blogid]);

  if (!currentListing) return null;

  // console.log(currentListing);
  const bodyContent = (
    <div className='flex flex-col gap-4 h-[55vh] overflow-y-scroll p-2'>
      {/* <div className='flex justify-center w-full relative'></div> */}

      <p className='font-semibold text-lg'>{currentListing.title}</p>
      <div className='flex flex-row justify-between'>
        <div className='flex gap-1'>
          <Image
            className='border border-[#EC662A] rounded-full'
            width={20}
            height={20}
            src={currentListing.authorPic}
            alt={'g'}
          />
          <p className='text-[14px] text-neutral-600'>
            {currentListing.author}
          </p>
        </div>

        <p>{dateFormatter(new Date(currentListing.createdAt))}</p>
      </div>
      <ReactQuill
        className='w-full h-full'
        value={currentListing.content}
        readOnly
        modules={{ toolbar: false }}
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-1 p-2'>
      <div>같은 카테고리 최신 리스팅</div>
    </div>
  );

  return (
    <Modal
      isOpen={blogIndividualModal.isOpen}
      onClose={blogIndividualModal.onClose}
      title={' .'}
      body={bodyContent}
      footer={footerContent}
      // mypage
    />
  );
};
export default BlogIndividualModal;
