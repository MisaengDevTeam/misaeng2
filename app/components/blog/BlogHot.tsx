'use client';

import Heading from '../Heading';
import BlogHotCard from './BlogHotCard';

interface BlogHotProps {
  hotListing: any;
}

const BlogHot: React.FC<BlogHotProps> = ({ hotListing }) => {
  if (!hotListing) return null;
  return (
    <div className='w-full'>
      <div className='text-2xl font-semibold mb-2'>
        이번 달 핫 토픽
        {/* 火热主题 */}
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {hotListing.map((listing: any) => (
          <BlogHotCard
            key={(listing as any)._id}
            title={listing.title}
            imgsrc={listing.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};
export default BlogHot;
