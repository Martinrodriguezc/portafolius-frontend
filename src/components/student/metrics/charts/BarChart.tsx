import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export interface DataPoint {
  mes: string
  cantidad: number
}

interface BarChartProps {
  data: DataPoint[]
}

export default function BarChart({ data }: BarChartProps) {
  const sorted = [...data].sort((a, b) => a.mes.localeCompare(b.mes))
  const labels = sorted.map(d => d.mes)
  const values = sorted.map(d => d.cantidad)
  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        borderWidth: 1
      }
    ]
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true },
      x: { grid: { display: false } }
    }
  }
  return (
    <div className="h-full">
      {sorted.length > 0
        ? <Bar data={chartData} options={options} />
        : <div className="flex items-center justify-center h-full"><p>No hay datos suficientes</p></div>
      }
    </div>
  )
}