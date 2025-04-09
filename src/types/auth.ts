// Authentication type definitions

// Basic data types
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  password: string;
}

export interface FormErrors {
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  password: string;
}

export type UserType = 'student' | 'teacher';

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

// Initial states
export const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  userType: '',
  password: ''
};

export const initialFormErrors: FormErrors = {
  firstName: '',
  lastName: '',
  email: '',
  userType: '',
  password: ''
};

// RegisterForm component specific types
export interface RegisterFormState {
  formData: FormData;
  formErrors: FormErrors;
  showPasswordRequirements: boolean;
}

export const initialRegisterFormState: RegisterFormState = {
  formData: initialFormData,
  formErrors: initialFormErrors,
  showPasswordRequirements: false
};

export interface RegisterFormProps {
  onRegisterSuccess?: () => void;
}

// LoginForm component specific types
export interface LoginFormState {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
}

export const initialLoginFormState: LoginFormState = {
  email: '',
  password: '',
  emailError: '',
  passwordError: ''
}; 