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
        
      </div>
    </div>
  );
} 