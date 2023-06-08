'use client';

import { CATEGORY_MENU } from '@/types/MainMenuTypes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface MainCategoryMenuProps {}

const MainCategoryMenu: React.FC<MainCategoryMenuProps> = ({}) => {
  const router = useRouter();
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4'>
      {Object.entries(CATEGORY_MENU).map(([key, value]) => (
        <div
          key={key}
          onClick={() => router.push(`/${key}`)}
          className={`relative flex justify-center items-center w-[40vw] h-[40vw] sm:w-[30vw] sm:h-[30vw] md:w-[20vw] md:h-[20vw] md:max-w-[280px] md:max-h-[280px] cursor-pointer transition z-5 rounded-2xl hover:bg-[#EC662A]/20 md:hover:bg-transparent`}
        >
          <div className='peer text-white text-xl lg:text-2xl absolute z-10 w-[90%] h-[90%] md:hover:border-2 hover:border-[#EC662A] rounded-xl flex justify-center items-center'>
            {value}
          </div>
          <Image
            fill
            sizes='200'
            src={`/assets/images/img/main_category_${key}.png`}
            alt='cat'
            className='absolute top-0 left-0 rounded-xl brightness-50 md:brightness-100 peer-hover:brightness-50'
          />
        </div>
      ))}
    </div>
  );
};
export default MainCategoryMenu;
