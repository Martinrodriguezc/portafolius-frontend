import { RegisterFormData, RegisterFormErrors } from '../../../types/register';
import { getEmailErrorMessage } from '../emailValidation';
import { getPasswordErrorMessage } from '../passwordValidation';
import { 
  getNameErrorMessage,
  getLastNameErrorMessage,
  getUserTypeErrorMessage 
} from '../personalDataValidation';

export const validateRegisterForm = (data: RegisterFormData): { isValid: boolean; errors: RegisterFormErrors } => {
  const errors: RegisterFormErrors = {
    firstName: getNameErrorMessage(data.firstName),
    lastName: getLastNameErrorMessage(data.lastName),
    email: getEmailErrorMessage(data.email),
    userType: getUserTypeErrorMessage(data.userType),
    password: getPasswordErrorMessage(data.password)
  };
  
  const isValid = !Object.values(errors).some(error => error !== '');
  
  return { isValid, errors };
}; 