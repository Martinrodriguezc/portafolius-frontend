import React from "react";
import DashboardMetricas from "../../components/admin/reports/DashboardMetricas";

export default function Reports(): React.ReactElement {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-8 md:p-10 max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Dashboard de Métricas y Reportes
          </h1>
          <p className="text-gray-500">Visualiza estadísticas y genera informes</p>
        </div>
        
        <DashboardMetricas />
      </div>
    </div>
  );
}