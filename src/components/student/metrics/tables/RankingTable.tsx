export interface RankingItem {
  id: number
  nombre: string
  valor: number
}

interface RankingTableProps {
  data: RankingItem[]
}

export default function RankingTable({ data }: RankingTableProps) {
  const max = Math.max(...data.map(d => d.valor), 1)
  return (
    <div className="h-full overflow-y-auto">
      <table className="w-full text-sm">
        <thead className="text-xs text-gray-700">
          <tr>
            <th className="py-2 text-left">#</th>
            <th className="py-2 text-left">Nombre estudio</th>
            <th className="py-2 text-right pr-4">Calificación</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => {
            const pct = (d.valor / max) * 100
            return (
              <tr key={d.id} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-2 pl-2">{i + 1}</td>
                <td className="py-2">{d.nombre}</td>
                <td className="py-2 pr-4">
                  <div className="flex items-center justify-end">
                    <span className="mr-2">{d.valor}</span>
                    <div className="w-24 h-2 bg-gray-200 rounded overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}