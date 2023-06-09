'use client';

interface RentSearchButtonProps {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

const RentSearchButton: React.FC<RentSearchButtonProps> = ({
  label,
  disabled,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='h-full w-auto xl:w-[100px] rounded-md text-white bg-[#EC662A] transition hover:opacity-75 text-[14px] sm:text-base'
    >
      {label}
    </button>
  );
};
export default RentSearchButton;
