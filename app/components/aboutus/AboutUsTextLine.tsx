'use client';

interface AboutUsTextLineProps {
  text: string;
}

const AboutUsTextLine: React.FC<AboutUsTextLineProps> = ({ text }) => {
  return <p className='text-lg'>{text}</p>;
};
export default AboutUsTextLine;
