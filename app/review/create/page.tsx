'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const ReviewCreatePage = ({}) => {
  const { data: session } = useSession();
  const currentUser = session?.user;

  useEffect(() => {
    const checkReview = async () => {
      console.log('check!');
    };
    checkReview();
  }, []);

  if (!currentUser)
    return (
      <div className='flex flex-col justify-center items-center w-full h-[50vh]'>
        리뷰작성을 위해 로그인하여 주시기 바랍니다.
      </div>
    );

  return (
    <div className='flex flex-col justify-center items-center w-full h-[50vh]'>
      hihihi
    </div>
  );
};
export default ReviewCreatePage;
