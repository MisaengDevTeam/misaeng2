'use client';

interface UserMenuItemProps {
  label: string;
  onClick: () => void;
}

const UserMenuItem: React.FC<UserMenuItemProps> = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='px-4 py-3 hover:bg-neutral-100 font-light text-lg md:text-lg text-center cursor-pointer'
    >
      {label}
    </div>
  );
};
export default UserMenuItem;
