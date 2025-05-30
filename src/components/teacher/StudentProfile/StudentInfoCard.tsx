import React from "react";
import { Calendar, Mail, Clock, Award, Layers, Zap, User } from "lucide-react";
import Card from "../../common/Card/Card";

export interface Student {
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;      
  last_activity: string | null;
}

export const StudentInfoCard: React.FC<{ student: Student }> = ({ student }) => {
  const formatOrNA = (dateStr: string | null | undefined) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "N/A" : d.toLocaleDateString("es-ES");
  };

  return (
    <Card className="bg-white rounded-[16px] shadow-sm border border-slate-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="bg-[#4E81BD]/10 h-24 w-24 rounded-full flex items-center justify-center">
          <User className="h-12 w-12 text-[#4E81BD]" />
        </div>
        <div className="space-y-3 flex-1">
          <h2 className="text-2xl font-bold text-[#333333]">
            {student.first_name} {student.last_name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#4E81BD]" />
              <span className="text-[#666666]">{student.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#4E81BD]" />
              <span className="text-[#666666]">
                Registrado: {formatOrNA(student.created_at)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#4E81BD]" />
              <span className="text-[#666666]">
                Última actividad: {formatOrNA(student.last_activity)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:border-l md:pl-6 md:border-slate-200">
          <div className="flex items-center gap-2 text-sm text-[#666666]">
            <Award className="h-4 w-4 text-green-500" />
            <span>Nivel: Principiante</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#666666]">
            <Layers className="h-4 w-4 text-amber-500" />
            <span>Especialidad: Medicina General</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#666666]">
            <Zap className="h-4 w-4 text-purple-500" />
            <span>Progreso: 25%</span>
          </div>
        </div>
      </div>
    </Card>
  );
};