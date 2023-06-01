import Image from 'next/image';

interface EmptyStateProps {
  title?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title }) => {
  return (
    <div className='w-full h-[70vh] flex flex-col justify-center items-center gap-4'>
      <Image
        src={`/assets/images/logo/logo_vertical.png`}
        width={180}
        height={90}
        alt='s'
      />
      <p className='text-lg'>현재 {title} 페이지는 서비스가 불가능합니다.</p>
      <p className='text-lg'>이용에 불편함을 드려 대단히 죄송합니다.</p>
      <p className='text-lg'>- 미생 USA 개발팀 -</p>
    </div>
  );
};
export default EmptyState;
