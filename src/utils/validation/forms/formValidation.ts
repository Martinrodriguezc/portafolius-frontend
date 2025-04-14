import { LoginFormData, LoginFormErrors } from "../../../types/login";
import { RegisterFormData, RegisterFormErrors } from "../../../types/register";
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
    userType: validateUserType(data.userType),
    password: validatePassword(data.password),
  };

  const isValid = Object.values(errors).every((error) => error === "");
  return { isValid, errors };
};