import React from 'react';
import { Switch } from '../Switch/Switch';
import { useAdminMode } from '../../../contexts/AdminModeContextUtils';
import { User, Settings } from 'lucide-react';

interface RoleSwitcherProps {
  className?: string;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ className = "" }) => {
  const { isTeacherMode, toggleMode, canSwitchMode } = useAdminMode();

  if (!canSwitchMode) {
    return null; // No mostrar el switch si el usuario no puede cambiar de modo
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="flex items-center space-x-2">
        <Settings className={`h-4 w-4 transition-colors ${!isTeacherMode ? 'text-blue-600' : 'text-gray-400'}`} />
        <span className={`text-sm font-medium transition-colors ${!isTeacherMode ? 'text-blue-600' : 'text-gray-600'}`}>
          Admin
        </span>
      </div>
      
      <Switch
        checked={isTeacherMode}
        onCheckedChange={toggleMode}
        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-blue-600"
      />
      
      <div className="flex items-center space-x-2">
        <User className={`h-4 w-4 transition-colors ${isTeacherMode ? 'text-green-600' : 'text-gray-400'}`} />
        <span className={`text-sm font-medium transition-colors ${isTeacherMode ? 'text-green-600' : 'text-gray-600'}`}>
          Profesor
        </span>
      </div>
    </div>
  );
}; 