'use client';
import { CATEGORY_OPTION } from '@/types/BlogTypes';
import Container from '../Container';
import Input from '../inputs/Input';
import {
  RegisterOptions,
  FieldValues,
  UseFormRegisterReturn,
} from 'react-hook-form';
import { IoSearchSharp } from 'react-icons/io5';
import { useRef } from 'react';

interface BlogSubNavProps {
  fetchBlogListing: (query: any) => void;
  setHideHotListing: (hide: boolean) => void;
}

const BlogSubNav: React.FC<BlogSubNavProps> = ({
  fetchBlogListing,
  setHideHotListing,
}) => {
  const keywordRef = useRef<HTMLInputElement>(null);

  return (
    <div className='flex flex-row py-4 shadow-sm'>
      <Container>
        <div className='flex flex-col md:flex-row justify-between gap-4'>
          <div className='grid grid-cols-4 md:grid-cols-8 gap-4'>
            {CATEGORY_OPTION.map((item) => (
              <div
                onClick={() => {
                  fetchBlogListing({
                    blogOption: { start: 0, number: 5, category: item.value },
                  });
                  setHideHotListing(true);
                }}
                className='flex justify-center items-center text-sm sm:text-[12px] lg:text-base py-1 px-2 cursor-pointer hover:bg-[#EC662A]/10 rounded-xl'
                key={item.value}
              >
                {item.value}
              </div>
            ))}
          </div>
          <div className='flex flex-row w-full md:w-[180px] lg:w-[240px] xl:w-[320px] h-[40px] p-1 border border-[#EC662A] rounded-full items-center'>
            <div className='w-full pl-2'>
              <input
                ref={keywordRef}
                maxLength={20}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    fetchBlogListing({
                      blogOption: {
                        start: 0,
                        number: 5,
                        title: keywordRef.current?.value,
                      },
                    });
                    setHideHotListing(true);
                  }
                }}
                className='w-full focus:outline-none focus:bg-neutral-100'
              />
            </div>
            <div
              onClick={() => {
                fetchBlogListing({
                  blogOption: {
                    start: 0,
                    number: 5,
                    title: keywordRef.current?.value,
                  },
                });
                setHideHotListing(true);
              }}
              className='w-auto h-full aspect-video bg-[#EC662A] rounded-full flex justify-center items-center cursor-pointer'
            >
              <IoSearchSharp color='#FFF' size={20} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default BlogSubNav;
