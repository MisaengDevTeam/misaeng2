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
    <div className='flex flex-row gap-4 justify-center w-full'>
      <div className='font-bold'>{city}</div>
      <div className='font-bold'>{district}</div>
    </div>
  );
};
export default RoommateLocation;
