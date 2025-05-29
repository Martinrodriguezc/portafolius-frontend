import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function useGoogleAuthCallback() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);

        const token = urlParams.get("token");
        const userDataBase64 = urlParams.get("userData");

        if (!token || !userDataBase64) {
          throw new Error("No se recibieron los datos de autenticación");
        }

        const userData = JSON.parse(atob(userDataBase64));
        const user = userData.user;

        localStorage.setItem("auth_token", token);
        localStorage.setItem("user_data", JSON.stringify(user));

        if (user.role === "google_login") {
          navigate("/select-role");
        } else if (user.role === "profesor") {
          navigate("/teacher");
        } else if (user.role === "estudiante") {
          navigate("/student");
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Error desconocido al procesar autenticación");
        }
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [location, navigate]);

  return { loading, error };
}
