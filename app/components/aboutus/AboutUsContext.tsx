'use client';

interface AboutUsContextProps {
  title: React.ReactElement | string;
  body: React.ReactElement | string;
}

const AboutUsContext: React.FC<AboutUsContextProps> = ({ title, body }) => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 w-full sm:w-[80vw] max-w-[1440px]'>
      <div className='w-[85px] h-auto flex flex-col'>
        <div className='flex flex-row justify-center'>
          <div className='w-[9px] h-[9px] bg-[#EC662A] rounded-full'></div>
          <div className='w-[100%]'></div>
          <div className='w-[9px] h-[9px] bg-[#EC662A] rounded-full'></div>
        </div>
        <div className='w-[100%] h-[42px] border-b-2 border-l-2 border-r-2 border-[#EC662A] rounded-b-full mt-4'></div>
      </div>
      <div className='text-4xl font-bold text-[#EC662A]'>{title}</div>
      <div>{body}</div>
    </div>
  );
};
export default AboutUsContext;
