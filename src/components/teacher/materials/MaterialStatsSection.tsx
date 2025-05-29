import { FileText, Users } from "lucide-react";
import { StatsCard } from "../allEvaluations/StatsCard";
import { MaterialStats } from "../../../hooks/teacher/teacher/Materials/request/materialRequest";

interface MaterialStatsSectionProps {
  stats: MaterialStats;
  isLoading: boolean;
  error: Error | null;
}

export default function MaterialStatsSection({ stats, isLoading, error }: MaterialStatsSectionProps) {
  if (isLoading) {
    return <p className="p-8">Cargando estadísticas…</p>;
  }

  if (error) {
    return <p className="p-8 text-red-500">{error.toString()}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard
        icon={<Users className="h-6 w-6 text-white" />}
        title="Estudiantes sin materiales"
        value={stats.studentsWithout}
        gradientFrom="amber-50"
        gradientTo="amber-100"
        border="border-amber-200"
        textColor="amber-800"
      />
      <StatsCard
        icon={<Users className="h-6 w-6 text-white" />}
        title="Estudiantes con materiales"
        value={stats.studentsWith}
        gradientFrom="green-50"
        gradientTo="green-100"
        border="border-green-200"
        textColor="green-800"
      />
      <StatsCard
        icon={<FileText className="h-6 w-6 text-white" />}
        title="Materiales subidos"
        value={stats.totalMaterials}
        gradientFrom="blue-50"
        gradientTo="blue-100"
        border="border-blue-200"
        textColor="blue-500"
      />
    </div>
  );
} 