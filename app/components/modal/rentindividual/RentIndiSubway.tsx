'use client';

import subwayMarker from '@/app/lib/subwayMarker';
import { IBuildingToSubwayInfo } from '@/types/RentTypes';

interface RentIndiSubwayProps {
  title: string;
  subway: IBuildingToSubwayInfo[] | undefined;
}

const RentIndiSubway: React.FC<RentIndiSubwayProps> = ({ title, subway }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='font-semibold text-lg'>{title}</div>
      <div className='flex flex-col gap-1'>
        {subway &&
          subway.map((station) => (
            <div key={station._id.toString()}>
              {station.lines.length != 0 && (
                <div>
                  {station.name} / {station.distance.toString()}미터
                </div>
              )}
              <div className='flex flex-row gap-1'>
                {station.lines.map((line) => (
                  <div
                    className={`${subwayMarker(line)}${station.lines.indexOf(
                      line
                    )}`}
                    key={line}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default RentIndiSubway;
