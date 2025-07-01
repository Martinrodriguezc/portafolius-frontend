import React, { useEffect } from "react";
import TarjetaMetrica from "./TarjetaMetrica";
import { useUsuariosPorRol, useTasaFinalizacionEstudios, exportarCSV } from "../../../hooks/admin/metricsServices";
import GraficoPastel from "./graficos/GraficoPastel";
import GraficoGauge from "./graficos/GraficoGauge";

interface SeccionEstadisticasGeneralesProps {
  ultimaActualizacion: Date;
}

const SeccionEstadisticasGenerales: React.FC<SeccionEstadisticasGeneralesProps> = ({ 
  ultimaActualizacion 
}) => {
  const { 
    data: usuariosPorRol, 
    loading: loadingUsuarios, 
    error: errorUsuarios,
    refetch: refetchUsuarios 
  } = useUsuariosPorRol();

  const { 
    data: tasaFinalizacion, 
    loading: loadingTasa, 
    error: errorTasa,
    refetch: refetchTasa 
  } = useTasaFinalizacionEstudios();

  useEffect(() => {
    refetchUsuarios();
    refetchTasa();
  }, [ultimaActualizacion, refetchUsuarios, refetchTasa]);

  const exportarUsuariosPorRol = () => {
    if (usuariosPorRol) {
      exportarCSV(usuariosPorRol, 'usuarios_por_rol');
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Estadísticas Generales</h2>
      
      {/* Contenedor principal optimizado para ocupar mejor el ancho */}
      <div className="grid gap-4 auto-rows-fr" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}>
        {/* Tarjeta 1 - Distribución de Usuarios por Rol */}
        <div className="flex flex-col h-auto">
          <TarjetaMetrica 
            title="Distribución de Usuarios por Rol" 
            exportarCSV={exportarUsuariosPorRol}
          >
            {loadingUsuarios ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Cargando datos...</p>
              </div>
            ) : errorUsuarios ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-500">Error: {errorUsuarios}</p>
              </div>
            ) : usuariosPorRol && usuariosPorRol.length > 0 ? (
              <GraficoPastel data={usuariosPorRol} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No hay datos disponibles</p>
              </div>
            )}
          </TarjetaMetrica>
        </div>

        {/* Tarjeta 2 - Tasa de Finalización de Estudios */}
        <div className="flex flex-col h-auto">
          <TarjetaMetrica title="Tasa de Finalización de Estudios">
            {loadingTasa ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Cargando datos...</p>
              </div>
            ) : errorTasa ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-500">Error: {errorTasa}</p>
              </div>
            ) : tasaFinalizacion ? (
              <GraficoGauge data={tasaFinalizacion} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No hay datos disponibles</p>
              </div>
            )}
          </TarjetaMetrica>
        </div>
      </div>
    </div>
  );
};

export default SeccionEstadisticasGenerales; 