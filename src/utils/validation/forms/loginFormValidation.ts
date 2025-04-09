import { LoginFormData, LoginFormErrors } from '../../../types/login';
import { getEmailErrorMessage } from '../emailValidation';

export const validateLoginForm = (data: LoginFormData): { isValid: boolean; errors: LoginFormErrors } => {
  const errors: LoginFormErrors = {
    email: getEmailErrorMessage(data.email),
    password: data.password ? '' : 'La contraseña es obligatoria'
  };
  
  const isValid = !Object.values(errors).some(error => error !== '');
  
  return { isValid, errors };
}; 