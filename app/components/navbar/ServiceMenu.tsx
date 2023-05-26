'use client';

import ServiceMenuItem from './ServiceMenuItem';

interface ServiceMenuProps {}

const ServiceMenu: React.FC<ServiceMenuProps> = ({}) => {
  return (
    <div className='xl:absolute xl:left-[50%] xl:transform xl:-translate-x-[60%] hidden md:flex flex-row gap-3 '>
      <ServiceMenuItem label='렌트찾기' onClick={() => {}} />
      <ServiceMenuItem label='룸메찾기' onClick={() => {}} />
    </div>
  );
};
export default ServiceMenu;
