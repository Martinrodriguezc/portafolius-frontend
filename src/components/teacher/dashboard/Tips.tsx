// components/teacher/TipsSection.tsx
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
    <Card className="bg-white p-6 rounded-[16px] shadow-sm border border-slate-200">
      <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        <div className="bg-[#4E81BD]/10 p-4 rounded-full">
          <Lightbulb className="h-12 w-12 text-[#4E81BD]" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#333333] mb-2">Sin evaluaciones aún</h2>
          <p className="text-[#666666] mb-4 max-w-md">
            Tus estudiantes aún no han subido videos. Invítalos a grabar y subir sus evaluaciones.
          </p>
          <Link to="/teacher/students">
            <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-3 rounded-[8px] shadow-sm">
              Gestionar estudiantes
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  ) : total <= 3 ? (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-[16px] shadow-sm border border-blue-100">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Tip 1 */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
          <h3 className="text-[16px] font-medium text-[#333333] mb-3 flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            Prioriza evaluaciones
          </h3>
          <p className="text-[14px] text-[#666666]">
            Evalúa primero los videos más antiguos para mantener a tus estudiantes motivados.
          </p>
        </div>
        {/* Tip 2 */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
          <h3 className="text-[16px] font-medium text-[#333333] mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Retroalimentación detallada
          </h3>
          <p className="text-[14px] text-[#666666]">
            Proporciona comentarios específicos y constructivos.
          </p>
        </div>
        {/* Tip 3 */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
          <h3 className="text-[16px] font-medium text-[#333333] mb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-[#4E81BD]" />
            Seguimiento de progreso
          </h3>
          <p className="text-[14px] text-[#666666]">
            Revisa el progreso de tus estudiantes para celebrar logros.
          </p>
        </div>
      </div>
    </Card>
  ) : null
);
