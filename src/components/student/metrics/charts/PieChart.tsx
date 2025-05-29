import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

export interface Distribution {
  categoria: string
  cantidad: number
}

interface PieChartProps {
  data: Distribution[]
}

export default function PieChart({ data }: PieChartProps) {
  const total = data.reduce((sum, d) => sum + d.cantidad, 0) || 1
  const chartData = {
    labels: data.map(d => d.categoria),
    datasets: [
      {
        data: data.map(d => d.cantidad),
        backgroundColor: ["#36A2EB","#4BC0C0","#FFCE56","#9966FF","#FF6384"],
        borderWidth: 1
      }
    ]
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  }
  return (
    <div className="h-full flex flex-col md:flex-row">
      <div className="w-full md:w-2/3 p-2">
        <Pie data={chartData} options={options} />
      </div>
      <div className="w-full md:w-1/3 p-2 overflow-y-auto">
        {data.map((d, i) => {
          const pct = ((d.cantidad / total) * 100).toFixed(1)
          return (
            <div key={d.categoria} className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartData.datasets[0].backgroundColor[i] }} />
              <span className="ml-2 flex-1 text-sm">{d.categoria}</span>
              <span className="text-sm">{d.cantidad} ({pct}%)</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}