export interface CompletionRate {
  tasa_finalizacion: number
  estudios_evaluados: number
  total_estudios: number
}

interface GaugeChartProps {
  data: CompletionRate
}

export default function GaugeChart({ data }: GaugeChartProps) {
  const angle = (data.tasa_finalizacion / 100) * 180
  const color = data.tasa_finalizacion >= 70
    ? "green"
    : data.tasa_finalizacion >= 40
      ? "yellow"
      : "red"
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="relative w-48 h-24 overflow-hidden">
        <div className="absolute w-48 h-48 rounded-full border-8 border-gray-200 bottom-0" />
        <div
          className="absolute w-48 h-48 rounded-full border-8 border-transparent bottom-0"
          style={{
            borderTopColor: color,
            borderRightColor: color,
            borderLeftColor: color,
            transform: `rotate(${angle - 180}deg)`,
            transformOrigin: "center bottom"
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-1 h-20 bg-gray-800 origin-bottom"
          style={{
            transform: `rotate(${angle - 90}deg)`
          }}
        />
        <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-gray-800 rounded-full -ml-2 -mb-2" />
      </div>
      <div className={`mt-6 text-3xl font-bold text-${color}-500`}>
        {data.tasa_finalizacion}%
      </div>
      <p className="text-sm text-gray-600 mt-1">
        {data.estudios_evaluados} de {data.total_estudios}
      </p>
      <div className="w-48 flex justify-between mt-2">
        <span className="text-xs text-gray-500">0%</span>
        <span className="text-xs text-gray-500">50%</span>
        <span className="text-xs text-gray-500">100%</span>
      </div>
    </div>
  )
}