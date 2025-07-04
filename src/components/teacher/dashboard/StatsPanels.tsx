import React from "react";
import { Clock, CheckCircle, Users } from "lucide-react";
import Card from "../../common/Card/Card";

interface StatsPanelProps {
  pendingCount: number;
  evaluatedToday: number;
  studentCount: number;
}

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number | string;
  from: string;
  to: string;
  border: string;
}> = ({ icon, label, value, from, to, border }) => (
  <Card className={`bg-gradient-to-br from-${from} to-${to} p-4 sm:p-6 rounded-xl sm:rounded-[16px] shadow-sm border ${border}`}>
    <div className="flex items-center">
      <div className="p-2 sm:p-3 rounded-full mr-3 sm:mr-4 shadow-sm bg-opacity-100">
        {icon}
      </div>
      <div>
        <p className="text-sm sm:text-base font-medium text-[#333333]">{label}</p>
        <p className="text-2xl sm:text-3xl font-bold text-[#333333]">{value}</p>
      </div>
    </div>
  </Card>
);

export const StatsPanel: React.FC<StatsPanelProps> = ({
  pendingCount,
  evaluatedToday,
  studentCount,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 animate-fadeIn">
    <StatCard
      icon={<Clock className="h-5 w-5 text-white" />}
      label="Pendientes"
      value={pendingCount}
      from="amber-50"
      to="amber-100"
      border="border-amber-200"
    />
    <StatCard
      icon={<CheckCircle className="h-5 w-5 text-white" />}
      label="Evaluados"
      value={evaluatedToday}
      from="green-50"
      to="green-100"
      border="border-green-200"
    />
    <StatCard
      icon={<Users className="h-5 w-5 text-white" />}
      label="Estudiantes"
      value={studentCount}
      from="blue-50"
      to="blue-100"
      border="border-blue-200"
    />
  </div>
);