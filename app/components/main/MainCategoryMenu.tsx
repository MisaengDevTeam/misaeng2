'use client';

import { CATEGORY_MENU } from '@/types/MainMenuTypes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface MainCategoryMenuProps {}

const MainCategoryMenu: React.FC<MainCategoryMenuProps> = ({}) => {
  const router = useRouter();
  return (
    <div className='flex flex-col md:flex-row gap-2 md:gap-4'>
      {Object.entries(CATEGORY_MENU).map(([key, value]) => (
        <div
          key={key}
          onClick={() => router.push(`/${key}`)}
          className={`relative flex justify-center items-center w-[90vw] h-[70px] md:w-[20vw] md:h-[20vw] md:max-w-[280px] md:max-h-[280px] cursor-pointer transition z-5 border-2 md:border-0 border-[#EC662A] rounded-2xl hover:bg-[#EC662A]/20 md:hover:bg-transparent
          
          `}
        >
          {/* bg-[url('/assets/images/img/main_category_${key}.png')]
          bg-contain
          bg-no-repeat */}
          {/* ${`bg-[url("/images/img/main_category_${key}.png")]`}
          ${`bg-[url("/images/img/main_category_${key}.png")]`} */}

          <div className='peer text-black md:text-white text-xl lg:text-2xl absolute z-10 w-[90%] h-[90%] md:hover:border-2 hover:border-[#EC662A] rounded-xl flex justify-center items-center'>
            {value}
          </div>
          <Image
            fill
            src={`/assets/images/img/main_category_${key}.png`}
            alt='cat'
            className='hidden md:block absolute top-0 left-0 rounded-xl brightness-100 peer-hover:brightness-50'
          />
        </div>
      ))}
    </div>
  );
};
export default MainCategoryMenu;
