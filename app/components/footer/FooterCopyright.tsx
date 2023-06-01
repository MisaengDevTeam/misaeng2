'use client';

interface FooterCopyrightProps {
  address: string;
  email: string;
  copyright: string;
}

const FooterCopyright: React.FC<FooterCopyrightProps> = ({
  address,
  email,
  copyright,
}) => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='text-center text-neutral-600 font-light'>
        <p>{address}</p>
        <p>{email}</p>
      </div>
      <div className='text-center text-neutral-400 font-light'>
        <p>{copyright}</p>
      </div>
    </div>
  );
};
export default FooterCopyright;
