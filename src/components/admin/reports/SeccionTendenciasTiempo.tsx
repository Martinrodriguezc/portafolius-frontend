import React, { useEffect } from "react";
import TarjetaMetrica from "./TarjetaMetrica";
import { 
  useUsuariosPorMes, 
  useEstudiosPorMes, 
  useMensajesPorMes,
  exportarCSV 
} from "../../../hooks/admin/metricsServices";
import GraficoLinea from "./graficos/GraficoLinea";
import GraficoBarras from "./graficos/GraficoBarras";
import GraficoArea from "./graficos/GraficoArea";

interface SeccionTendenciasTiempoProps {
  ultimaActualizacion: Date;
}

const SeccionTendenciasTiempo: React.FC<SeccionTendenciasTiempoProps> = ({ 
  ultimaActualizacion 
}) => {
  const { 
    data: usuariosPorMes, 
    loading: loadingUsuarios, 
    error: errorUsuarios,
    refetch: refetchUsuarios 
  } = useUsuariosPorMes();

  const { 
    data: estudiosPorMes, 
    loading: loadingEstudios, 
    error: errorEstudios,
    refetch: refetchEstudios 
  } = useEstudiosPorMes();

  const { 
    data: mensajesPorMes, 
    loading: loadingMensajes, 
    error: errorMensajes,
    refetch: refetchMensajes 
  } = useMensajesPorMes();

  useEffect(() => {
    refetchUsuarios();
    refetchEstudios();
    refetchMensajes();
  }, [ultimaActualizacion, refetchUsuarios, refetchEstudios, refetchMensajes]);

  const exportarUsuariosPorMes = () => {
    if (usuariosPorMes) {
      exportarCSV(usuariosPorMes, 'usuarios_por_mes');
    }
  };

  const exportarEstudiosPorMes = () => {
    if (estudiosPorMes) {
      exportarCSV(estudiosPorMes, 'estudios_por_mes');
    }
  };

  const exportarMensajesPorMes = () => {
    if (mensajesPorMes) {
      exportarCSV(mensajesPorMes, 'mensajes_por_mes');
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Tendencias en el Tiempo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col h-auto">
          <TarjetaMetrica 
            title="Usuarios Registrados por Mes" 
            exportarCSV={exportarUsuariosPorMes}
          >
            {loadingUsuarios ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Cargando datos...</p>
              </div>
            ) : errorUsuarios ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-500">Error: {errorUsuarios}</p>
              </div>
            ) : usuariosPorMes && usuariosPorMes.length > 0 ? (
              <GraficoLinea data={usuariosPorMes} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No hay datos disponibles</p>
              </div>
            )}
          </TarjetaMetrica>
        </div>

        <div className="flex flex-col h-auto">
          <TarjetaMetrica 
            title="Estudios Creados por Mes" 
            exportarCSV={exportarEstudiosPorMes}
          >
            {loadingEstudios ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Cargando datos...</p>
              </div>
            ) : errorEstudios ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-500">Error: {errorEstudios}</p>
              </div>
            ) : estudiosPorMes && estudiosPorMes.length > 0 ? (
              <GraficoBarras data={estudiosPorMes} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No hay datos disponibles</p>
              </div>
            )}
          </TarjetaMetrica>
        </div>

        <div className="flex flex-col h-auto">
          <TarjetaMetrica 
            title="Mensajes Enviados por Mes" 
            exportarCSV={exportarMensajesPorMes}
          >
            {loadingMensajes ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Cargando datos...</p>
              </div>
            ) : errorMensajes ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-500">Error: {errorMensajes}</p>
              </div>
            ) : mensajesPorMes && mensajesPorMes.length > 0 ? (
              <GraficoArea data={mensajesPorMes} />
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

export default SeccionTendenciasTiempo; 