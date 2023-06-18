'use client';

import dynamic from 'next/dynamic';

interface BlogTextBoxProps {
  content: string;
}

const BlogTextBox: React.FC<BlogTextBoxProps> = ({ content }) => {
  const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
  return (
    <ReactQuill
      className='w-full h-full'
      value={content}
      readOnly
      modules={{ toolbar: false }}
    />
  );
};
export default BlogTextBox;
