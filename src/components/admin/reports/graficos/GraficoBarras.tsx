import React from "react";
import { DatosPorMes, formatearMes } from "../../../../hooks/admin/metricsServices";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TooltipItem } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface GraficoBarrasProps {
  data: DatosPorMes[];
}

const GraficoBarras: React.FC<GraficoBarrasProps> = ({ data }) => {
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
        label: 'Estudios',
        data: valores,
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(53, 162, 235, 0.9)',
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
          title: function(context: TooltipItem<'bar'>[]) {
            return context[0].label;
          },
          label: function(context: TooltipItem<'bar'>) {
            return `Estudios: ${context.parsed.y}`;
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
        <Bar data={chartData} options={options} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No hay datos suficientes</p>
        </div>
      )}
    </div>
  );
};

export default GraficoBarras; 