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

    // Si el usuario no es profesor, redirigir a la página principal
    if (user.role !== "profesor" && user.role !== "admin") {
      navigate("/home");
      return;
    }

    // Si el profesor no está autorizado, redirigir a la página de no autorizado
    if (user.role === "profesor" && user.autorizado === false) {
      navigate("/teacher/unauthorized");
    }
  }, [navigate]);

  return null;
} 