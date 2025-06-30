import Card from '../../../common/Card/Card'
import { useInteractionMetrics } from '../../../../hooks/metrics/useInteractionMetrics'
import { InteractionMetrics } from '../../../../hooks/metrics/request/interactionMetricsRequest'
import { authService } from '../../../../hooks/auth/authServices'

export default function StatisticsTable() {
  const user = authService.getCurrentUser()!
  const studentId = Number(user.id)

  const {
    data: metrics = [],
    isLoading,
    isError,
  } = useInteractionMetrics(studentId)

  if (isLoading) {
    return (
      <Card className="bg-white p-6 overflow-auto shadow-sm rounded-lg">
        <p>Cargando estadísticas…</p>
      </Card>
    )
  }
  if (isError || metrics.length === 0) {
    return (
      <Card className="bg-white p-6 overflow-auto shadow-sm rounded-lg">
        <p>No hay protocolos para mostrar</p>
      </Card>
    )
  }

  return (
    <Card className="bg-white p-6 overflow-auto shadow-sm rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Protocolos evaluados
      </h3>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Protocolo
            </th>
            {[
              'Positive',
              'Negative',
              'TP',
              'TN',
              'FP',
              'FN',
              'IQ Good',
              'IQ Poor',
            ].map(label => (
              <th
                key={label}
                className="px-4 py-2 text-center text-sm font-semibold text-gray-700"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metrics.map((m: InteractionMetrics) => (
            <tr key={m.protocol} className="hover:bg-gray-50">
              <td className="border-t px-4 py-2 text-sm text-gray-800">
                {m.protocol}
              </td>
              <td className="border-t px-4 py-2 text-sm text-gray-800 text-center">
                {m.positive}
              </td>
              <td className="border-t px-4 py-2 text-sm text-gray-800 text-center">
                {m.negative}
              </td>
              <td className="border-t px-4 py-2 text-sm text-gray-800 text-center">
                {m.tp}
              </td>
              <td className="border-t px-4 py-2 text-sm text-gray-800 text-center">
                {m.tn}
              </td>
              <td className="border-t px-4 py-2 text-sm text-gray-800 text-center">
                {m.fp}
              </td>
              <td className="border-t px-4 py-2 text-sm text-gray-800 text-center">
                {m.fn}
              </td>
              <td className="border-t px-4 py-2 text-sm text-gray-800 text-center">
                {m.iqGood}
              </td>
              <td className="border-t px-4 py-2 text-sm text-gray-800 text-center">
                {m.iqPoor}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}