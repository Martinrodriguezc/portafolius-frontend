import { EmailInputProps } from './types';
import { BaseInput } from './BaseInput';

export const EmailInput = (props: EmailInputProps) => {
  return (
    <BaseInput
      {...props}
      type="email"
      placeholder={props.placeholder || 'correo@ejemplo.com'}
    />
  );
}; 