import React from "react";
import { Profesor } from "../../../../hooks/admin/metricsServices";

interface TablaRankingProps {
  data: Profesor[];
}

const TablaRanking: React.FC<TablaRankingProps> = ({ data }) => {
  // Encontramos el valor máximo para escalar las barras
  const maxEvaluaciones = Math.max(...data.map(item => item.evaluaciones));
  
  return (
    <div className="h-full overflow-y-auto">
      <table className="w-full">
        <thead className="text-xs text-gray-700">
          <tr>
            <th className="py-2 pl-2 text-left">#</th>
            <th className="py-2 text-left">Profesor</th>
            <th className="py-2 text-right pr-4">Evaluaciones</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {data.map((profesor, index) => {
            // Calculamos el ancho proporcional de la barra
            const barWidth = (profesor.evaluaciones / maxEvaluaciones) * 100;
            
            return (
              <tr 
                key={profesor.id} 
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
              >
                <td className="py-2 pl-2 font-medium">
                    <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold mr-2">
                      {index + 1}
                    </div>
                </td>
                <td className="py-2">
                  <div className="flex items-center">
                    <span className="truncate">{profesor.nombre}</span>
                  </div>
                </td>
                <td className="py-2 pr-4">
                  <div className="flex flex-col items-end">
                    <span className="mb-1">{profesor.evaluaciones}</span>
                    <div className="h-2 bg-gray-200 rounded overflow-hidden w-24">
                      <div 
                        className="h-full bg-sky-500 rounded"
                        style={{width: `${barWidth}%`}}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
          
          {data.length === 0 && (
            <tr>
              <td colSpan={3} className="py-10 text-center text-gray-500">
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaRanking; 