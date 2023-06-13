'use client';

import { useRouter } from 'next/navigation';

interface MySubNavItemProps {
  pathname: string;
  label: string;
  selected: boolean;
}

const MySubNavItem: React.FC<MySubNavItemProps> = ({
  pathname,
  label,
  selected,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`${pathname}`)}
      className={`inline-flex cursor-pointer hover:font-semibold hover:text-[#EC662A]
      ${selected ? 'font-semibold text-[#EC662A]' : ''}
      `}
    >
      {label}
    </div>
  );
};
export default MySubNavItem;
