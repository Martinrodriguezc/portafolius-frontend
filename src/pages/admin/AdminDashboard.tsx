import React from "react";
import { PageHeader } from "../../components/admin/dashboard/Header";
import { StatsPanel } from "../../components/admin/dashboard/StatsPanel";
import { QuickActions } from "../../components/admin/dashboard/QuickActions";

interface StatsData {
  userCount: number;
  courseCount: number;
  evalCount: number;
}

export default function AdminDashboard(): React.ReactElement {
  // Datos de ejemplo para las estadísticas
  const statsData: StatsData = {
    userCount: 256,
    courseCount: 42,
    evalCount: 1358
  };

  return (

      <div className="flex-1 overflow-y-auto">
        <div className="p-8 md:p-10 max-w-7xl mx-auto space-y-8">
          <PageHeader />
          <StatsPanel 
            userCount={statsData.userCount}
            courseCount={statsData.courseCount}
            evalCount={statsData.evalCount}
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