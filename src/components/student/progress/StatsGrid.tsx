import Card from '../../../components/common/Card/Card';
import { StatsGridProps } from '../../../types/Props/StatsGridProps';

export function StatsGrid({
  totalStudies,
  evaluatedStudies,
  pendingStudies,
  averageScore,
}: StatsGridProps) {
  const evaluatedPercent =
    totalStudies > 0
      ? Math.round((evaluatedStudies / totalStudies) * 100)
      : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="rounded-[16px] p-6">
        <span className="text-[14px] text-[#A0A0A0]">Estudios Totales</span>
        <div className="mt-2">
          <span className="text-[24px] font-bold text-[#333333]">
            {totalStudies}
          </span>
        </div>
      </Card>

      <Card className="rounded-[16px] p-6">
        <span className="text-[14px] text-[#A0A0A0]">Estudios Evaluados</span>
        <div className="mt-2">
          <span className="text-[24px] font-bold text-[#333333]">
            {evaluatedStudies}
          </span>
          {evaluatedPercent !== null && (
            <div className="text-[13px] text-[#A0A0A0]">
              {evaluatedPercent}% del total
            </div>
          )}
        </div>
      </Card>

      <Card className="rounded-[16px] p-6">
        <span className="text-[14px] text-[#A0A0A0]">Estudios Pendientes</span>
        <div className="mt-2">
          <span className="text-[24px] font-bold text-[#333333]">
            {pendingStudies}
          </span>
          {pendingStudies > 0 && (
            <div className="text-[13px] text-amber-600">
              En espera de evaluación
            </div>
          )}
        </div>
      </Card>

      <Card className="rounded-[16px] p-6">
        <span className="text-[14px] text-[#A0A0A0]">Calificación Promedio</span>
        <div className="mt-2">
          <span className="text-[24px] font-bold text-[#333333]">
            {averageScore}/10
          </span>
        </div>
      </Card>
    </div>
  );
}