import Image from 'next/image';
import EmptyState from '../components/EmptyState';

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <div>
      <div className='flex p-8'>
        <div className='flex w-full shadow-xl rounded-l-full rounded-r-full border-2 border-neutral-200'>
          <div className='flex items-center justify-end w-full h-[540px] bg-white rounded-l-full'>
            <div>
              <div>
                <Image
                  width={240}
                  height={360}
                  src={'/assets/images/img/qr_cs.png'}
                  alt={'qr'}
                />
              </div>
            </div>
            <div className='flex justify-center items-center w-[280px] h-[280px] bg-white rounded-full translate-x-1/2 border-4 border-[#EC662A] shadow-xl'>
              <Image
                width={200}
                height={140}
                src={'/assets/images/logo/logo_vertical.png'}
                alt={'lg'}
              />
            </div>
          </div>
          <Image
            className='rounded-r-full overflow-hidden'
            width={720}
            height={540}
            src={'https://misaeng.s3.amazonaws.com/asset/img/cs_bn.png'}
            alt={'banner'}
          />
        </div>
      </div>
    </div>
  );
};
export default page;
