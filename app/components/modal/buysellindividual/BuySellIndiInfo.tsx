'use client';

interface BuySellIndiInfoProps {
  label: string;
  description: string;
}

const BuySellIndiInfo: React.FC<BuySellIndiInfoProps> = ({
  label,
  description,
}) => {
  return (
    <div className='flex justify-between'>
      <div>{`${label}`}: </div>
      <div>{`${description}`}</div>
    </div>
  );
};
export default BuySellIndiInfo;
