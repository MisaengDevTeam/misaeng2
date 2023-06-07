'use client';
import Select from 'react-select';

interface SelectCompProps {
  placeholder: string;
  options: any[];
  onChange: (value: string) => void;
  small?: boolean;
}

const SelectComp: React.FC<SelectCompProps> = ({
  onChange,
  placeholder,
  options,
  small,
}) => {
  return (
    <div className='w-full sm:w-auto'>
      <Select
        placeholder={placeholder}
        options={options}
        isSearchable={false}
        isClearable={false}
        onChange={(value) => onChange(value.value)}
        classNames={{
          control: () =>
            `${small ? 'p-1 text-[14px] sm:text-sm' : 'p-3 text-sm'} border-2`,
          input: () =>
            `overflow-hidden ${small ? 'text-[14px] sm:text-sm' : 'text-lg'}`,
          option: () =>
            `${
              small ? 'text-[14px] sm:text-sm' : 'text-lg'
            } hover:bg-orange-200`,
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
    </div>
  );
};
export default SelectComp;
