'use client';

interface MainSectionContainerProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const MainSectionContainer: React.FC<MainSectionContainerProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className='w-full flex flex-col justify-center items-center py-12 gap-6'>
      <div className='w-[85px] h-auto flex flex-col'>
        <div className='flex flex-row justify-center'>
          <div className='w-[9px] h-[9px] bg-[#EC662A] rounded-full'></div>
          <div className='w-[100%]'></div>
          <div className='w-[9px] h-[9px] bg-[#EC662A] rounded-full'></div>
        </div>
        <div className='w-[100%] h-[42px] border-b-2 border-l-2 border-r-2 border-[#EC662A] rounded-b-full mt-4'></div>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='text-center font-bold text-2xl md:text-4xl tracking-wider'>
          {title}
        </div>
        <div className='text-center text-xl md:text-2xl text-neutral-400'>
          {subtitle}
        </div>
      </div>
      {children}
    </div>
  );
};
export default MainSectionContainer;
