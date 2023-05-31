'use client';

import { useCallback } from 'react';

interface RmSelfPreProps {
  addspace: (str: string) => string;
  selfcategory: string;
  selfinfo: string[];
  selectedGender?: string;
  selectedAge?: string;
  selectedStatus?: string;
  selectedPet?: string;
  selectedSmoke?: string;
  selectedMBTI?: string;
  selectedRmGender?: string;
  selectedRmAge?: string;
  selectedRmStatus?: string;
  selectedRmPet?: string;
  selectedRmSmoke?: string;
  onClick: (id: string, value: string) => void;
}

const RmSelfPre: React.FC<RmSelfPreProps> = ({
  addspace,
  selfcategory,
  selfinfo,
  onClick,
  selectedGender,
  selectedAge,
  selectedStatus,
  selectedPet,
  selectedSmoke,
  selectedMBTI,
  selectedRmGender,
  selectedRmAge,
  selectedRmStatus,
  selectedRmPet,
  selectedRmSmoke,
}) => {
  const isSelected = useCallback(
    (category: string, item: string) => {
      const selectedItems: { [key: string]: string | undefined } = {
        본인성별: selectedGender,
        본인연령대: selectedAge,
        본인학생: selectedStatus,
        본인반려동물: selectedPet,
        본인흡연여부: selectedSmoke,
        본인MBTI: selectedMBTI,
        상대성별: selectedRmGender,
        상대연령대: selectedRmAge,
        상대학생: selectedRmStatus,
        상대반려동물: selectedRmPet,
        상대흡연여부: selectedRmSmoke,
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
      selectedRmAge,
      selectedRmGender,
      selectedRmPet,
      selectedRmSmoke,
      selectedRmStatus,
    ]
  );

  return (
    <div className='flex flex-col gap-1'>
      <div className='text-xs md:text-md'>{addspace(selfcategory)}</div>
      <div className='grid grid-cols-4 gap-x-2 gap-y-1 max-h-[50vh] overflow-y-auto'>
        {selfinfo.map((item) => (
          <div
            onClick={() => {
              onClick(selfcategory, item);
            }}
            key={item}
            className={`flex justify-center items-center text-xs md:text-md h-3 border-[1px] py-3 rounded-md cursor-pointer hover:border-black
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
