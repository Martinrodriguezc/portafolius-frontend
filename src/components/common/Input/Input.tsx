import { InputProps } from "../../../types/Props/common/InputProps"

const Input: React.FC<InputProps> = ({
  label,
  error,
  required,
  id,
  name,
  className = "",
  showPasswordRequirements,
  type = "text",
  placeholder,
  onFocus,
  onChange,
  value,
  ...rest
}) => {
  const finalPlaceholder =
    type === "email" && !placeholder ? "correo@ejemplo.com" : placeholder

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id ?? name}
          className="block text-[10px] md:text-[14px] text-[#333333]"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        id={id ?? name}
        name={name}
        type={type}
        placeholder={finalPlaceholder}
        onFocus={onFocus}
        onChange={onChange}
        value={value}
        className={`w-full h-[42px] text-[10px] md:text-[14px] rounded-[8px] px-3 border ${
          error ? "border-red-500" : "border-[#A0A0A0]"
        } ${className}`}
        {...rest}
      />

      {type === "password" && showPasswordRequirements && (
        <div className="text-[10px] md:text-[12px] text-gray-600 bg-gray-50 p-2 rounded border border-gray-200 mt-1">
          La contraseña debe tener:
          <ul className="list-disc pl-5 mt-1">
            <li>Mínimo 8 caracteres</li>
            <li>Al menos una letra mayúscula</li>
            <li>Al menos un número</li>
            <li>Al menos un símbolo (!@#$%^&*)</li>
          </ul>
        </div>
      )}

      {error && <p className="text-red-500 text-[12px] mt-1">{error}</p>}
    </div>
  )
}

export default Input