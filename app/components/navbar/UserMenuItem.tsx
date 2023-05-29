'use client';

interface UserMenuItemProps {
  mobileVisible?: boolean;
  label: string;
  onClick: () => void;
}

const UserMenuItem: React.FC<UserMenuItemProps> = ({
  label,
  onClick,
  mobileVisible,
}) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 hover:bg-neutral-100 font-light text-lg md:text-lg text-center cursor-pointer
      ${!mobileVisible || `block md:hidden`}
      `}
    >
      {label}
    </div>
  );
};
export default UserMenuItem;
