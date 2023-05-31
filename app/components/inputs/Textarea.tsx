'use client';

import { FieldValues, UseFormRegister } from 'react-hook-form';

interface TextareaProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  emailValue?: string;
  placeholer?: string;
  errors: FieldValues;
  defaultValue?: any;
  small?: boolean;
  onChange?: (value: any) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  placeholer,
  errors,
  emailValue,
  onChange,
  small,
}) => {
  return (
    <div className='w-full relative'>
      <textarea
        id={id}
        disabled={disabled}
        onChange={onChange}
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
      {/* <input
        value={emailValue}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=' '
        step={100}
        max={5000}
        maxLength={4}
        type={type}
        onChange={onChange}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
    ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
    `}
      />
      <label
        className={`absolute left-4 text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
  ${errors[id] ? 'text-rose-500' : 'text-zinx-400'}`}
      >
        {label}
      </label> */}
    </div>
  );
};
export default Textarea;
