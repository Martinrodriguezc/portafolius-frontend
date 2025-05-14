import { Users, BookOpen, GraduationCap } from "lucide-react";
import { DashboardStats } from "../../../hooks/admin/dashboardServices";
import { StatCardProps } from "../../../types/Admin/StatCardTypes";

type StatsPanelProps = Pick<DashboardStats, 'users' | 'evaluations' | 'studies'>;

export const StatsPanel: React.FC<StatsPanelProps> = ({
  users,
  evaluations,
  studies
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        icon={<Users className="h-6 w-6 text-blue-500" />}
        label="Usuarios Registrados"
        value={users.total}
        trend={`${users.growthPercentage > 0 ? '+' : ''}${users.growthPercentage.toFixed(1)}%`}
        trendUp={users.growthPercentage > 0}
        subtitle={`${users.newLastWeek} nuevos esta semana`}
      />
      <StatCard
        icon={<BookOpen className="h-6 w-6 text-green-500" />}
        label="Evaluaciones Realizadas"
        value={evaluations.total}
        trend={`${evaluations.growthPercentage > 0 ? '+' : ''}${evaluations.growthPercentage.toFixed(1)}%`}
        trendUp={evaluations.growthPercentage > 0}
        subtitle={`${evaluations.newLastWeek} nuevas esta semana`}
      />
      <StatCard
        icon={<GraduationCap className="h-6 w-6 text-purple-500" />}
        label="Estudios Creados"
        value={studies.total}
        trend={`${studies.growthPercentage > 0 ? '+' : ''}${studies.growthPercentage.toFixed(1)}%`}
        trendUp={studies.growthPercentage > 0}
        subtitle={`${studies.newLastWeek} nuevos esta semana`}
      />
    </div>
  );
};

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  trend,
  trendUp,
  subtitle
}) => {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow">
      <div className="flex items-center justify-between">
        <div className="rounded-md bg-gray-50 p-2">{icon}</div>
        <div
          className={`text-xs font-medium ${
            trendUp ? "text-green-600" : "text-gray-600"
          }`}
        >
          {trend}
        </div>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}; 