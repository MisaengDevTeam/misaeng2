'use client';

import Heading from '../Heading';
import BlogHotCard from './BlogHotCard';

interface BlogHotProps {}

const BlogHot: React.FC<BlogHotProps> = ({}) => {
  return (
    <div className='w-full'>
      <div className='text-2xl font-semibold mb-2'>이번 주 핫 토픽</div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <BlogHotCard
          title={'뉴욕 야경 200% 즐기기'}
          imgsrc={'/assets/images/test/test_one.png'}
        />
        <BlogHotCard
          title={'뉴욕 근처 단풍 즐기기'}
          imgsrc={'/assets/images/test/test_two.png'}
        />
        <BlogHotCard
          title={'가성비 극강 알뜰 쇼핑'}
          imgsrc={'/assets/images/test/test_three.png'}
        />
        <BlogHotCard
          title={'일상 던진 Life 즐기기'}
          imgsrc={'/assets/images/test/test_four.png'}
        />
      </div>
    </div>
  );
};
export default BlogHot;
