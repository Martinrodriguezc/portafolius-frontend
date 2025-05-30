import React from "react";
import { DatosPorMes, formatearMes } from "../../../../hooks/admin/metricsServices";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TooltipItem } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

interface GraficoLineaProps {
  data: DatosPorMes[];
}

const GraficoLinea: React.FC<GraficoLineaProps> = ({ data }) => {
  // Ordenamos los datos cronológicamente
  const sortedData = [...data].sort((a, b) => a.mes.localeCompare(b.mes));

  // Procesar datos para Chart.js
  const labels = sortedData.map(item => formatearMes(item.mes));
  const valores = sortedData.map(item => item.cantidad);

  // Configuración del dataset
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Usuarios',
        data: valores,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
        fill: true,
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgb(53, 162, 235)',
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
            return `Usuarios: ${context.parsed.y}`;
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

export default GraficoLinea; 