export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export interface EmailInputProps extends Omit<BaseInputProps, 'type'> {
  placeholder?: string;
}

export interface PasswordInputProps extends Omit<BaseInputProps, 'type'> {
  showPasswordRequirements?: boolean;
  onPasswordFocus?: () => void;
}

export interface TextInputProps extends Omit<BaseInputProps, 'type'> {
  placeholder?: string;
} 