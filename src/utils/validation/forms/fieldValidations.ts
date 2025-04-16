export const validateRequiredField = (
  value: string,
  fieldName: string
): string => {
  if (!value || value.trim() === "") {
    return `El ${fieldName} es obligatorio`;
  }
  return "";
};

export const validateEmail = (email: string): string => {
  if (!email || email.trim() === "") {
    return "El correo electrónico es obligatorio";
  }
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return "Ingresa un correo electrónico válido";
  }
  return "";
};

const hasMinLength = (password: string): boolean => password.length >= 8;
const hasSpecialChar = (password: string): boolean =>
  /[!@#$%^&*]/.test(password);
const hasUpperCase = (password: string): boolean => /[A-Z]/.test(password);

export const validatePassword = (password: string): string => {
  if (!hasMinLength(password)) {
    return "La contraseña debe tener al menos 8 caracteres";
  }
  if (!hasSpecialChar(password)) {
    return "La contraseña debe contener al menos un símbolo especial";
  }
  if (!hasUpperCase(password)) {
    return "La contraseña debe contener al menos una letra mayúscula";
  }
  return "";
};

export const validateName = (name: string): string =>
  validateRequiredField(name, "nombre");

export const validateLastName = (lastName: string): string =>
  validateRequiredField(lastName, "apellido");

export const validateUserType = (userType: string): string =>
  validateRequiredField(userType, "tipo de usuario");
