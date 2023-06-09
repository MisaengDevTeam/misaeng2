'use client';

import Select from 'react-select';

interface RentSearchSelectProps {
  placeholder: string;
  lastItemToHide?: boolean;
  options: any[];
  onChange: (value: string) => void;
  multiple?: boolean;
  disabled?: boolean;
}

const RentSearchSelect: React.FC<RentSearchSelectProps> = ({
  placeholder,
  lastItemToHide,
  options,
  onChange,
  multiple,
  disabled,
}) => {
  return (
    <Select
      placeholder={placeholder}
      options={options}
      isDisabled={disabled}
      isSearchable={false}
      isClearable={false}
      className={` ${
        lastItemToHide ? 'hidden lg:block' : 'block'
      }  text-[12px] sm:text-sm`}
      classNames={{
        control: () => `border-2 text-[12px] sm:text-sm `,
        input: () => `overflow-hidden text-[12px] `,
        option: () => `text-[yuj12px] hover:bg-orange-200`,
      }}
      onChange={(value) => {
        onChange(value.value);
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
