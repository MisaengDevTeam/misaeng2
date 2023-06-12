'use client';

interface MyPageInputProps {
  label: string;
  disabled?: boolean;
  value?: string;
  onChange: (value: string) => void;
}

const MyPageInput: React.FC<MyPageInputProps> = ({
  label,
  disabled,
  value,
  onChange,
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='name'>{label}</label>
      <input
        id='name'
        value={value}
        disabled={disabled}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className={`w-full border border-neutral-300 outline-0 py-2 px-4 rounded-md
        ${disabled ? 'cursor-not-allowed' : 'cursor-default'}
        `}
      />
    </div>
  );
};
export default MyPageInput;
