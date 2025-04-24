import { BaseFormState } from "./form";

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
}

export interface RegisterFormErrors {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
}

export type role = "estudiante" | "profesor" | "google_login" | "admin";

export type RegisterFormState = BaseFormState<
  RegisterFormData,
  RegisterFormErrors
> & {
  showPasswordRequirements: boolean;
};

export const initialRegisterFormState: RegisterFormState = {
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  },
  formErrors: {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  },
  showPasswordRequirements: false,
};

export interface RegisterFormProps {
  onRegisterSuccess?: () => void;
  onNavigateToLogin?: () => void;
}
