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
      className={`h-full w-full xl:w-[100px] rounded-md text-white transition hover:opacity-75 text-[14px] sm:text-base
      ${disabled ? 'bg-neutral-300' : 'bg-[#EC662A]'}
      `}
    >
      {label}
    </button>
  );
};
export default RentSearchButton;
