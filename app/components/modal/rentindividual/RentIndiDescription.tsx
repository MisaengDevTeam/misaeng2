'use client';

interface RentIndiDescriptionProps {
  title: string;
  description: string;
}

const RentIndiDescription: React.FC<RentIndiDescriptionProps> = ({
  title,
  description,
}) => {
  return (
    <div className=''>
      <div className='font-semibold text-lg'>{title}</div>
      <div className='font-light'>{description}</div>
    </div>
  );
};
export default RentIndiDescription;
