import React from "react";
import { BookOpen, ClipboardList, BarChart } from "lucide-react";
import Card from "../../common/Card/Card";

interface TopMetricsProps {
  total: number;
  completedCount: number;
  average: string;
  studies: { created_at: string; score: number | null }[];
}

export const TopMetrics: React.FC<TopMetricsProps> = ({
  total,
  completedCount,
  average,
  studies,
}) => {
  const lastDate =
    studies.length > 0
      ? new Date(
          studies
            .slice()
            .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))[0]
            .created_at
        ).toLocaleDateString()
      : "N/A";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-[16px] shadow-sm border border-blue-200">
        <div className="flex items-center">
          <div className="bg-[#4E81BD] p-3 rounded-full mr-4 shadow-sm">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-[#4E81BD] text-sm font-medium">Total estudios</p>
            <p className="text-3xl font-bold text-[#333333]">{total}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-blue-200/50 text-sm text-[#333333]">
          Último estudio: {lastDate}
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-[16px] shadow-sm border border-green-200">
        <div className="flex items-center">
          <div className="bg-green-500 p-3 rounded-full mr-4 shadow-sm">
            <ClipboardList className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-green-800 text-sm font-medium">Completados</p>
            <p className="text-3xl font-bold text-[#333333]">{completedCount}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-green-200/50 text-sm text-[#333333]">
          Tasa: {total > 0 ? `${Math.round((completedCount / total) * 100)}%` : "N/A"}
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-[16px] shadow-sm border border-amber-200">
        <div className="flex items-center">
          <div className="bg-amber-500 p-3 rounded-full mr-4 shadow-sm">
            <BarChart className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-amber-800 text-sm font-medium">Promedio</p>
            <p className="text-3xl font-bold text-[#333333]">{average}/10</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-amber-200/50 text-sm text-[#333333]">
          Mejor:{" "}
          {studies.some((s) => s.score !== null)
            ? `${Math.max(...studies.map((s) => s.score || 0))}/10`
            : "N/A"}
        </div>
      </Card>
    </div>
  );
};
