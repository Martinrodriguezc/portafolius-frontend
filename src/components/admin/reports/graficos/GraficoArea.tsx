import React from "react";
import { DatosPorMes, formatearMes } from "../../../../hooks/admin/metricsServices";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TooltipItem } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

interface GraficoAreaProps {
  data: DatosPorMes[];
}

const GraficoArea: React.FC<GraficoAreaProps> = ({ data }) => {
  // Ordenamos los datos cronológicamente
  const sortedData = [...data].sort((a, b) => a.mes.localeCompare(b.mes));
  
  // Procesar datos para Chart.js
  const labels = sortedData.map(item => formatearMes(item.mes));
  const valores = sortedData.map(item => item.cantidad);

  // Configuración del dataset con colores para videos (rojo/negro)
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Videos',
        data: valores,
        borderColor: 'rgb(229, 57, 53)',  // Rojo para videos
        backgroundColor: 'rgba(229, 57, 53, 0.5)',  // Rojo con transparencia
        tension: 0.3,
        fill: true,
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgb(229, 57, 53)',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function(context: TooltipItem<'line'>[]) {
            return context[0].label;
          },
          label: function(context: TooltipItem<'line'>) {
            return `Videos subidos: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          precision: 0
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
  };

  return (
    <div className="h-full">
      {sortedData.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No hay datos suficientes</p>
        </div>
      )}
    </div>
  );
};

export default GraficoArea; 