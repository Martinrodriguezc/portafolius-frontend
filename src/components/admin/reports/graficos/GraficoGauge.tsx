import React from "react";
import { TasaFinalizacion } from "../../../../hooks/admin/metricsServices";

interface GraficoGaugeProps {
  data: TasaFinalizacion;
}

const GraficoGauge: React.FC<GraficoGaugeProps> = ({ data }) => {
  const { tasa_finalizacion, estudios_evaluados, total_estudios } = data;
  
  // Calculamos el ángulo para el indicador del gauge
  const angle = (tasa_finalizacion / 100) * 180;
  
  // Determinamos el color basado en el porcentaje
  let color = "text-red-500";
  if (tasa_finalizacion >= 70) {
    color = "text-green-500";
  } else if (tasa_finalizacion >= 40) {
    color = "text-yellow-500";
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="relative w-48 h-24 overflow-hidden">
        {/* Fondo del gauge */}
        <div className="absolute w-48 h-48 rounded-full border-8 border-gray-200 bottom-0" />
        
        {/* Relleno del gauge basado en el porcentaje */}
        <div 
          className={`absolute w-48 h-48 rounded-full border-8 border-transparent bottom-0`}
          style={{ 
            borderTopColor: color.replace('text-', ''), 
            borderRightColor: color.replace('text-', ''),
            borderLeftColor: color.replace('text-', ''),
            transform: `rotate(${angle - 180}deg)`,
            transformOrigin: 'center bottom',
            transition: 'transform 1s ease-out'
          }}
        />
        
        {/* Indicador central */}
        <div className="absolute bottom-0 left-1/2 w-1 h-20 bg-gray-800 -ml-0.5 origin-bottom" 
          style={{ 
            transform: `rotate(${angle - 90}deg)`,
            transformOrigin: 'center bottom',
            transition: 'transform 1s ease-out'
          }}
        />
        
        {/* Círculo central */}
        <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-gray-800 rounded-full -ml-2 -mb-2" />
      </div>
      
      <div className="mt-6 text-center">
        <div className={`text-3xl font-bold ${color}`}>
          {tasa_finalizacion}%
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {estudios_evaluados} de {total_estudios} estudios evaluados
        </p>
      </div>
      
      <div className="w-48 flex justify-between mt-2">
        <span className="text-xs text-gray-500">0%</span>
        <span className="text-xs text-gray-500">50%</span>
        <span className="text-xs text-gray-500">100%</span>
      </div>
    </div>
  );
};

export default GraficoGauge; 