'use client';

import Image from 'next/image';

interface BlogListingCardProps {
  category: string;
  title: string;
  description: string;
  imageSrc: string;
}

const BlogListingCard: React.FC<BlogListingCardProps> = ({
  category,
  title,
  description,
  imageSrc,
}) => {
  return (
    <div className='relative flex flex-col w-[40vw] h-[60vw] sm:w-[30vw] sm:h-[50vw] md:w-[20vw] md:h-[60vw] md:max-w-[280px] md:max-h-[340px] cursor-pointer transition rounded-xl group'>
      <div className='relative w-[40vw] h-[40vw] sm:w-[30vw] sm:h-[30vw] md:w-[20vw] md:h-[24vw] md:max-w-[280px] md:max-h-[320px] overflow-hidden rounded-xl '>
        <Image
          src={imageSrc}
          fill
          sizes='200'
          alt='img'
          className='object-cover h-full w-full group-hover:scale-105 transition'
        />
      </div>
      <div className='text-ellipsis px-2 pt-4 w-full h-[40%] overflow-hidden'>
        <div className='text-xl font-bold'>{`${category} ${title}`}</div>
        <div className='hidden sm:block'>{description}</div>
      </div>
    </div>
  );
};
export default BlogListingCard;
