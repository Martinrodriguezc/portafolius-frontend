import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

export interface DataPoint {
  mes: string
  cantidad: number
}

interface AreaChartProps {
  data: DataPoint[]
}

export default function AreaChart({ data }: AreaChartProps) {
  const sorted = [...data].sort((a, b) => a.mes.localeCompare(b.mes))
  const labels = sorted.map(d => d.mes)
  const values = sorted.map(d => d.cantidad)
  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        tension: 0.3,
        fill: true,
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
        ? <Line data={chartData} options={options} />
        : <div className="flex items-center justify-center h-full"><p>No hay datos suficientes</p></div>
      }
    </div>
  )
}