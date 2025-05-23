import React from "react";
import { PageHeader } from "../../components/admin/dashboard/Header";
import { StatsPanel } from "../../components/admin/dashboard/StatsPanel";
import { QuickActions } from "../../components/admin/dashboard/QuickActions";
import { useDashboardStats } from "../../hooks/admin/dashboardServices";

export default function AdminDashboard(): React.ReactElement {
  const { stats, loading, error } = useDashboardStats();

  // Datos predeterminados para cuando la API no responde
  const defaultStats = {
    users: {
      total: 0,
      newLastWeek: 0,
      growthPercentage: 0,
      roleDistribution: []
    },
    evaluations: {
      total: 0,
      newLastWeek: 0,
      growthPercentage: 0
    },
    studies: {
      total: 0,
      newLastWeek: 0,
      growthPercentage: 0,
      statusDistribution: []
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-gray-500">Cargando datos del dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">
          Error al cargar los datos: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-8 md:p-10 max-w-7xl mx-auto space-y-8">
        <PageHeader />
        <StatsPanel 
          users={stats?.users || defaultStats.users}
          evaluations={stats?.evaluations || defaultStats.evaluations}
          studies={stats?.studies || defaultStats.studies}
        />
        <QuickActions />
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Actividad Reciente</h2>
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-start pb-4 border-b last:border-b-0 last:pb-0">
                  <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center mr-3">
                    <span className="text-sky-700 font-semibold">
                      {String.fromCharCode(64 + item)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Actividad {item}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item === 1 ? "Hace 5 minutos" : 
                       item === 2 ? "Hace 25 minutos" :
                       item === 3 ? "Hace 2 horas" :
                       item === 4 ? "Hace 5 horas" : "Ayer"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 