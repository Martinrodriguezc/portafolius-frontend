export interface UserPerformance {
  id: number
  nombre: string
  promedio: number
  evaluaciones: number
}

interface PerformanceTableProps {
  top: UserPerformance[]
  bottom: UserPerformance[]
}

function Stars({ value }: { value: number }) {
  const stars = (value / 10) * 5
  const full = Math.floor(stars)
  const half = stars - full >= 0.5
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) {
          return (
            <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921…" />
            </svg>
          )
        }
        if (i === full && half) {
          return (
            <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921…" />
            </svg>
          )
        }
        return (
          <svg key={i} className="h-4 w-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921…" />
          </svg>
        )
      })}
    </div>
  )
}

export default function PerformanceTable({ top, bottom }: PerformanceTableProps) {
  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <h4 className="text-sm font-semibold mb-2">Mejores</h4>
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Estudiante</th>
              <th className="text-center">Prom.</th>
              <th className="text-right">Ev.</th>
            </tr>
          </thead>
          <tbody>
            {top.map((u, i) => (
              <tr key={u.id} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-1">{i + 1}</td>
                <td className="py-1 truncate">{u.nombre}</td>
                <td className="py-1 text-center">
                  <div className="flex flex-col items-center">
                    <span className="font-medium">{u.promedio.toFixed(1)}</span>
                    <Stars value={u.promedio} />
                  </div>
                </td>
                <td className="py-1 text-right">{u.evaluaciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold mb-2">Peores</h4>
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Estudiante</th>
              <th className="text-center">Prom.</th>
              <th className="text-right">Ev.</th>
            </tr>
          </thead>
          <tbody>
            {bottom.map((u, i) => (
              <tr key={u.id} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-1">{i + 1}</td>
                <td className="py-1 truncate">{u.nombre}</td>
                <td className="py-1 text-center">
                  <div className="flex flex-col items-center">
                    <span className="font-medium">{u.promedio.toFixed(1)}</span>
                    <Stars value={u.promedio} />
                  </div>
                </td>
                <td className="py-1 text-right">{u.evaluaciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}