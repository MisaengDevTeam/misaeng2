'use client';

import { BLOG_CATEGORY, BLOG_MOCK_POSTING } from '@/types/BlogTypes';
import BlogCategoryBox from './BlogCategoryBox';
import { useState } from 'react';
import BlogListingCard from './BlogListingCard';

interface MainBlogMenuProps {}

const MainBlogMenu: React.FC<MainBlogMenuProps> = ({}) => {
  const [selectedCategory, setSelectedCategory] = useState('sale');

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col items-center gap-6'>
        <div className='grid grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4'>
          {Object.entries(BLOG_CATEGORY).map(([key, value]) => (
            <BlogCategoryBox
              category={key}
              label={value}
              key={key}
              selectCat={setSelectedCategory}
              selected={selectedCategory == key}
            />
          ))}
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {BLOG_MOCK_POSTING.map((description) => (
            <BlogListingCard
              key={BLOG_MOCK_POSTING.indexOf(description)}
              category={selectedCategory}
              title={'블로그 포스팅 제목'}
              description={description}
              imageSrc={'https://picsum.photos/200/300'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MainBlogMenu;
