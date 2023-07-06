import Image from 'next/image';
import AboutUsContext from '../components/aboutus/AboutUsContext';
import { useMemo } from 'react';
import AboutUsTextLine from '../components/aboutus/AboutUsTextLine';

const AboutUsPage = ({}) => {
  const aboutBody = useMemo(() => {
    return (
      <div className='flex flex-col items-center'>
        <div className='flex flex-col items-center text-lg font-light gap-2'>
          <p>
            외국 생활을 준비하는{' '}
            <span className='text-[#EC662A] font-semibold'>한국인</span>
            들을 위한
          </p>
          <p>현지 부동산 전문 플랫폼입니다.</p>
          <p>
            저희 미생은 여러{' '}
            <span className='text-[#EC662A] font-semibold'>
              미국 회사 및 빌딩들과 협업
            </span>
            을 통해
          </p>
          <p>
            현지의{' '}
            <span className='text-[#EC662A] font-semibold'>더욱 전문적</span>
            이고{' '}
            <span className='text-[#EC662A] font-semibold'>다양한 서비스</span>
            를 제공하기 위해 최선을 다하고 있습니다.
          </p>
        </div>
      </div>
    );
  }, []);
  const storyBody = useMemo(() => {
    return (
      <div className='flex flex-col items-center'>
        <div>aboutus</div>
      </div>
    );
  }, []);
  const valueBody = useMemo(() => {
    return (
      <div className='flex flex-col items-center'>
        <div>aboutus</div>
      </div>
    );
  }, []);
  const businessBody = useMemo(() => {
    return (
      <div className='flex flex-col items-center'>
        <div>aboutus</div>
      </div>
    );
  }, []);
  const specialtyBody = useMemo(() => {
    return (
      <div className='flex flex-col items-center'>
        <div>aboutus</div>
      </div>
    );
  }, []);

  return (
    <div>
      <div className='relative w-full justify-center'>
        <div className='flex items-center justify-center w-full max-h-[445px] overflow-hidden'>
          <Image
            width={0}
            height={0}
            sizes='100vw'
            className='w-full min-h-[240px] object-cover'
            src={
              'https://misaeng.s3.amazonaws.com/asset/img/about_us_banner.png'
            }
            alt={'banner'}
          />
        </div>
        <div className='flex justify-center items-center absolute w-full h-full bg-black/40 top-0 left-0 text-white text-xl'>
          해외 한국인을 위한 최고의 현지 전문 서비스
        </div>
      </div>
      <div className='flex flex-col justify-center items-center py-10 gap-10'>
        <AboutUsContext title='Misaeng USA' body={aboutBody} />
        <AboutUsContext title='Misaeng Story' body={storyBody} />
        <AboutUsContext title='Misaeng Value' body={valueBody} />
        <AboutUsContext title='Misaeng Business' body={businessBody} />
        <AboutUsContext title='Misaeng Specialty' body={specialtyBody} />
      </div>
    </div>
  );
};
export default AboutUsPage;
