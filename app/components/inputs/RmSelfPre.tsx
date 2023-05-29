'use client';

import { useCallback } from 'react';

interface RmSelfPreProps {
  selfcategory: string;
  selfinfo: string[];
  selectedGender: string;
  selectedAge: string;
  selectedStatus: string;
  selectedPet: string;
  selectedSmoke: string;
  selectedMBTI: string;
  onClick: (id: string, value: string) => void;
}

const RmSelfPre: React.FC<RmSelfPreProps> = ({
  selfcategory,
  selfinfo,
  onClick,
  selectedGender,
  selectedAge,
  selectedStatus,
  selectedPet,
  selectedSmoke,
  selectedMBTI,
}) => {
  const isSelected = useCallback(
    (category: string, item: string) => {
      const selectedItems: { [key: string]: string } = {
        성별: selectedGender,
        연령대: selectedAge,
        학생: selectedStatus,
        반려동물: selectedPet,
        흡연여부: selectedSmoke,
        MBTI: selectedMBTI,
      };
      const selectedValue = selectedItems[category];
      return selectedValue === item
        ? `border-[#EC662A] bg-[#EC662A]/[0.1]`
        : `border-neutral-200 'bg-white`;
    },
    [
      selectedAge,
      selectedGender,
      selectedMBTI,
      selectedPet,
      selectedSmoke,
      selectedStatus,
    ]
  );

  return (
    <div className='flex flex-col gap-1'>
      <div className=''>{selfcategory}</div>
      <div className='grid grid-cols-4 gap-3 max-h-[50vh] overflow-y-auto'>
        {selfinfo.map((item) => (
          <div
            onClick={() => {
              onClick(selfcategory, item);
            }}
            key={item}
            className={`flex justify-center items-center text-sm h-5 border-[2px] py-3 rounded-md cursor-pointer hover:border-black
            ${isSelected(selfcategory, `${selfcategory}${item}`)}
            `}
          >
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RmSelfPre;
