import { useFormHook } from './useFormHook';
import { LoginFormData, LoginFormErrors, initialLoginFormState } from '../types/login';
import { validateLoginForm } from '../utils/validation';

export const useLoginForm = (onSuccess?: () => void) => {
  const formHook = useFormHook<LoginFormData, LoginFormErrors>(
    initialLoginFormState,
    validateLoginForm,
    onSuccess
  );

  return {
    ...formHook,
    email: formHook.formData.email,
    password: formHook.formData.password,
    emailError: formHook.formErrors.email,
    passwordError: formHook.formErrors.password,
  };
}; 