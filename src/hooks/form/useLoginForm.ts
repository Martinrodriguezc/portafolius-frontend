import { useFormHook } from "./useFormHook";
import { validateLoginForm } from "../../utils/validation/forms/formValidation";
import { initialLoginFormState, LoginFormData, LoginFormErrors } from "../../types/login";
import { authService } from "../authServices";

export const useLoginForm = (onSuccess?: () => void) => {
  const { formData, formErrors, handleInputChange } = useFormHook<LoginFormData, LoginFormErrors>(
    initialLoginFormState,
    validateLoginForm,
    onSuccess
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isValid } = validateLoginForm(formData);

    if (isValid) {
      try {
        await authService.login(formData);
        if (onSuccess) onSuccess();
      } catch (error: unknown) {
        throw { msg: (error as Error).message };
      }
    }
  };

  return {
    email: formData.email,
    password: formData.password,
    emailError: formErrors.email,
    passwordError: formErrors.password,
    handleInputChange,
    handleSubmit,
  };
};
