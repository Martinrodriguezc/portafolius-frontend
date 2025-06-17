import { AxiosError } from 'axios';
import { authService } from '../hooks/auth/authServices';

export interface AuthError {
  isAuthError: boolean;
  shouldRedirect: boolean;
  message: string;
}

interface ErrorWithResponse {
  response?: {
    status: number;
  };
}

/**
 * Maneja errores de autenticación de manera centralizada
 * @param error - Error de axios o cualquier error con response.status
 * @returns AuthError con información sobre cómo manejar el error
 */
export const handleAuthError = (error: AxiosError | ErrorWithResponse | Error): AuthError => {
  const status = (error as ErrorWithResponse)?.response?.status;
  
  switch (status) {
    case 401:
      // Token inválido o expirado - limpiar sesión y redirigir
      authService.logout();
      return {
        isAuthError: true,
        shouldRedirect: true,
        message: 'Sesión expirada. Serás redirigido al login.'
      };
    
    case 403:
      // Sin permisos - no redirigir, solo mostrar error
      return {
        isAuthError: true,
        shouldRedirect: false,
        message: 'No tienes permisos para realizar esta acción.'
      };
    
    default:
      return {
        isAuthError: false,
        shouldRedirect: false,
        message: (error as Error)?.message || 'Error desconocido'
      };
  }
};

/**
 * Ejecuta redirección al login de manera segura
 */
export const redirectToLogin = (): void => {
  // Usar setTimeout para evitar problemas con React state updates
  setTimeout(() => {
    window.location.href = '/login';
  }, 100);
};

/**
 * Verifica si el token JWT está presente y es válido
 * @returns true si hay token, false si no
 */
export const isAuthenticated = (): boolean => {
  const token = authService.getToken();
  return !!token;
};

/**
 * Crea headers estándar para peticiones autenticadas
 * @returns Headers con Authorization y Content-Type
 */
export const createAuthHeaders = (): Record<string, string> => {
  const token = authService.getToken();
  
  if (!token) {
    throw new Error('No autorizado');
  }
  
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}; 