import { useState } from "react";
import { authService } from "../auth/authServices";
import type { RegisterFormData } from "../../types/register";

interface StudentFormReturn {
  form: RegisterFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
  error: string;
  showPasswordRequirements: boolean;
}

export function useStudentForm(): StudentFormReturn {
  const [form, setForm] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    role: "estudiante",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (name === "password" && value.length >= 8) {
      setShowPasswordRequirements(false);
    }
  }

  async function handleSubmit() {
    setError("");
    const { firstName, lastName, email, password } = form;
    if (!firstName || !lastName || !email || !password) {
      setError("Todos los campos son requeridos");
      return;
    }
    if (password.length < 8) {
      setShowPasswordRequirements(true);
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    try {
      await authService.register(form);
    } catch (err: any) {
      setError(err.msg ?? "Error al crear estudiante");
    }
  }

  return {
    form,
    handleChange,
    handleSubmit,
    error,
    showPasswordRequirements,
  };
}
