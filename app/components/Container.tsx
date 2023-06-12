'use client';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className='relative max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-8 px-4 w-full h-full'>
      {children}
    </div>
  );
};
export default Container;
