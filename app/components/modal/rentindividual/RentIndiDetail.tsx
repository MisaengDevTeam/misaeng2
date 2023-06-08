'use client';

interface RentDetailProps {
  title: string;
  category: string;
  broker: string;
  utility: string;
}

const RentIndiDetail: React.FC<RentDetailProps> = ({
  title,
  category,
  broker,
  utility,
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='font-semibold text-lg'>{title}</div>
      <div className='grid grid-cols-3 gap-x-2 gap-y-1'>
        <div className='flex justify-center items-center py-1 px-2 border-[1px] border-[#EC662A] rounded-full font-light text-[12px] sm:text-sm md:text-base'>
          {category}
        </div>
        <div className='flex justify-center items-center py-1 px-2 border-[1px] border-[#EC662A] rounded-full font-light text-[12px] sm:text-sm md:text-base'>
          {broker}
        </div>
        <div className='flex justify-center items-center py-1 px-2 border-[1px] border-[#EC662A] rounded-full font-light text-[12px] sm:text-sm md:text-base'>
          {utility}
        </div>
      </div>
    </div>
  );
};
export default RentIndiDetail;
