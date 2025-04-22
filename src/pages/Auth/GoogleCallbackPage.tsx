import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface GoogleAuthError {
  message: string;
  code?: string;
}

export default function GoogleCallbackPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('Iniciando proceso de callback');
        const urlParams = new URLSearchParams(location.search);
        console.log('URL params:', Object.fromEntries(urlParams));
        
        const token = urlParams.get('token');
        const userDataBase64 = urlParams.get('userData');
        
        console.log('Token recibido:', token);
        console.log('UserData Base64 recibido:', userDataBase64);
        
        if (!token || !userDataBase64) {
          console.error('Datos faltantes:', { token, userDataBase64 });
          throw new Error('No se recibieron los datos de autenticación');
        }

        const userData = JSON.parse(atob(userDataBase64));
        const user = userData.user;
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));

        
        if (user.role === 'google_login') {
          navigate('/select-role');
        } else if (user.role === 'profesor') {
          navigate('/teacher');
        } else if (user.role === 'estudiante') {
          navigate('/student');
        }
      } catch (err: unknown) {
        const error = err as GoogleAuthError;
        setError(error.message || 'Error al procesar la autenticación con Google');
      } finally {
        setLoading(false);
      }
    };
    
    handleCallback();
  }, [location, navigate]);

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
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error de autenticación</h2>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={() => navigate('/login')}
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