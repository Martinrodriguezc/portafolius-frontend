import { PasswordInputProps } from './types';
import { BaseInput } from './BaseInput';

export const PasswordInput = ({ 
  showPasswordRequirements, 
  onPasswordFocus,
  ...props 
}: PasswordInputProps) => {
  return (
    <div>
      <BaseInput 
        {...props} 
        type="password"
        onFocus={onPasswordFocus}
      />
      {showPasswordRequirements && (
        <div className="text-[12px] text-gray-600 bg-gray-50 p-2 rounded border border-gray-200 mt-1">
          La contraseña debe tener:
          <ul className="list-disc pl-5 mt-1">
            <li>Mínimo 8 caracteres</li>
            <li>Al menos un símbolo especial (!@#$%^&*)</li>
            <li>Al menos una letra en mayúscula</li>
          </ul>
        </div>
      )}
    </div>
  );
}; 