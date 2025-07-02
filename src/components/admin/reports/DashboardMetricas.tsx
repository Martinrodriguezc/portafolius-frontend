import React, { useState } from "react";
import Header from "./Header";
import SeccionEstadisticasGenerales from "./SeccionEstadisticasGenerales";
import SeccionTendenciasTiempo from "./SeccionTendenciasTiempo";
import SeccionRankings from "./SeccionRankings";

const DashboardMetricas: React.FC = () => {
  const [ultimaActualizacion, setUltimaActualizacion] = useState<Date>(new Date());

  const refrescarDatos = () => {
    setUltimaActualizacion(new Date());
    // Este estado se pasará a los componentes hijos para que sepan cuándo refrescar
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
      {/* Header principal */}
      <div className="mb-2">
        <Header 
          title="Dashboard de Métricas" 
          ultimaActualizacion={ultimaActualizacion} 
          onRefrescar={refrescarDatos} 
        />
      </div>
      
      {/* Container principal optimizado para ocupar más ancho */}
      <div className="space-y-6 max-w-none">
        {/* Sección de Rankings - máximo ancho disponible */}
        <div className="w-full">
          <SeccionRankings ultimaActualizacion={ultimaActualizacion} />
        </div>
        
        {/* Sección de Estadísticas Generales - ancho completo */}
        <div className="w-full">
          <SeccionEstadisticasGenerales ultimaActualizacion={ultimaActualizacion} />
        </div>
        
        {/* Sección de Tendencias de Tiempo - ancho completo */}
        <div className="w-full">
          <SeccionTendenciasTiempo ultimaActualizacion={ultimaActualizacion} />
        </div>
      </div>
    </div>
  );
};

export default DashboardMetricas; 