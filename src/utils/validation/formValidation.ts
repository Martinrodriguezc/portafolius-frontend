// Form validation integration

import { FormData, FormErrors, ValidationResult } from '../../types/auth';
import { validateEmail, getEmailErrorMessage } from './emailValidation';
import { validatePassword, getPasswordErrorMessage } from './passwordValidation';
import { 
  validateName, 
  getNameErrorMessage,
  validateLastName,
  getLastNameErrorMessage,
  validateUserType,
  getUserTypeErrorMessage
} from './personalDataValidation';

/**
 * Validates the registration form data
 * @param formData - The form data to validate
 * @returns Validation result with isValid flag and errors object
 */
export const validateRegisterForm = (formData: FormData): ValidationResult => {
  // Initialize errors
  const errors: FormErrors = {
    firstName: '',
    lastName: '',
    email: '',
    userType: '',
    password: ''
  };
  
  // Validate each field and collect error messages
  errors.firstName = getNameErrorMessage(formData.firstName);
  errors.lastName = getLastNameErrorMessage(formData.lastName);
  errors.email = getEmailErrorMessage(formData.email);
  errors.userType = getUserTypeErrorMessage(formData.userType);
  errors.password = getPasswordErrorMessage(formData.password);
  
  // Check if there are any errors
  const isValid = !Object.values(errors).some(error => error !== '');
  
  return { isValid, errors };
};

/**
 * Validates the login form data
 * @param email - The email to validate
 * @param password - The password to validate
 * @returns Validation result with isValid flag and errors object
 */
export const validateLoginForm = (email: string, password: string): { isValid: boolean, errors: { email: string, password: string } } => {
  const errors = {
    email: getEmailErrorMessage(email),
    password: password ? '' : 'La contraseña es obligatoria'
  };
  
  const isValid = !Object.values(errors).some(error => error !== '');
  
  return { isValid, errors };
}; 