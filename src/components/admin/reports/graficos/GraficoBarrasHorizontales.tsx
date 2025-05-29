import React from "react";
import { MaterialPorTipo } from "../../../../hooks/admin/metricsServices";

interface GraficoBarrasHorizontalesProps {
  data: MaterialPorTipo[];
}

const GraficoBarrasHorizontales: React.FC<GraficoBarrasHorizontalesProps> = ({ data }) => {
  // Ordenamos los datos por cantidad (descendente)
  const sortedData = [...data].sort((a, b) => b.cantidad - a.cantidad);
  
  // Encontramos el valor máximo para escalar el gráfico
  const maxValue = Math.max(...sortedData.map(item => item.cantidad));
  
  // Mapa de colores por tipo de material
  const coloresPorTipo: Record<string, string> = {
    document: "bg-blue-500",
    video: "bg-red-500",
    link: "bg-green-500",
    // Colores para otros tipos que pudieran existir
    default: "bg-gray-500"
  };

  // Función para obtener el nombre formateado del tipo
  const formatearTipo = (tipo: string): string => {
    const tiposFormateados: Record<string, string> = {
      document: "Documento",
      video: "Video",
      link: "Enlace"
    };
    
    return tiposFormateados[tipo] || tipo.charAt(0).toUpperCase() + tipo.slice(1);
  };
  
  return (
    <div className="h-full py-2">
      <div className="h-full flex flex-col justify-between space-y-3">
        {sortedData.map((item) => {
          // Calculamos el ancho proporcional de la barra
          const ancho = (item.cantidad / maxValue) * 100;
          const colorClase = coloresPorTipo[item.tipo] || coloresPorTipo.default;
          
          return (
            <div key={item.tipo} className="flex items-center">
              <div className="w-24 text-sm text-gray-700 truncate pr-2">
                {formatearTipo(item.tipo)}
              </div>
              
              <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
                <div 
                  className={`h-full ${colorClase} rounded flex items-center transition-all duration-500 ease-out`}
                  style={{ width: `${ancho}%` }}
                >
                  {ancho > 20 && (
                    <span className="text-white text-xs font-medium ml-2">
                      {item.cantidad}
                    </span>
                  )}
                </div>
              </div>
              
              {ancho <= 20 && (
                <span className="text-gray-500 text-xs font-medium ml-2">
                  {item.cantidad}
                </span>
              )}
            </div>
          );
        })}
      </div>
      
      {sortedData.length === 0 && (
        <div className="h-full flex items-center justify-center text-gray-500">
          No hay datos disponibles
        </div>
      )}
    </div>
  );
};

export default GraficoBarrasHorizontales; 