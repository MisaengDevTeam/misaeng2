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
    <div className='relative flex flex-col w-[90vw] h-[70px] md:w-[20vw] md:h-[24vw] md:max-w-[280px] md:max-h-[320px] cursor-pointer transition rounded-xl group'>
      <div className='w-full h-[60%] relative overflow-hidden rounded-xl '>
        <Image
          src={imageSrc}
          fill
          alt='img'
          className='object-cover h-full w-full group-hover:scale-105 transition'
        />
      </div>
      <div className='text-ellipsis px-2 pt-4 w-full h-[40%]'>
        <div className='text-xl font-bold'>{`${category} ${title}`}</div>
        <div className=''>{description}</div>
      </div>
    </div>
  );
};
export default BlogListingCard;
