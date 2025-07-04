import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "./authServices";

export function useTeacherAuthorization() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();
    
    // Si no hay usuario o no hay token, redirigir al login
    if (!user || !authService.getToken()) {
      navigate("/login");
      return;
    }

    // Permitir admin (sin restricciones adicionales) y profesores
    if (user.role !== "profesor" && user.role !== "admin") {
      navigate("/home");
      return;
    }

    // Si es admin, permitir acceso completo a rutas de profesor
    if (user.role === "admin") {
      return;
    }

    // Si el profesor no está autorizado, redirigir a la página de no autorizado
    if (user.role === "profesor" && user.autorizado === false) {
      navigate("/teacher/unauthorized");
    }
  }, [navigate]);

  return null;
} 