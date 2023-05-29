'use client';
import Select from 'react-select';

interface RmDistrictSelectProps {
  placeholder: string;
  options: any[];
  onChange: (value: string) => void;
}

const RmDistrictSelect: React.FC<RmDistrictSelectProps> = ({
  onChange,
  placeholder,
  options,
}) => {
  return (
    <div>
      <Select
        placeholder={placeholder}
        isClearable
        options={options}
        isSearchable={false}
        onChange={(value) => onChange(value.value)}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
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
export default RmDistrictSelect;
