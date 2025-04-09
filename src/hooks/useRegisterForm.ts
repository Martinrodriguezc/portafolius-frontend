import { useFormHook } from './useFormHook';
import { RegisterFormData, RegisterFormErrors, initialRegisterFormState } from '../types/register';
import { validateRegisterForm } from '../utils/validation';
import { useState } from 'react';

export const useRegisterForm = (onSuccess?: () => void) => {
  const formHook = useFormHook<RegisterFormData, RegisterFormErrors>(
    initialRegisterFormState,
    validateRegisterForm,
    onSuccess
  );

  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const handlePasswordFocus = () => {
    setShowPasswordRequirements(true);
  };

  return {
    ...formHook,
    showPasswordRequirements,
    handlePasswordFocus,
  };
}; 