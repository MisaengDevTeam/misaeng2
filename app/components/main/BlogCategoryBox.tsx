'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useRef } from 'react';
import QueryString from 'query-string';

interface BlogCategoryBoxProps {
  label: string;
  selected?: boolean;
  category: string;
  selectCat: (value: string) => void;
}

const BlogCategoryBox: React.FC<BlogCategoryBoxProps> = ({
  label,
  selected,
  category,
  selectCat,
}) => {
  return (
    <div
      onClick={() => selectCat(category)}
      className={`border-[1px] border-[#EC662A] rounded-lg py-2 px-4 cursor-pointer transition
  ${selected ? `bg-[#EC662A]` : `white`}
  ${selected ? `text-white` : `text-[#EC662A]`}
  `}
    >
      <div className='font-medium text-sm'>{label}</div>
    </div>
  );
};
export default BlogCategoryBox;
