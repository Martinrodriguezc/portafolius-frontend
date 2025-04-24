import { InputProps } from "../../../types/Props/InputProps";

const Input: React.FC<InputProps> = ({
  label,
  error,
  required,
  id,
  className = "",
  showPasswordRequirements,
  type,
  placeholder,
  onFocus,
  ...props
}) => {
  const finalPlaceholder =
    type === "email" && !placeholder ? "correo@ejemplo.com" : placeholder;

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
        type={type}
        placeholder={finalPlaceholder}
        onFocus={onFocus}
        className={`w-full h-[42px] text-[14px] rounded-[8px] px-3 border ${
          error ? "border-red-500" : "border-[#A0A0A0]"
        } ${className}`}
        {...props}
      />
      {type === "password" && showPasswordRequirements && (
        <div className="text-[12px] text-gray-600 bg-gray-50 p-2 rounded border border-gray-200 mt-1">
          La contraseña debe tener:
          <ul className="list-disc pl-5 mt-1">
            <li>Mínimo 8 caracteres</li>
            <li>Al menos un símbolo especial (!@#$%^&*)</li>
            <li>Al menos una letra mayúscula</li>
          </ul>
        </div>
      )}
      {error && <p className="text-red-500 text-[12px] mt-1">{error}</p>}
    </div>
  );
};

export default Input;
