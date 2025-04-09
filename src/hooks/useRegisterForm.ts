import { useState } from 'react';
import {
  RegisterFormState,
  initialRegisterFormState
} from '../types/auth';
import { validateRegisterForm } from '../utils/validation';

export const useRegisterForm = (onSuccess?: () => void) => {
  const [state, setState] = useState<RegisterFormState>(initialRegisterFormState);
  
  const { formData, formErrors, showPasswordRequirements } = state;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setState({
      ...state,
      formData: {
        ...formData,
        [id]: value
      }
    });
  };
  
  const handlePasswordFocus = () => {
    setState({
      ...state,
      showPasswordRequirements: true
    });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { isValid, errors } = validateRegisterForm(formData);
    
    setState({
      ...state,
      formErrors: errors
    });
    
    if (isValid) {
      console.log('Registration form submitted successfully', formData);
      if (onSuccess) {
        onSuccess();
      }
    }
  };
  
  return {
    formData,
    formErrors,
    showPasswordRequirements,
    handleInputChange,
    handlePasswordFocus,
    handleSubmit
  };
}; 