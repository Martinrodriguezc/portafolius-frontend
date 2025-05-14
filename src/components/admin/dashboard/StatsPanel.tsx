import { Users, BookOpen, BarChart } from "lucide-react";

interface StatsPanelProps {
  userCount: number;
  courseCount: number;
  evalCount: number;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({
  userCount,
  courseCount,
  evalCount,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        icon={<Users className="h-6 w-6 text-blue-500" />}
        label="Usuarios Registrados"
        value={userCount}
        trend={userCount > 0 ? "+5%" : "0%"}
        trendUp={userCount > 0}
      />
      <StatCard
        icon={<BookOpen className="h-6 w-6 text-green-500" />}
        label="Cursos Activos"
        value={courseCount}
        trend={courseCount > 0 ? "+2%" : "0%"}
        trendUp={courseCount > 0}
      />
      <StatCard
        icon={<BarChart className="h-6 w-6 text-purple-500" />}
        label="Evaluaciones Realizadas"
        value={evalCount}
        trend={evalCount > 0 ? "+8%" : "0%"}
        trendUp={evalCount > 0}
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  trend: string;
  trendUp: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  trend,
  trendUp,
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
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}; 