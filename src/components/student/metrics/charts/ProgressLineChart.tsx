import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
)

interface ProgressLineChartProps {
  data: { fecha: string; nota: number }[]
}

const ProgressLineChart: React.FC<ProgressLineChartProps> = ({ data }) => {
  const sorted = [...data].sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  )

  if (sorted.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No hay datos suficientes</p>
      </div>
    )
  }

  const labels = sorted.map((d) =>
    new Date(d.fecha).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
  )
  const valores = sorted.map((d) => d.nota)

  const chartData = {
    labels,
    datasets: [
      {
        label: "Calificación",
        data: valores,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.3)",
        tension: 0.3,
        fill: false,
        pointBackgroundColor: "white",
        pointBorderColor: "rgb(53, 162, 235)",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        title: {
          display: true,
          text: "Fecha"
        }
      },
      y: {
        beginAtZero: true,
        max: 10,
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        ticks: { precision: 1 },
        title: {
          display: true,
          text: "Calificaciones"
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (ctx: TooltipItem<"line">[]) => ctx[0].label as string,
          label: (ctx: TooltipItem<"line">) =>
            `Nota: ${ctx.parsed.y.toFixed(1)}`
        }
      },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value: number) => value.toFixed(1),
        font: { weight: "bold" }
      }
    }
  }

  return <Line data={chartData} options={options} />
}

export default ProgressLineChart