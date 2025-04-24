// src/pages/Teacher/Evaluations.tsx
import { Link } from "react-router-dom";
import { Badge, Calendar, CheckCircle } from "lucide-react";
import TeacherLayout from "../layout/TeacherLayout";
import Card from "../../components/common/Card/Card";
import TabsContainer from "../../components/common/Tabs/TabsContainer";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsPanel from "../../components/common/Tabs/TabsPanel";
import Button from "../../components/common/Button/Button";
import { useAllStudies } from "../../hooks/teacher/useAllStudies";

export default function TeacherEvaluationsLayout() {
  const { pending, completed, loading, error } = useAllStudies();

  if (loading) return (
    <TeacherLayout>
      <p className="p-8">Cargando…</p>
    </TeacherLayout>
  );
  if (error) return (
    <TeacherLayout>
      <p className="p-8 text-red-500">{error}</p>
    </TeacherLayout>
  );

  return (
      <div className="p-8">
        <header className="mb-8">
          <h1 className="text-[20px] font-bold text-[#333333]">Evaluaciones</h1>
          <p className="text-[#A0A0A0]">Historial de tus evaluaciones</p>
        </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-none shadow-sm rounded-[16px]">
          <div className="flex flex-col">
            <span className="text-[14px] text-[#A0A0A0]">Evaluaciones Totales</span>
            <span className="text-[24px] font-bold text-[#333333] mt-2">
              {pending.length + completed.length}
            </span>
          </div>
        </Card>

        <Card className="border-none shadow-sm rounded-[16px]">
          <div className="flex flex-col">
            <span className="text-[14px] text-[#A0A0A0]">Evaluaciones Pendientes</span>
            <span className="text-[24px] font-bold text-[#333333] mt-2">
              {pending.length}
            </span>
          </div>
        </Card>

        <Card className="border-none shadow-sm rounded-[16px]">
          <div className="flex flex-col">
            <span className="text-[14px] text-[#A0A0A0]">Calificación Promedio</span>
            <span className="text-[24px] font-bold text-[#333333] mt-2">
              {(completed.length > 0 ? (completed.reduce((sum, s) => sum + (s as any).score, 0) / completed.length) : 0).toFixed(1)}/10
            </span>
          </div>
        </Card>
      </div>

      <TabsContainer defaultValue="pending">
        <TabsList className="mb-6">
          <TabsButton value="pending">Pendientes</TabsButton>
          <TabsButton value="completed">Completadas</TabsButton>
        </TabsList>

        <TabsPanel value="pending">
          {pending.length === 0 ? (
            <Card className="border-none shadow-sm rounded-[16px]">
              <p className="p-4 text-[#A0A0A0]">No hay evaluaciones pendientes</p>
            </Card>
          ) : (
            pending.map((study) => (
              <Card key={study.study_id} className="border-none shadow-sm rounded-[16px] mb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-[16px] font-medium text-[#333333]">
                        {study.first_name} {study.last_name}
                      </h3>
                      <Badge className="ml-2 bg-amber-100 text-amber-800">Pendiente</Badge>
                    </div>
                    <div className="flex items-center mt-1 text-[14px] text-[#A0A0A0]">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{new Date(study.created_at).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>Protocolo: {study.protocol.toUpperCase()}</span>
                    </div>
                  </div>
                  <Link to={`/teacher/evaluations/${study.study_id}/videos`}>
                    <Button fixedWidth>Ver videos</Button>
                  </Link>
                </div>
              </Card>
            ))
          )}
        </TabsPanel>

        <TabsPanel value="completed">
          {completed.length === 0 ? (
            <Card className="border-none shadow-sm rounded-[16px]">
              <p className="p-4 text-[#A0A0A0]">No hay evaluaciones completadas</p>
            </Card>
          ) : (
            completed.map((study: any) => (
              <Card key={study.study_id} className="border-none shadow-sm rounded-[16px] mb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-[16px] font-medium text-[#333333]">
                        {study.first_name} {study.last_name}
                      </h3>
                      <Badge className="ml-2 bg-green-100 text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Completada
                      </Badge>
                    </div>
                    <div className="flex items-center mt-1 text-[14px] text-[#A0A0A0]">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{new Date(study.created_at).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>Protocolo: {study.protocol.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-[#4E81BD]/10 px-4 py-2 rounded-lg text-center">
                      <p className="text-[13px] text-[#A0A0A0]">Calificación</p>
                      <p className="text-[18px] font-medium text-[#4E81BD]">{study.score}/10</p>
                    </div>
                    <Link to={`/teacher/evaluations/${study.study_id}/videos`}>
                      <Button fixedWidth>Ver videos</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsPanel>
      </TabsContainer>
    </div>
  );
}

export const TeacherEvaluationsPage = () => (
  <TeacherLayout>
    <TeacherEvaluationsLayout />
  </TeacherLayout>
);



