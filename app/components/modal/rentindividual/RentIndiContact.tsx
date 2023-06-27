'use client';

interface RentIndiContactProps {
  label: string;
  placeholder: string;
  maxLength?: number;
  name: string;
}

const RentIndiContact: React.FC<RentIndiContactProps> = ({
  label,
  placeholder,
  maxLength,
  name,
}) => {
  return (
    <div className='w-full flex flex-col'>
      <label className='w-full font-semibold' htmlFor={`contact${label}`}>
        {label}
      </label>
      <input
        id={`contact${label}`}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        className='w-full border border-[#EC662A] rounded-lg p-2 focus:outline-[#EC662A] text-sm'
      />
    </div>
  );
};
export default RentIndiContact;
