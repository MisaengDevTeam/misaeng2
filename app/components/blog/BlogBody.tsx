'use client';

import Image from 'next/image';
import Container from '../Container';
import BlogHot from './BlogHot';
import BlogSubMenu from './BlogSubMenu';
import BlogPageListingCard from './BlogPageListingCard';
import { TEST_BLOG_PAGE_LISTING } from '@/types/BlogTypes';
import { useEffect } from 'react';
import { IFecthBlogQuery } from '@/app/blog/page';
import { BlogListing } from '@prisma/client';
import extractText from '@/app/lib/contentExtractor';
import LoadingScreen from '../LoadingScreen';

interface BlogBodyProps {
  listings: any;
  setListings: any;
  isLoading: boolean;
  fetchBlogListing: (query: IFecthBlogQuery) => void;
  BlogIndividualOpen: () => void;
  hideHotListing: boolean;
  setHideHotListing: (hide: boolean) => void;
}

const BlogBody: React.FC<BlogBodyProps> = ({
  listings,
  fetchBlogListing,
  isLoading,
  BlogIndividualOpen,
  hideHotListing,
  setHideHotListing,
}) => {
  if (!listings) return <LoadingScreen />;
  return (
    <div>
      <Container>
        <div className='flex w-full justify-center items-center '>
          <div className='flex flex-col justify-center items-center py-4 w-full max-w-[1280px] gap-8'>
            {!hideHotListing ? (
              <BlogHot
                hotListing={listings.hotListing}
                BlogIndividualOpen={BlogIndividualOpen}
              />
            ) : (
              <div
                onClick={() => {
                  setHideHotListing(false);
                }}
                className='bg-neutral-100 w-full text-center cursor-pointer font-semibold rounded-full'
              >
                이번달 핫 토픽 열기
              </div>
            )}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex flex-col w-full sm:w-3/4 lg:w-4/5'>
                {isLoading && (
                  <div className='relative w-[100%] h-[100vh] bg-white'>
                    <LoadingScreen />
                  </div>
                )}
                {listings &&
                  listings.blogListing.map((listing: BlogListing) => (
                    <BlogPageListingCard
                      key={(listing as any)._id}
                      id={(listing as any)._id}
                      category={listing.category}
                      author={listing.author}
                      authorImg={listing.authorPic}
                      imgsrc={listing.thumbnail}
                      title={listing.title}
                      description={extractText(listing.content)}
                      createdAt={listing.createdAt}
                      BlogIndividualOpen={BlogIndividualOpen}
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
