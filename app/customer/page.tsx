'use client';

import Image from 'next/image';
import EmptyState from '../components/EmptyState';
import { MdEmail, MdPhone, MdTextsms } from 'react-icons/md';
import { RiAlarmWarningLine, RiKakaoTalkFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

interface pageProps {}

const CustomerServicePage: React.FC<pageProps> = ({}) => {
  const router = useRouter();
  return (
    <div>
      <div className='flex p-8 2xl:py-[120px] justify-center'>
        <div className='flex w-full max-w-[1860px] shadow-xl rounded-lg lg:rounded-l-full lg:rounded-r-full border-2 border-neutral-200'>
          <div className='relative flex items-center justify-center lg:justify-end w-full lg:w-3/4 lg:h-[540px] bg-white rounded-l-full'>
            <div className='flex flex-col items-center justify-center lg:justify-end w-full sm:flex-row gap-8 lg:pr-[10vw] p-8'>
              <div className='flex-col flex lg:hidden xl:flex items-center justify-center text-lg 2xl:text-2xl'>
                <div className='w-[85px] h-auto flex flex-col mb-8'>
                  <div className='flex flex-row justify-center'>
                    <div className='w-[9px] h-[9px] bg-[#EC662A] rounded-full'></div>
                    <div className='w-[100%]'></div>
                    <div className='w-[9px] h-[9px] bg-[#EC662A] rounded-full'></div>
                  </div>
                  <div className='w-[100%] h-[42px] border-b-2 border-l-2 border-r-2 border-[#EC662A] rounded-b-full mt-4'></div>
                </div>
                <p>
                  <span className='text-[#EC662A] font-bold'>미국 생활</span>에
                  대해서
                </p>
                <p>뭐든지 물어보세요</p>
                <p>
                  <span className='text-[#EC662A] font-bold'>미생</span>은
                  언제나 여러분들의
                </p>
                <p>성공적인 미국 생활을 응원합니다!</p>
              </div>
              <Image
                width={240}
                height={360}
                src={'/assets/images/img/qr_cs.png'}
                alt={'qr'}
              />
              <div className='flex flex-col'>
                <div className='w-full h-full flex flex-col items-center justify-center gap-4 py-2'>
                  <div className='flex w-[320px] sm:w-[200px] h-[60px] items-center justify-center w-full bg-[#EC662A] text-[#FFF] py-2 rounded-full gap-2'>
                    문의: +1 914 294 8785
                  </div>
                  <a
                    href='tel:9142948785'
                    className='flex w-[320px] sm:w-[200px] h-[60px] items-center justify-center w-full bg-green-400 text-[#FFF] py-2 rounded-full gap-2'
                  >
                    <MdPhone size={20} />
                    <p>클릭해서 전화 하기</p>
                  </a>
                  <a
                    href={`sms:9142948785&body=문의하기`}
                    className='flex w-[320px] sm:w-[200px] h-[60px] items-center justify-center w-full bg-blue-400 text-[#FFF] py-2 rounded-full gap-2'
                  >
                    <MdTextsms size={20} />
                    클릭해서 문자 보내기
                  </a>
                  <button
                    onClick={() => {
                      router.push('https://open.kakao.com/o/sQbwnisf');
                    }}
                    className='flex w-[320px] sm:w-[200px] h-[60px] items-center justify-center w-full bg-[#FFD800] py-2 rounded-full gap-2'
                  >
                    <RiKakaoTalkFill size={24} />
                    <span>클릭해서 카톡 보내기</span>
                  </button>
                </div>
              </div>
            </div>
            <div className='absolute hidden lg:flex justify-center items-center lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] 2xl:w-[280px] 2xl:h-[280px] bg-white rounded-full translate-x-1/2 border-4 border-[#EC662A] shadow-xl'>
              <Image
                width={160}
                height={120}
                src={'/assets/images/logo/logo_vertical.png'}
                className='lg:w-[120px] lg:h-[90px] xl:w-[160px] xl:h-[120px] 2xl:w-[200px] 2xl:h-[150px]'
                alt={'lg'}
              />
            </div>
          </div>

          <div className='hidden lg:block lg:w-1/4 h-full'>
            <Image
              className='rounded-r-full overflow-hidden'
              width={720}
              height={540}
              style={{ width: '100%', height: '100%' }}
              src={'https://misaeng.s3.amazonaws.com/asset/img/cs_bn.png'}
              alt={'banner'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerServicePage;
