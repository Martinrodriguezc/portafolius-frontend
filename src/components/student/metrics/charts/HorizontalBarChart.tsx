export interface CategoryCount {
  categoria: string
  cantidad: number
}

interface HorizontalBarChartProps {
  data: CategoryCount[]
}

export default function HorizontalBarChart({ data }: HorizontalBarChartProps) {
  const sorted = [...data].sort((a, b) => b.cantidad - a.cantidad)
  const max = Math.max(...sorted.map(d => d.cantidad), 1)
  return (
    <div className="h-full py-2">
      {sorted.map(item => {
        const pct = (item.cantidad / max) * 100
        return (
          <div key={item.categoria} className="flex items-center mb-2">
            <div className="w-24 text-sm truncate pr-2">{item.categoria}</div>
            <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
              <div className="h-full bg-blue-500 rounded" style={{ width: `${pct}%` }}>
                {pct > 20 && <span className="text-white text-xs font-medium ml-2">{item.cantidad}</span>}
              </div>
            </div>
            {pct <= 20 && <span className="text-gray-500 text-xs font-medium ml-2">{item.cantidad}</span>}
          </div>
        )
      })}
      {sorted.length === 0 && <div className="h-full flex items-center justify-center">No hay datos</div>}
    </div>
  )
}