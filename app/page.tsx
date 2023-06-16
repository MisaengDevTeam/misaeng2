import { useCallback } from 'react';
import MainBannerImage from './components/main/MainBannerImage';
import MainCategoryMenu from './components/main/MainCategoryMenu';
import MainSectionContainer from './components/main/MainSectionContainer';
import { MAIN_SECTION } from '@/types/MainMenuTypes';
import MainBlogMenu from './components/main/MainBlogMenu';
import MainRentMenu from './components/main/MainRentMenu';
import MainRoommateMenu from './components/main/MainRoommateMenu';

export default function Home() {
  const ContentGenerator = useCallback((section: string): React.ReactNode => {
    if (section == 'CATEGORY') return <MainCategoryMenu />;
    if (section == 'BLOG') return <MainBlogMenu />;
    if (section == 'RENT') return <MainRentMenu />;
    if (section == 'ROOMMATE') return <MainRoommateMenu />;
  }, []);
  return (
    <div className='flex flex-col gap-10'>
      {/* <MainBannerImage /> */}
      {Object.entries(MAIN_SECTION).map(([key, value]) => {
        return (
          <MainSectionContainer
            key={key}
            title={value.subTitle}
            subtitle={value.desc}
          >
            {ContentGenerator(key)}
          </MainSectionContainer>
        );
      })}
    </div>
  );
}
