import { createContext, useContext } from 'react';

export interface AdminModeContextType {
  isTeacherMode: boolean;
  toggleMode: () => void;
  currentViewRole: 'admin' | 'teacher';
  canSwitchMode: boolean;
}

export interface AdminModeProviderProps {
  children: React.ReactNode;
}

export const AdminModeContext = createContext<AdminModeContextType | null>(null);

export const useAdminMode = (): AdminModeContextType => {
  const context = useContext(AdminModeContext);
  if (!context) {
    throw new Error('useAdminMode debe ser usado dentro de AdminModeProvider');
  }
  return context;
}; 