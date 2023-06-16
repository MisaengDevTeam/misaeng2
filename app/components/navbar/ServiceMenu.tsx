'use client';

import { useRouter } from 'next/navigation';
import ServiceMenuItem from './ServiceMenuItem';

interface ServiceMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ServiceMenu: React.FC<ServiceMenuProps> = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  return (
    <div className='xl:absolute xl:left-[50%] xl:transform xl:-translate-x-[50%] hidden md:flex flex-row gap-1 lg:gap-3 '>
      <ServiceMenuItem
        label='找房子'
        onClick={() => {
          setIsOpen(false);
          router.push('/rent');
        }}
      />
      <ServiceMenuItem
        label='找室友'
        onClick={() => {
          setIsOpen(false);
          router.push('/roommate');
        }}
      />
      <ServiceMenuItem
        label='买卖平台'
        onClick={() => {
          setIsOpen(false);
          router.push('/buysell');
        }}
      />
      <ServiceMenuItem
        label='生活小助手'
        onClick={() => {
          setIsOpen(false);
          router.push('/blog');
        }}
      />
      {/* <ServiceMenuItem
        label='렌트찾기'
        onClick={() => {
          setIsOpen(false);
          router.push('/rent');
        }}
      />
      <ServiceMenuItem
        label='룸메찾기'
        onClick={() => {
          setIsOpen(false);
          router.push('/roommate');
        }}
      />
      <ServiceMenuItem
        label='사고팔기'
        onClick={() => {
          setIsOpen(false);
          router.push('/buysell');
        }}
      />
      <ServiceMenuItem
        label='미국꿀팁'
        onClick={() => {
          setIsOpen(false);
          router.push('/blog');
        }}
      /> */}
    </div>
  );
};
export default ServiceMenu;
