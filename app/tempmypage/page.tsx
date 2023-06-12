'use client';

import { useSession } from 'next-auth/react';
import Container from '../components/Container';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Avatar from '../components/Avatar';
import MyPageInput from '../components/inputs/mypage/MyPageInput';
import { useEffect, useState } from 'react';

interface pageProps {}

const MyPage: React.FC<pageProps> = ({}) => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const { data: session } = useSession();
  const currentUser = session?.user;

  const router = useRouter();

  useEffect(() => {
    setEmail(currentUser?.email);
  }, [currentUser?.email]);

  return (
    <div className='w-full h-auto'>
      <Container>
        <div className='flex justify-center w-full gap-8 py-4 border-b border-neutral-500'>
          <div>개인 정보 관리</div>
          <div>렌트 목록 관리</div>
          <div>룸메 목록 관리</div>
          <div>사고팔기 목록 관리</div>
        </div>
        <div className='flex flex-col sm:flex-row justify-center w-full gap-4 py-4 sm:py-8'>
          <div className='flex flex-col justify-center items-center w-full sm:w-[340px] border-2 border-neutral-100 shadow-lg rounded-xl p-4 gap-6'>
            <div className='flex flex-col justify-center items-center w-full mt-4'>
              <Avatar imgsrc={currentUser?.image} mypage />
            </div>
            <div className='bg-orange-500 w-[50%] sm:w-[75%] text-center py-2 rounded-lg text-lg sm:text-base text-[#fff] font-semibold cursor-pointer hover:opacity-80'>
              사진 변경
            </div>
            <div className='flex flex-col gap-2 px-4'>
              <div
                className={`${
                  currentUser?.emailVerified
                    ? 'text-[#EC662A]'
                    : 'text-neutral-600'
                }`}
              >
                {currentUser?.emailVerified
                  ? '* 이메일 본인인증 완료'
                  : '* 이메일 본인인증 필요'}
              </div>
              <div className='text-neutral-500 font-light'>
                ** 비밀번호는 타인에게 노출 되지 않도록 주의해주세요! 일정기간
                사용시 변경하시면, 타인의 불건전한 사용을 미리 방지실 수
                있습니다.
              </div>
              <div className='text-neutral-500 font-light'>
                ** 회원님의 이미지는 본인은 나타낼 수 있는 가장 큰 요소입니다.
                타인에게 불쾌감을 줄 수 있는 사진은 저희 미생팀에서 삭제할 수
                있습니다.
              </div>
            </div>
          </div>
          <div className='flex flex-col sm:flex-row w-full max-w-[860px] border-2 border-neutral-100 shadow-lg rounded-xl p-4 sm:p-8 gap-4 sm:gap-8'>
            <div className='flex flex-col gap-6 w-full'>
              <MyPageInput label='이름' length={20} onChange={() => {}} />
              <MyPageInput
                label='이메일'
                value={currentUser?.email || ''}
                onChange={() => {}}
                disabled={currentUser?.email ? true : false}
              />
              <MyPageInput
                label='연락처'
                type='number'
                placeholder='전화번호'
                length={10}
                onChange={() => {}}
              />
              <MyPageInput label='닉네임' length={20} onChange={() => {}} />
              <MyPageInput
                label='카톡 아이디'
                length={32}
                onChange={() => {}}
              />
            </div>
            <div className='w-full bg-green-300'>f</div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default MyPage;
