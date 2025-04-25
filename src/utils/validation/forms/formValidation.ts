import { LoginFormData, LoginFormErrors } from "../../../types/form/Login";
import {
  RegisterFormData,
  RegisterFormErrors,
} from "../../../types/form/Register";
import {
  validateEmail,
  validateLastName,
  validateName,
  validatePassword,
  validateUserType,
} from "./fieldValidations";

export const validateLoginForm = (
  data: LoginFormData
): { isValid: boolean; errors: LoginFormErrors } => {
  const errors: LoginFormErrors = {
    email: validateEmail(data.email),
    password: data.password.trim() === "" ? "La contraseña es obligatoria" : "",
  };

  const isValid = Object.values(errors).every((error) => error === "");
  return { isValid, errors };
};

export const validateRegisterForm = (
  data: RegisterFormData
): { isValid: boolean; errors: RegisterFormErrors } => {
  const errors: RegisterFormErrors = {
    firstName: validateName(data.firstName),
    lastName: validateLastName(data.lastName),
    email: validateEmail(data.email),
    role: validateUserType(data.role),
    password: validatePassword(data.password),
  };
  const isValid = Object.values(errors).every((error) => error === "");
  return { isValid, errors };
};
