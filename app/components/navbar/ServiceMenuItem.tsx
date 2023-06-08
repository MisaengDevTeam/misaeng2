'use client';

interface ServiceMenuItemProps {
  label: string;
  onClick: () => void;
}

const ServiceMenuItem: React.FC<ServiceMenuItemProps> = ({
  label,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className='font-light text-base lg:text-xl sm:px-2 lg:px-4 hover:text-[#EC662A] hover:font-semibold cursor-pointer'
    >
      {label}
    </div>
  );
};
export default ServiceMenuItem;
