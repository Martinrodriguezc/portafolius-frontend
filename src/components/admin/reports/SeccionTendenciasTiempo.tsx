import React, { useEffect } from "react";
import TarjetaMetrica from "./TarjetaMetrica";
import { 
  useUsuariosPorMes, 
  useEstudiosPorMes, 
  useVideoClipsPorMes,
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
    data: videoClipsPorMes, 
    loading: loadingVideos, 
    error: errorVideos,
    refetch: refetchVideos 
  } = useVideoClipsPorMes();

  useEffect(() => {
    refetchUsuarios();
    refetchEstudios();
    refetchVideos();
  }, [ultimaActualizacion, refetchUsuarios, refetchEstudios, refetchVideos]);

  const exportarUsuariosPorMes = () => {
    if (usuariosPorMes) {
      exportarCSV(usuariosPorMes as unknown as Record<string, unknown>[], 'usuarios_por_mes');
    }
  };

  const exportarEstudiosPorMes = () => {
    if (estudiosPorMes) {
      exportarCSV(estudiosPorMes as unknown as Record<string, unknown>[], 'estudios_por_mes');
    }
  };

  const exportarVideosPorMes = () => {
    if (videoClipsPorMes) {
      exportarCSV(videoClipsPorMes as unknown as Record<string, unknown>[], 'video_clips_por_mes');
    }
  };


  // Ícono de cámara de video para el gráfico de videos
  const IconoVideo = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-5 w-5 mr-2 text-red-600" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
      />
    </svg>
  );

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
            title={
              <div className="flex items-center">
                <IconoVideo />
                <span>Videos Subidos por Mes</span>
              </div>
            }
            exportarCSV={exportarVideosPorMes}
          >
            {loadingVideos ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Cargando datos...</p>
              </div>
            ) : errorVideos ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-500">Error: {errorVideos}</p>
              </div>
            ) : videoClipsPorMes && videoClipsPorMes.length > 0 ? (
              <GraficoArea data={videoClipsPorMes} />
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