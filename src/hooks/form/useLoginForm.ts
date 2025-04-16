import { useFormHook } from "./useFormHook";
import { validateLoginForm } from "../../utils/validation/forms/formValidation";
import { initialLoginFormState, LoginFormData, LoginFormErrors } from "../../types/login";

export const useLoginForm = (onSuccess?: () => void) => {
  const { formData, formErrors, handleInputChange, handleSubmit } = useFormHook<LoginFormData, LoginFormErrors>(
    initialLoginFormState,
    validateLoginForm,
    onSuccess
  );

  return {
    email: formData.email,
    password: formData.password,
    emailError: formErrors.email,
    passwordError: formErrors.password,
    handleInputChange,
    handleSubmit,
  };
};
