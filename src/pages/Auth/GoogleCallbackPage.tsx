import { useNavigate } from "react-router-dom";
import { useGoogleAuthCallback } from "../../hooks/auth/useGoogleAuthCallback";

export default function GoogleCallbackPage() {
  const { loading, error } = useGoogleAuthCallback();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Procesando autenticación...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error de autenticación
          </h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-lg">Redirigiendo...</p>
      </div>
    </div>
  );
}
