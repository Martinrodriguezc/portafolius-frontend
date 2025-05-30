import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

interface TagPerformanceChartProps {
  data: { tag: string; average_score: number }[];
}

const TagPerformanceChart: React.FC<TagPerformanceChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-gray-500">No hay datos para mostrar</p>
      </div>
    );
  }

  const sorted = [...data].sort((a, b) => a.tag.localeCompare(b.tag));

  const labels = sorted.map(d => d.tag);
  const values = sorted.map(d => d.average_score);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Promedio por etiqueta",
        data: values,
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        borderColor: "rgb(53, 162, 235)",
        pointBackgroundColor: "rgb(53, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(53, 162, 235)",
        fill: true
      }
    ]
  };

  const options: ChartOptions<"radar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1
        },
        angleLines: {
          color: "rgba(0, 0, 0, 0.1)"
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)"
        },
        pointLabels: {
          font: {
            size: 12
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: ctx => `Nota: ${ctx.parsed.r.toFixed(1)}`
        }
      }
    }
  };

  return (
    <Radar data={chartData} options={options} />
  );
};

export default TagPerformanceChart;