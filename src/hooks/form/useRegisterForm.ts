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

  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handlePasswordFocus = () => setShowPasswordRequirements(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const { isValid, errors } = validateRegisterForm(formData);

    if (!isValid) {
      const requiredFieldsEmpty =
        !formData.firstName.trim() ||
        !formData.lastName.trim() ||
        !formData.email.trim() ||
        !formData.role.trim() ||
        !formData.password.trim();

      if (requiredFieldsEmpty) {
        setErrorMessage("Debes rellenar todos los campos.");
        return;
      }

      const firstError = Object.values(errors).find((error) => error !== "");
      if (firstError) {
        setErrorMessage(firstError);
        return;
      }
    }

    try {
      await authService.register(formData);
      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      const errMsg = (error as { msg?: string }).msg?.toLowerCase() || "";

      if (errMsg.includes("email") && (errMsg.includes("exist") || errMsg.includes("already"))) {
        setErrorMessage("Ya existe un usuario registrado con ese correo.");
      } else {
        setErrorMessage((error as { msg?: string }).msg || "Error al registrarse.");
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
    errorMessage,
    clearToast: () => setErrorMessage(""),
  };
};
