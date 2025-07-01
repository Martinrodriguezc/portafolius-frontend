import React, { useEffect } from "react";
import TarjetaMetrica from "./TarjetaMetrica";
import { 
  useTopProfesoresEvaluaciones, 
  useMaterialPorTipo, 
  useUsuariosPorPromedio,
  exportarCSV 
} from "../../../hooks/admin/metricsServices";
import TablaRanking from "./tablas/TablaRanking";
import GraficoBarrasHorizontales from "./graficos/GraficoBarrasHorizontales";
import TablasPromedio from "./tablas/TablasPromedio";

interface SeccionRankingsProps {
  ultimaActualizacion: Date;
}

const SeccionRankings: React.FC<SeccionRankingsProps> = ({ 
  ultimaActualizacion 
}) => {
  const { 
    data: topProfesores, 
    loading: loadingProfesores, 
    error: errorProfesores,
    refetch: refetchProfesores 
  } = useTopProfesoresEvaluaciones();

  const { 
    data: materialPorTipo, 
    loading: loadingMaterial, 
    error: errorMaterial,
    refetch: refetchMaterial
  } = useMaterialPorTipo();

  const { 
    data: usuariosPorPromedio, 
    loading: loadingPromedio, 
    error: errorPromedio,
    refetch: refetchPromedio
  } = useUsuariosPorPromedio();

  useEffect(() => {
    refetchProfesores();
    refetchMaterial();
    refetchPromedio();
  }, [ultimaActualizacion, refetchProfesores, refetchMaterial, refetchPromedio]);

  const exportarTopProfesores = () => {
    if (topProfesores) {
      exportarCSV(topProfesores, 'top_profesores_evaluaciones');
    }
  };

  const exportarMaterialPorTipo = () => {
    if (materialPorTipo) {
      exportarCSV(materialPorTipo, 'material_por_tipo');
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Rankings y Distribuciones</h2>
      <div className="grid gap-4 auto-rows-fr" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}>
        <div className="flex flex-col h-auto">
          <TarjetaMetrica 
            title="Top Profesores con Más Evaluaciones" 
            exportarCSV={exportarTopProfesores}
          >
            {loadingProfesores ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Cargando datos...</p>
              </div>
            ) : errorProfesores ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-500">Error: {errorProfesores}</p>
              </div>
            ) : topProfesores && topProfesores.length > 0 ? (
              <TablaRanking data={topProfesores} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No hay datos disponibles</p>
              </div>
            )}
          </TarjetaMetrica>
        </div>

        <div className="flex flex-col h-auto">
          <TarjetaMetrica 
            title="Material por Tipo" 
            exportarCSV={exportarMaterialPorTipo}
          >
            {loadingMaterial ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Cargando datos...</p>
              </div>
            ) : errorMaterial ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-500">Error: {errorMaterial}</p>
              </div>
            ) : materialPorTipo && materialPorTipo.length > 0 ? (
              <GraficoBarrasHorizontales data={materialPorTipo} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No hay datos disponibles</p>
              </div>
            )}
          </TarjetaMetrica>
        </div>

        <div className="flex flex-col h-auto">
          <TarjetaMetrica title="Usuarios por Promedio de Notas">
            {loadingPromedio ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Cargando datos...</p>
              </div>
            ) : errorPromedio ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-500">Error: {errorPromedio}</p>
              </div>
            ) : usuariosPorPromedio ? (
              <TablasPromedio data={usuariosPorPromedio} />
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

export default SeccionRankings; 