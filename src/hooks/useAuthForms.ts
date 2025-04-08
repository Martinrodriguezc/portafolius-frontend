import { useState } from 'react';
import {
  RegisterFormState, 
  initialRegisterFormState,
  LoginFormState,
  initialLoginFormState
} from '../types/auth';
import { validateRegisterForm, validateLoginForm } from '../utils/validation';

// Hook for the registration form
export const useRegisterForm = (onSuccess?: () => void) => {
  const [state, setState] = useState<RegisterFormState>(initialRegisterFormState);
  
  const { formData, formErrors, showPasswordRequirements } = state;
  
  // Handle input changes
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
  
  // Show password requirements
  const handlePasswordFocus = () => {
    setState({
      ...state,
      showPasswordRequirements: true
    });
  };
  
  // Validate and submit the form
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

// Hook for the login form
export const useLoginForm = (onSuccess?: () => void) => {
  const [state, setState] = useState<LoginFormState>(initialLoginFormState);
  
  const { email, password, emailError, passwordError } = state;
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState({
      ...state,
      [id]: value
    });
  };
  
  // Validate and submit the form
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