import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "./authServices";

export function useRoleSelection() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.updateUserRole(role);
      if (role === "profesor") {
        navigate("/teacher");
      } else {
        navigate("/student");
      }
    } catch (error) {
      console.error("Error al actualizar rol:", error);
    }
  };
  return { role, setRole, handleSubmit };
}
