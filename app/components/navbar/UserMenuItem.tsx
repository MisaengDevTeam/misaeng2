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
      className={`px-2 py-3 md:px-4 hover:bg-neutral-100 w-full font-light text-md md:text-lg text-center cursor-pointer
      ${!mobileVisible || `block md:hidden`}
      `}
    >
      {label}
    </div>
  );
};
export default UserMenuItem;
