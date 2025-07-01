import React from "react";
import GaugeComponent from 'react-gauge-component';
import { TasaFinalizacion } from "../../../../hooks/admin/metricsServices";

interface GraficoGaugeProps {
  data: TasaFinalizacion;
}

const GraficoGauge: React.FC<GraficoGaugeProps> = ({ data }) => {
  const { tasa_finalizacion, estudios_evaluados, total_estudios } = data;

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <GaugeComponent
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0.005,
            cornerRadius: 3,
            subArcs: [
              {
                limit: 40,
                color: '#ef4444',
                showTick: true,
                tooltip: {
                  text: 'Nivel bajo'
                }
              },
              {
                limit: 70,
                color: '#eab308',
                showTick: true,
                tooltip: {
                  text: 'Nivel medio'
                }
              },
              {
                color: '#22c55e',
                tooltip: {
                  text: 'Nivel alto'
                }
              }
            ]
          }}
          pointer={{
            color: '#374151',
            length: 0.80,
            width: 15,
            elastic: true,
          }}
          labels={{
            valueLabel: { 
              formatTextValue: value => `${value}%`,
              style: { fontSize: '28px', fill: '#374151' }
            },
            tickLabels: {
              type: 'outer',
              defaultTickValueConfig: { 
                formatTextValue: (value: any) => `${value}%`,
                style: { fontSize: '12px', fill: '#6b7280' }
              },
              ticks: [
                { value: 0 },
                { value: 25 },
                { value: 50 },
                { value: 75 },
                { value: 100 }
              ],
            }
          }}
          value={tasa_finalizacion}
          minValue={0}
          maxValue={100}
        />
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {estudios_evaluados} de {total_estudios} estudios evaluados
          </p>
        </div>
      </div>
    </div>
  );
};

export default GraficoGauge; 