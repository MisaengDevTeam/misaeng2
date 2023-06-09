'use client';

import Select from 'react-select';

interface RentSearchSelectProps {
  placeholder: string;
}

const RentSearchSelect: React.FC<RentSearchSelectProps> = ({ placeholder }) => {
  return (
    <Select
      placeholder={placeholder}
      // options={options}
      isSearchable={false}
      isClearable={false}
      classNames={{
        control: () => `border-2 text-[12px] sm:text-base`,
        input: () => `overflow-hidden text-[14px]`,
        option: () => `text-[14px]`,
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: '#EC662A',
          primary25: '#FF#4#6',
        },
      })}
    />
  );
};
export default RentSearchSelect;
