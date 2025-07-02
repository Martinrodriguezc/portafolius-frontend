import React, { useState, useEffect } from 'react';
import { useCurrentUser } from '../hooks/user/useCurrentUser';
import { AdminModeContextType, AdminModeProviderProps, AdminModeContext } from './AdminModeContextUtils';

export const AdminModeProvider: React.FC<AdminModeProviderProps> = ({ children }) => {
  const user = useCurrentUser();
  const [isTeacherMode, setIsTeacherMode] = useState(() => {
    // Recuperar el modo guardado del localStorage, por defecto admin
    return localStorage.getItem('adminViewMode') === 'teacher';
  });

  // Solo los admins pueden cambiar de modo
  const canSwitchMode = user?.role === 'admin';

  // Si el usuario no es admin, forzar modo admin (esto no debería pasar, pero por seguridad)
  useEffect(() => {
    if (user && user.role !== 'admin' && isTeacherMode) {
      setIsTeacherMode(false);
      localStorage.removeItem('adminViewMode');
    }
  }, [user, isTeacherMode]);

  const toggleMode = () => {
    if (!canSwitchMode) return;
    
    const newMode = !isTeacherMode;
    setIsTeacherMode(newMode);
    
    // Guardar en localStorage
    if (newMode) {
      localStorage.setItem('adminViewMode', 'teacher');
    } else {
      localStorage.removeItem('adminViewMode');
    }
  };

  const currentViewRole: 'admin' | 'teacher' = isTeacherMode ? 'teacher' : 'admin';

  const value: AdminModeContextType = {
    isTeacherMode,
    toggleMode,
    currentViewRole,
    canSwitchMode
  };

  return (
    <AdminModeContext.Provider value={value}>
      {children}
    </AdminModeContext.Provider>
  );
}; 