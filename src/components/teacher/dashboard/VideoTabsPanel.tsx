import React from "react";
import {
  Clock,
  CheckCircle,
  FileVideo,
  Users,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import TabsContainer from "../../common/Tabs/TabsContainer";
import TabsList from "../../common/Tabs/TabsList";
import TabsButton from "../../common/Tabs/TabsButton";
import TabsPanel from "../../common/Tabs/TabsPanel";
import { TeacherVideo } from "../../../types/VideoTypes";
import { StudyWithStatus } from "../../../types/Study";

interface VideoTabsPanelProps {
  pending: TeacherVideo[];
  evaluated: TeacherVideo[];
  allStudies: StudyWithStatus[];
}

export const VideoTabsPanel: React.FC<VideoTabsPanelProps> = ({
  pending,
  evaluated,
  allStudies,
}) => (
  <Card className="bg-white p-4 sm:p-6 lg:p-8 rounded-[16px] shadow-sm border border-slate-200 animate-fadeIn">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-[#333333]">
          Videos de estudiantes
        </h2>
        <p className="text-sm sm:text-base text-[#666666]">
          Revisa y evalúa los videos de tus estudiantes
        </p>
      </div>
      <Link to="/teacher/evaluations" className="flex-shrink-0">
        <Button className="w-full sm:w-auto bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-4 py-2 rounded-[8px] shadow-sm transition-all flex items-center justify-center gap-2">
          Ver todas las evaluaciones <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>

    <TabsContainer defaultValue="pendiente">
      <TabsList className="mb-6 border-b border-slate-200 pb-1 flex space-x-4 overflow-x-auto scrollbar-hide">
        <TabsButton value="pendiente">
          <Clock className="h-4 w-4 text-amber-500" /> Pendiente (
          {pending.length})
        </TabsButton>
        <TabsButton value="evaluado">
          <CheckCircle className="h-4 w-4 text-green-500" /> Evaluado (
          {evaluated.length})
        </TabsButton>
      </TabsList>

      <TabsPanel value="pendiente">
        {pending.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-[12px] border border-slate-100">
            <Clock className="h-16 w-16 text-amber-300 mb-4" />
            <p className="text-xl font-medium text-[#333333] mb-2">
              No hay videos pendientes
            </p>
            <p className="text-sm sm:text-base text-[#666666] text-center max-w-md">
              Cuando tus estudiantes suban videos, los verás aquí para
              evaluarlos.
            </p>
          </div>
        ) : (
          pending.map((v) => {
            const study = allStudies.find((s) => s.study_id === v.study_id);
            const name = study
              ? `${study.first_name} ${study.last_name}`
              : "Desconocido";
            return (
              <Card
                key={v.id}
                className="w-full rounded-[12px] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200 hover:shadow-md transition-all my-2"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 bg-amber-100 p-2 rounded-lg">
                    <FileVideo className="h-6 w-6 text-amber-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-medium text-[#333333] mb-1 line-clamp-1 break-words">
                      {v.original_filename}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-[#666666]">
                      <p className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-[#4E81BD]" /> {name}
                      </p>
                      <p className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-[#4E81BD]" />
                        {new Date(v.upload_date).toLocaleDateString("es-ES")}
                      </p>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/teacher/evaluations/${v.study_id}/videos/${v.id}`}
                  className="flex-shrink-0 w-full sm:w-auto"
                >
                  <Button className="w-full sm:w-auto bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-2.5 rounded-[8px] shadow-sm transition-all">
                    Evaluar
                  </Button>
                </Link>
              </Card>
            );
          })
        )}
      </TabsPanel>

      {/* Pestaña Evaluado */}
      <TabsPanel value="evaluado">
        {evaluated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-[12px] border border-slate-100">
            <CheckCircle className="h-16 w-16 text-green-300 mb-4" />
            <p className="text-xl font-medium text-[#333333] mb-2">
              No hay videos evaluados
            </p>
            <p className="text-sm sm:text-base text-[#666666] text-center max-w-md">
              Una vez que evalúes videos, sus resultados aparecerán aquí.
            </p>
          </div>
        ) : (
          evaluated.map((v) => {
            const study = allStudies.find((s) => s.study_id === v.study_id);
            const name = study
              ? `${study.first_name} ${study.last_name}`
              : "Desconocido";
            return (
              <Card
                key={v.id}
                className="w-full rounded-[12px] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200 hover:shadow-md transition-all my-2"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 bg-green-100 p-2 rounded-lg">
                    <FileVideo className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-medium text-[#333333] mb-1 line-clamp-1 break-words">
                      {v.original_filename}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-[#666666]">
                      <p className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-[#4E81BD]" /> {name}
                      </p>
                      <p className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-[#4E81BD]" />
                        {new Date(v.upload_date).toLocaleDateString("es-ES")}
                      </p>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/teacher/evaluations/${v.study_id}/videos/${v.id}/evaluate`}
                  className="flex-shrink-0 w-full sm:w-auto"
                >
                  <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-500/90 text-white px-6 py-2.5 rounded-[8px] shadow-sm transition-all">
                    Ver evaluación
                  </Button>
                </Link>
              </Card>
            );
          })
        )}
      </TabsPanel>
    </TabsContainer>
  </Card>
);
