'use client';

import Image from 'next/image';
import Container from '../Container';
import BlogHot from './BlogHot';
import BlogSubMenu from './BlogSubMenu';
import BlogPageListingCard from './BlogPageListingCard';
import { TEST_BLOG_PAGE_LISTING } from '@/types/BlogTypes';

interface BlogBodyProps {}

const BlogBody: React.FC<BlogBodyProps> = ({}) => {
  return (
    <div>
      <Container>
        <div className='flex w-full justify-center items-center '>
          <div className='flex flex-col justify-center items-center py-4 w-full max-w-[1280px] gap-8'>
            <BlogHot />
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex flex-col w-full sm:w-3/4 lg:w-4/5'>
                {TEST_BLOG_PAGE_LISTING.map((listing) => (
                  <BlogPageListingCard
                    key={TEST_BLOG_PAGE_LISTING.indexOf(listing)}
                    category={listing.category}
                    imgsrc={listing.imgsrc}
                    title={listing.title}
                    description={listing.description}
                  />
                ))}
              </div>
              <div className='w-full sm:w-1/4 lg:w-1/5'>
                <BlogSubMenu />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default BlogBody;
