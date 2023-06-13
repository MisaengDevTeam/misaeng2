'use client';

interface RoommateIndiAttrProps {
  title: string;
  arr: string[];
}

const RoommateIndiAttr: React.FC<RoommateIndiAttrProps> = ({ title, arr }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='font-semibold text-lg'>{title}</div>
      <div className='grid grid-cols-3 gap-x-2 gap-y-1'>
        {arr.map((item) => (
          <div
            key={item}
            className='flex justify-center items-center py-1 px-1 border-[1px] border-[#EC662A] rounded-full font-light text-[12px] sm:text-sm'
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
export default RoommateIndiAttr;
