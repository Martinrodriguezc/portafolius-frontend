import Card from "../../../components/common/Card/Card";
import { ArrowUp } from "lucide-react";
import { useStudentStudies } from "../../../hooks/student/useStudentStudies";

export function StatsGrid() {
  const { studies, loading, error } = useStudentStudies();
  if (loading) return <p className="p-8">Cargando información</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>;

  const totalStudies = studies.length;
  const evaluatedStudies = studies.filter(
    (study) => study.status == "evaluado"
  ).length;
  const pendingStudies = studies.filter(
    (study) => study.status == "pendiente"
  ).length;
  //CHECK average score and status ideally on english on db

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="rounded-[16px] p-6">
        <div className="flex flex-col">
          <span className="text-[14px] text-[#A0A0A0]">Estudios Totales</span>
          <div className="flex items-end justify-between mt-2">
            <span className="text-[24px] font-bold text-[#333333]">
              {totalStudies}
            </span>
            <div className="flex items-center text-[13px] text-green-600">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>+12% este mes</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="rounded-[16px] p-6">
        <div className="flex flex-col">
          <span className="text-[14px] text-[#A0A0A0]">Estudios Evaluados</span>
          <div className="flex items-end justify-between mt-2">
            <span className="text-[24px] font-bold text-[#333333]">
              {evaluatedStudies}
            </span>
            <div className="flex items-center text-[13px] text-[#A0A0A0]">
              <span>
                {Math.round((evaluatedStudies / totalStudies) * 100)}% del total
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="rounded-[16px] p-6">
        <div className="flex flex-col">
          <span className="text-[14px] text-[#A0A0A0]">
            Estudios Pendientes
          </span>
          <div className="flex items-end justify-between mt-2">
            <span className="text-[24px] font-bold text-[#333333]">
              {pendingStudies}
            </span>
            <div className="flex items-center text-[13px] text-amber-600">
              <span>En espera de evaluación</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="rounded-[16px] p-6">
        <div className="flex flex-col">
          <span className="text-[14px] text-[#A0A0A0]">
            Calificación Promedio
          </span>
          <div className="flex items-end justify-between mt-2">
            <span className="text-[24px] font-bold text-[#333333]">9/10</span>
            <div className="flex items-center text-[13px] text-green-600">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>+0.5 pts</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
