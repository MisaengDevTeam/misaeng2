'use client';

import { BiDollar } from 'react-icons/bi';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  emailValue?: string;
  errors: FieldValues;
  defaultValue?: any;
  formatPrice?: boolean;
  length?: number;
  maxNumber?: number;
  rentmap?: boolean;
  onChange?: (value: any) => void;
}

const Input: React.FC<InputProps> = ({
  maxNumber = 5000,
  id,
  label,
  type = 'text',
  disabled,
  required,
  register,
  errors,
  length = 4,
  emailValue,
  onChange,
  formatPrice,
  rentmap,
}) => {
  return (
    <div className='w-full relative'>
      {formatPrice && (
        <BiDollar
          size={24}
          className='text-neutral-700 absolute top-5 left-2'
        />
      )}
      <input
        value={emailValue}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=' '
        step={100}
        max={maxNumber}
        maxLength={length}
        type={type}
        onChange={onChange}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
        ${rentmap ? 'h-[53px]' : 'h-[62px]'}
        ${formatPrice ? 'pl-9' : 'pl-4'}
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
      <label
        className={`absolute left-4 text-md duration-150 transform -translate-y-3 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
        ${rentmap ? ' top-4' : ' top-5'}
        ${formatPrice ? 'left-9' : 'left-4'}
      ${errors[id] ? 'text-rose-500' : 'text-zinx-400'}`}
      >
        {label}
      </label>
    </div>
  );
};
export default Input;
