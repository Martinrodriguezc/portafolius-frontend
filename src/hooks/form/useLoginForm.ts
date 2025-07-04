import { useState } from "react";
import { useFormHook } from "./useFormHook";
import { validateLoginForm } from "../../utils/validation/forms/formValidation";
import {
  initialLoginFormState,
  LoginFormData,
  LoginFormErrors,
} from "../../types/form/Login";
import { authService } from "../auth/authServices";

export const useLoginForm = (onSuccess?: () => void) => {
  const { formData, formErrors, handleInputChange } = useFormHook<
    LoginFormData,
    LoginFormErrors
  >(initialLoginFormState, validateLoginForm, onSuccess);

  const [generalError, setGeneralError] = useState<string>("");
  const [formIncompleteError, setFormIncompleteError] = useState<string>("");
  const [unauthorizedTeacherMessage, setUnauthorizedTeacherMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError("");
    setFormIncompleteError("");
    setUnauthorizedTeacherMessage("");

    const { isValid, errors } = validateLoginForm(formData);

    if (!isValid) {
      if (
        errors.email === "required" ||
        errors.password === "required" ||
        !formData.email.trim() ||
        !formData.password.trim()
      ) {
        setFormIncompleteError("Debes rellenar todos los campos.");
      }
      return;
    }

    try {
      const result = await authService.login(formData);
      // Verificar si es un profesor no autorizado
      if (result.msg === "Tu cuenta aún no ha sido autorizada por el administrador.") {
        setUnauthorizedTeacherMessage("Tu cuenta ha sido creada exitosamente, pero aún no ha sido autorizada por un administrador de la plataforma. Una vez que sea aprobada, podrás acceder a todas las funcionalidades del sistema.");
        return;
      }
      
      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      console.error("Error al iniciar sesión:", error);
      setGeneralError("Email o contraseña incorrectos.");
    }
  };

  const handleGoogleLogin = () => {
    authService.initiateGoogleLogin();
    console.log("Iniciando Google Login");
  };

  return {
    email: formData.email,
    password: formData.password,
    emailError: formErrors.email,
    passwordError: formErrors.password,
    generalError,
    formIncompleteError,
    unauthorizedTeacherMessage,
    handleInputChange,
    handleSubmit,
    handleGoogleLogin,
  };
};
