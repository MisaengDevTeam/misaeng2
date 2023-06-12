'use client';

interface RoommateLocationProps {
  city: string;
  district: string;
}

const RoommateLocation: React.FC<RoommateLocationProps> = ({
  city,
  district,
}) => {
  return (
    <div className='flex flex-row gap-4 justify-center w-full bg-neutral-200 text-[#000] rounded-full'>
      위치는 <span className='font-bold'>{district}</span>,{' '}
      <span className='font-bold'>{city}</span>입니다.
    </div>
  );
};
export default RoommateLocation;
