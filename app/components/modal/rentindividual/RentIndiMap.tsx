'use client';

import MapComponent from '../../Map';

interface RentIndiMapProps {
  title: string;
  coordinate: [number, number];
}

const RentIndiMap: React.FC<RentIndiMapProps> = ({ title, coordinate }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='font-semibold text-lg'>{title}</div>
      <MapComponent initCoordinate={coordinate} showRange />
    </div>
  );
};
export default RentIndiMap;
