import { authService } from '../auth/authServices';

export interface AdminCheckResult {
  isAdmin: boolean;
  error?: string;
  currentUser?: {
    id: string;
    email: string;
    role: string;
  };
}

export const checkAdminStatus = (): AdminCheckResult => {
  const currentUser = authService.getCurrentUser();

  if (!currentUser) {
    return {
      isAdmin: false,
      error: 'No hay sesión activa'
    };
  }

  if (currentUser.role !== 'admin') {
    return {
      isAdmin: false,
      error: 'El usuario no tiene permisos de administrador'
    };
  }

  return {
    isAdmin: true,
    currentUser: {
      id: currentUser.id,
      email: currentUser.email,
      role: currentUser.role
    }
  };
}; 