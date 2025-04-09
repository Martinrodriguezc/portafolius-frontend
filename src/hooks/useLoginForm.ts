import { useState } from 'react';
import {
  LoginFormState,
  initialLoginFormState
} from '../types/auth';
import { validateLoginForm } from '../utils/validation';

export const useLoginForm = (onSuccess?: () => void) => {
  const [state, setState] = useState<LoginFormState>(initialLoginFormState);
  
  const { email, password, emailError, passwordError } = state;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState({
      ...state,
      [id]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { isValid, errors } = validateLoginForm(email, password);
    
    setState({
      ...state,
      emailError: errors.email,
      passwordError: errors.password
    });
    
    if (isValid) {
      console.log('Login form submitted successfully', { email, password });
      if (onSuccess) {
        onSuccess();
      }
    }
  };
  
  return {
    email,
    password,
    emailError,
    passwordError,
    handleInputChange,
    handleSubmit
  };
}; 