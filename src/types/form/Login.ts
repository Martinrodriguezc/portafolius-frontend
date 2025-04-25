import { BaseFormState } from "./form";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email: string;
  password: string;
}

export type LoginFormState = BaseFormState<LoginFormData, LoginFormErrors>;

export const initialLoginFormState: LoginFormState = {
  formData: {
    email: "",
    password: "",
  },
  formErrors: {
    email: "",
    password: "",
  },
};

export interface LoginFormProps {
  onLoginSuccess?: () => void;
  onNavigateToRegister: () => void;
}
