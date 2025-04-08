import { FormData, FormErrors, ValidationResult } from '../types/auth';

// Function to validate the registration form
export const validateRegisterForm = (formData: FormData): ValidationResult => {
  // Initialize errors
  const errors: FormErrors = {
    firstName: '',
    lastName: '',
    email: '',
    userType: '',
    password: ''
  };
  
  let isValid = true;
  
  // Validate first name
  if (!formData.firstName.trim()) {
    errors.firstName = 'El nombre es obligatorio';
    isValid = false;
  }
  
  // Validate last name
  if (!formData.lastName.trim()) {
    errors.lastName = 'El apellido es obligatorio';
    isValid = false;
  }
  
  // Validate email
  if (!formData.email.trim()) {
    errors.email = 'El correo electrónico es obligatorio';
    isValid = false;
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Ingresa un correo electrónico válido';
    isValid = false;
  }
  
  // Validate user type
  if (!formData.userType) {
    errors.userType = 'Por favor, selecciona un tipo de usuario';
    isValid = false;
  }
  
  // Validate password
  if (!formData.password) {
    errors.password = 'La contraseña es obligatoria';
    isValid = false;
  } else if (!validatePassword(formData.password)) {
    errors.password = getPasswordErrorMessage(formData.password);
    isValid = false;
  }
  
  return { isValid, errors };
};

// Function to validate the login form
export const validateLoginForm = (email: string, password: string): { isValid: boolean, errors: { email: string, password: string } } => {
  const errors = {
    email: '',
    password: ''
  };
  
  let isValid = true;
  
  // Validate email
  if (!email.trim()) {
    errors.email = 'El correo electrónico es obligatorio';
    isValid = false;
  } else if (!validateEmail(email)) {
    errors.email = 'Ingresa un correo electrónico válido';
    isValid = false;
  }
  
  // Validate password
  if (!password) {
    errors.password = 'La contraseña es obligatoria';
    isValid = false;
  }
  
  return { isValid, errors };
};

// Function to validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

// Function to validate password
export const validatePassword = (password: string): boolean => {
  // Must have at least 8 characters, a special symbol, and an uppercase letter
  const hasMinLength = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  
  return hasMinLength && hasSpecialChar && hasUpperCase;
};

// Function to get specific password error message
export const getPasswordErrorMessage = (password: string): string => {
  if (password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres';
  }
  if (!/[!@#$%^&*]/.test(password)) {
    return 'La contraseña debe contener al menos un símbolo especial';
  }
  if (!/[A-Z]/.test(password)) {
    return 'La contraseña debe contener al menos una letra mayúscula';
  }
  return '';
}; 