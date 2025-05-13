import React from "react";
import { Lightbulb, Clock, CheckCircle, Users } from "lucide-react";
import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import { Link } from "react-router-dom";

interface TipsSectionProps {
  total: number;
  pendingCount: number;
}

export const TipsSection: React.FC<TipsSectionProps> = ({ total }) => (
  total === 0 ? (
    <Card className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-[16px] shadow-sm border border-slate-200">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
        <div className="bg-[#4E81BD]/10 p-3 sm:p-4 rounded-full">
          <Lightbulb className="h-10 w-10 sm:h-12 sm:w-12 text-[#4E81BD]" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#333333] mb-2">Sin evaluaciones aún</h2>
          <p className="text-sm sm:text-base text-[#666666] mb-4 max-w-full md:max-w-md">
            Tus estudiantes aún no han subido videos. Invítalos a grabar y subir sus evaluaciones.
          </p>
          <Link to="/teacher/students">
            <Button className="w-full md:w-auto bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-[8px] shadow-sm">
              Gestionar estudiantes
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  ) : total <= 3 ? (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl sm:rounded-[16px] shadow-sm border border-blue-100">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {/* Tip 1 */}
        <div className="bg-white p-3 sm:p-5 rounded-lg sm:rounded-xl shadow-sm border border-blue-100">
          <h3 className="text-[14px] sm:text-[16px] font-medium text-[#333333] mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-500" />
            Prioriza evaluaciones
          </h3>
          <p className="text-[12px] sm:text-[14px] text-[#666666]">
            Evalúa primero los videos más antiguos para mantener a tus estudiantes motivados.
          </p>
        </div>
        <div className="bg-white p-3 sm:p-5 rounded-lg sm:rounded-xl shadow-sm border border-blue-100">
          <h3 className="text-[14px] sm:text-[16px] font-medium text-[#333333] mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            Retroalimentación detallada
          </h3>
          <p className="text-[12px] sm:text-[14px] text-[#666666]">
            Proporciona comentarios específicos y constructivos.
          </p>
        </div>
        <div className="bg-white p-3 sm:p-5 rounded-lg sm:rounded-xl shadow-sm border border-blue-100">
          <h3 className="text-[14px] sm:text-[16px] font-medium text-[#333333] mb-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-[#4E81BD]" />
            Seguimiento de progreso
          </h3>
          <p className="text-[12px] sm:text-[14px] text-[#666666]">
            Revisa el progreso de tus estudiantes para celebrar logros.
          </p>
        </div>
      </div>
    </Card>
  ) : null
);