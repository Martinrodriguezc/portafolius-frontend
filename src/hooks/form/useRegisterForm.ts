import { useState } from "react";
import { useFormHook } from "./useFormHook";
import { validateRegisterForm } from "../../utils/validation/forms/formValidation";
import {
  initialRegisterFormState,
  RegisterFormData,
  RegisterFormErrors,
} from "../../types/form/Register";
import { authService } from "../auth/authServices";

export const useRegisterForm = (onSuccess?: () => void) => {
  const { formData, formErrors, handleInputChange } = useFormHook<
    RegisterFormData,
    RegisterFormErrors
  >(initialRegisterFormState, validateRegisterForm, onSuccess);

  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const handlePasswordFocus = () => setShowPasswordRequirements(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isValid, errors } = validateRegisterForm(formData);

    if (isValid) {
      try {
        await authService.register(formData);
        if (onSuccess) {
          onSuccess();
        }
      } catch (error: unknown) {
        setToastMessage(
          (error as { msg: string }).msg || "Error al registrarse"
        );
      }
    } else {
      const firstError = Object.values(errors).find((error) => error !== "");
      if (firstError) {
        setToastMessage(firstError);
      }
    }
  };

  return {
    formData,
    formErrors,
    handleInputChange,
    handleSubmit,
    showPasswordRequirements,
    handlePasswordFocus,
    toastMessage,
    clearToast: () => setToastMessage(""),
  };
};
