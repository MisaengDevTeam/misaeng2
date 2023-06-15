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

interface BlogSubNavProps {}

const BlogSubNav: React.FC<BlogSubNavProps> = ({}) => {
  return (
    <div className='flex flex-row py-4 shadow-sm'>
      <Container>
        <div className='flex flex-col md:flex-row justify-between gap-4'>
          <div className='grid grid-cols-4 md:grid-cols-8 gap-4'>
            {CATEGORY_OPTION.map((item) => (
              <div
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
                maxLength={20}
                className='w-full focus:outline-none focus:bg-neutral-100'
              />
            </div>
            <div className='w-auto h-full aspect-video bg-[#EC662A] rounded-full flex justify-center items-center'>
              <IoSearchSharp color='#FFF' size={20} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default BlogSubNav;
