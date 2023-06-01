'use client';

import { FieldValues, UseFormRegister } from 'react-hook-form';

interface TextareaProps {
  id: string;
  disabled?: boolean;
  required?: boolean;
  placeholer?: string;
  small?: boolean;
  onChange: (value: any) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  disabled,
  required,
  placeholer,
  onChange,
  small,
}) => {
  return (
    <div className='w-full relative'>
      <textarea
        id={id}
        required={required}
        disabled={disabled}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder={placeholer}
        rows={5}
        cols={20}
        className={`w-full  font-light bg-white border-2 border-neutral-300 rounded-md outline-none transition resize-none focus:border-[#EC662A]
        ${small ? 'text-sm' : 'text-lg'}
        ${small ? 'px-3 py-2' : 'p-4 pt-6'}
        ${disabled ? 'opacity-70' : 'opacity-100'}
        ${disabled ? 'cursor-not-allowed' : 'cursor-text'}
        `}
      />
    </div>
  );
};
export default Textarea;
