'use client';

interface MyPageInputProps {
  label: string;
  disabled?: boolean;
  value?: string;
  length?: number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

const MyPageInput: React.FC<MyPageInputProps> = ({
  label,
  disabled,
  value,
  length,
  onChange,
  placeholder,
  type = 'string',
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='name'>{label}</label>
      <input
        id='name'
        type={type}
        maxLength={length}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className={`w-full border border-neutral-300 outline-0 py-2 px-4 rounded-md focus:border focus:border-neutral-800
        ${disabled ? 'cursor-not-allowed' : 'cursor-default'}
        `}
      />
    </div>
  );
};
export default MyPageInput;
