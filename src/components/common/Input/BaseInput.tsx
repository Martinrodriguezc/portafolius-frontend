import { BaseInputProps } from './types';

export const BaseInput = ({ 
  label,
  error,
  required,
  id,
  className = '',
  ...props 
}: BaseInputProps) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-[14px] text-[#333333]">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        className={`
          w-full h-[42px] text-[14px] 
          border ${error ? 'border-red-500' : 'border-[#A0A0A0]'} 
          rounded-[8px] px-3
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-[12px] mt-1">{error}</p>
      )}
    </div>
  );
}; 