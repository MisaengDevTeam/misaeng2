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
      className='font-light text-base lg:text-xl px-4 py-3 hover:text-[#EC662A] hover:font-semibold cursor-pointer'
    >
      {label}
    </div>
  );
};
export default ServiceMenuItem;
