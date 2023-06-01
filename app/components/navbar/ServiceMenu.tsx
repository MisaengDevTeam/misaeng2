'use client';

import { useRouter } from 'next/navigation';
import ServiceMenuItem from './ServiceMenuItem';

interface ServiceMenuProps {}

const ServiceMenu: React.FC<ServiceMenuProps> = ({}) => {
  const router = useRouter();
  return (
    <div className='xl:absolute xl:left-[50%] xl:transform xl:-translate-x-[50%] hidden md:flex flex-row gap-1 md:gap-3 '>
      <ServiceMenuItem label='렌트찾기' onClick={() => router.push('/rent')} />
      <ServiceMenuItem
        label='룸메찾기'
        onClick={() => router.push('/roommate')}
      />
      <ServiceMenuItem
        label='사고팔기'
        onClick={() => router.push('/buysell')}
      />
      <ServiceMenuItem label='미국꿀팁' onClick={() => router.push('/blog')} />
    </div>
  );
};
export default ServiceMenu;
