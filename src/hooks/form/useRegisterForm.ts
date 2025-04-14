import { useState } from "react";
import { useFormHook } from "./useFormHook";
import { validateRegisterForm } from "../../utils/validation/forms/formValidation";
import {
  initialRegisterFormState,
  RegisterFormData,
  RegisterFormErrors,
} from "../../types/register";

export const useRegisterForm = (onSuccess?: () => void) => {
  const { formData, formErrors, handleInputChange, handleSubmit } = useFormHook<
    RegisterFormData,
    RegisterFormErrors
  >(initialRegisterFormState, validateRegisterForm, onSuccess);

  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);
  const handlePasswordFocus = () => setShowPasswordRequirements(true);

  return {
    formData,
    formErrors,
    handleInputChange,
    handleSubmit,
    showPasswordRequirements,
    handlePasswordFocus,
  };
};