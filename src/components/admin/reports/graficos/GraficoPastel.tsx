import React from "react";
import { DistribucionUsuarios } from "../../../../hooks/admin/metricsServices";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface GraficoPastelProps {
  data: DistribucionUsuarios[];
}

// Interfaz para el contexto del datalabels
/*interface DataLabelsContext {
  chart: {
    data: {
      datasets: {
        data: number[];
      }[];
    };
  };
}*/

const GraficoPastel: React.FC<GraficoPastelProps> = ({ data }) => {
  // Paleta de colores para los segmentos
  const backgroundColors = [
    'rgba(54, 162, 235, 0.8)',  // azul
    'rgba(75, 192, 192, 0.8)',  // verde
    'rgba(255, 206, 86, 0.8)',  // amarillo
    'rgba(153, 102, 255, 0.8)', // morado
    'rgba(255, 99, 132, 0.8)',  // rojo
    'rgba(255, 159, 64, 0.8)',  // naranja
    'rgba(199, 199, 199, 0.8)'  // gris
  ];

  // Calcular el total de usuarios de manera segura
  let total = 0;
  if (Array.isArray(data) && data.length > 0) {
    // Verificar cada elemento y asegurar que cantidad sea un número
    data.forEach(item => {
      const cantidad = Number(item.cantidad);
      if (!isNaN(cantidad)) {
        total += cantidad;
      } else {
        console.warn(`Valor no numérico encontrado para ${item.role}:`, item.cantidad);
      }
    });
  }

  // Preparar datos calculando porcentajes
  const processedData = data.map((item, index) => {
    const cantidad = Number(item.cantidad);
    const percentage = !isNaN(cantidad) && total > 0 
      ? ((cantidad / total) * 100) 
      : 0;
    return {
      role: item.role,
      cantidad,
      percentage,
      color: backgroundColors[index % backgroundColors.length]
    };
  });

  // Preparar datos para Chart.js
  const chartData = {
    labels: processedData.map(item => item.role),
    datasets: [
      {
        data: processedData.map(item => item.cantidad),
        backgroundColor: processedData.map(item => item.color),
        borderColor: processedData.map(item => item.color.replace('0.8', '1')),
        borderWidth: 1,
      },
    ],
  };

  // Opciones del gráfico
  /*const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // No mostrar la leyenda incluida en el gráfico
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'pie'>) {
            const label = context.label || '';
            const value = context.raw as number || 0;
            // Calcular el total sumando todos los valores
            let datasetTotal = 0;
            if (context.dataset.data) {
              for (const val of context.dataset.data) {
                datasetTotal += Number(val);
              }
            }
            const percentage = datasetTotal > 0 ? Math.round((value / datasetTotal) * 100) : 0;
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
      // Plugin personalizado para mostrar porcentajes en el gráfico
      datalabels: {
        formatter: (value: number, ctx: DataLabelsContext) => {
          let totalValue = 0;
          if (ctx.chart.data.datasets[0].data) {
            for (const val of ctx.chart.data.datasets[0].data) {
              totalValue += Number(val);
            }
          }
          const percentage = totalValue > 0 ? ((value / totalValue) * 100).toFixed(1) + "%" : "0%";
          return percentage;
        },
        color: '#fff',
        font: {
          weight: 'bold',
          size: 10
        }
      }
    },
  };*/

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Contenedor del gráfico - 65% del espacio en escritorio */}
      <div className="w-full md:w-[65%] h-48 md:h-full flex justify-center items-center p-2">
        <div className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64">
          <Pie data={chartData} />
        </div>
      </div>
      
      {/* Leyendas - 35% del espacio en escritorio */}
      <div className="w-full md:w-[35%] overflow-y-auto px-2">
        <div className="space-y-2">
          {processedData.map((item) => {
            return (
              <div key={item.role} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.role}</span>
                    <div className="text-right">
                      <span className="text-gray-700">{item.cantidad}</span>
                      <span className="text-gray-500 ml-2">({item.percentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className="h-1.5 rounded-full" 
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="pt-2 border-t border-gray-200 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total</span>
              <span className="text-sm font-bold">{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficoPastel; 