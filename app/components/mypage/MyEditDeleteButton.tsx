'use client';

interface MyEditDeleteButtonProps {
  label: string;
  onClick: () => void;
  editEl?: boolean;
  deleteEl?: boolean;
}

const MyEditDeleteButton: React.FC<MyEditDeleteButtonProps> = ({
  label,
  onClick,
  editEl,
  deleteEl,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex justify-center items-center w-full py-2 sm:py-0 h-auto sm:h-full rounded-lg cursor-pointer border sm:text-sm bg-[#fff]
      ${editEl ? 'border-blue-600 text-blue-600 hover:bg-blue-100' : ''}
      ${deleteEl ? 'border-red-600 text-red-600 hover:bg-red-100' : ''}
      `}
    >
      {label}
    </div>
  );
};
export default MyEditDeleteButton;
