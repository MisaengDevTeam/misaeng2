import Image from 'next/image';

interface pageProps {}

const AboutUsPage = ({}) => {
  return (
    <div className='w-full justify-center'>
      <div className='flex items-center justify-center w-full max-h-[445px] overflow-hidden'>
        <Image
          width={0}
          height={0}
          sizes='100vw'
          className='w-full min-h-[240px] object-cover'
          src={'https://misaeng.s3.amazonaws.com/asset/img/about_us_banner.png'}
          alt={'banner'}
        />
      </div>
      <div>HELLO WORLD</div>
    </div>
  );
};
export default AboutUsPage;
