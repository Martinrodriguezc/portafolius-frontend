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
    <div className="space-y-8">
      <Header 
        title="Dashboard de Métricas" 
        ultimaActualizacion={ultimaActualizacion} 
        onRefrescar={refrescarDatos} 
      />
      
      <SeccionEstadisticasGenerales ultimaActualizacion={ultimaActualizacion} />
      
      <SeccionTendenciasTiempo ultimaActualizacion={ultimaActualizacion} />
      
      <SeccionRankings ultimaActualizacion={ultimaActualizacion} />
    </div>
  );
};

export default DashboardMetricas; 