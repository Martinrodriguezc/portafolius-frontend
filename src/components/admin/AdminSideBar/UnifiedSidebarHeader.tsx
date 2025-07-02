import React from "react";
import { useAdminMode } from "../../../contexts/AdminModeContextUtils";
import { RoleSwitcher } from "../../common/RoleSwitcher/RoleSwitcher";

export const UnifiedSidebarHeader: React.FC = () => {
  const { currentViewRole } = useAdminMode();
  
  const title = currentViewRole === 'teacher' ? 'Panel de Profesor' : 'Panel de Administrador';

  return (
    <div className="p-4 border-b space-y-3">
      <div>
        <h2 className="text-xl font-bold text-sky-900">PortafoliUS</h2>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
      <RoleSwitcher />
    </div>
  );
}; 