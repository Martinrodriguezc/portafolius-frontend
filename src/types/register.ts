import { BaseFormState } from './form';

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  password: string;
}

export interface RegisterFormErrors {
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  password: string;
}

export type UserType = 'student' | 'teacher';

export type RegisterFormState = BaseFormState<RegisterFormData, RegisterFormErrors> & {
  showPasswordRequirements: boolean;
};

export const initialRegisterFormState: RegisterFormState = {
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    userType: '',
    password: ''
  },
  formErrors: {
    firstName: '',
    lastName: '',
    email: '',
    userType: '',
    password: ''
  },
  showPasswordRequirements: false
};

export interface RegisterFormProps {
  onRegisterSuccess?: () => void;
  onNavigateToLogin?: () => void;
}