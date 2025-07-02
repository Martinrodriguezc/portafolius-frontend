import Card from '../../../common/Card/Card'

export interface ProtocolCount {
  protocol: string
  count: number
}

interface StatisticsTableProps {
  data: ProtocolCount[]
}

export default function StatisticsTable({ data }: StatisticsTableProps) {
  return (
    <Card className="bg-white p-6 overflow-auto shadow-sm rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Protocolos evaluados</h3>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Protocol</th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Count</th>
            {['Positive','Negative','TP','TN','FP','FN','IQ Good','IQ Poor'].map((h) => (
              <th key={h} className="px-4 py-2 text-center text-sm font-semibold text-gray-700">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ protocol, count }) => (
            <tr key={protocol} className="hover:bg-gray-50">
              <td className="border-t px-4 py-2 text-sm text-gray-800">{protocol}</td>
              <td
                className={`border-t px-4 py-2 text-sm text-gray-800 text-center ${
                  count === 0 ? 'opacity-50' : ''
                }`}
              >
                {count}
              </td>
              {[...Array(8)].map((_, i) => (
                <td
                  key={i}
                  className="border-t px-4 py-2 text-sm text-gray-800 text-center opacity-50"
                >
                  0
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={10} className="py-4 text-center text-gray-500">
                No hay protocolos para mostrar
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  )
}