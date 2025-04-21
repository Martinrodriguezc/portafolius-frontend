import { Link } from "react-router-dom";
import { Badge, Calendar, CheckCircle } from "lucide-react";
import TeacherLayout from "../layout/TeacherLayout";
import Card from "../../components/common/Card/Card";
import TabsContainer from "../../components/common/Tabs/TabsContainer";
import Button from "../../components/common/Button/Button";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsPanel from "../../components/common/Tabs/TabsPanel";
import {
  sampleEvaluationData,
} from "./utils/utils";
import { useStudiesWithStudent } from "../../hooks/teacher/useStudiesWithStudents";

//TODO: MAKE CODE ADAPTABLE BY REMOVING DIRECT INPUTS GIVEN
export default function TeacherEvaluationsLayout() {
  const { studiesWithStudent } = useStudiesWithStudent()
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">Evaluaciones</h1>
        <p className="text-[#A0A0A0]">
          Historial de evaluaciones realizadas y pendientes
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-none shadow-sm rounded-[16px]">
          <div className="flex flex-col">
            <span className="text-[14px] text-[#A0A0A0]">
              Evaluaciones Totales
            </span>
            <span className="text-[24px] font-bold text-[#333333] mt-2">
              {studiesWithStudent.length}
            </span>
          </div>
        </Card>

        <Card className="border-none shadow-sm rounded-[16px]">
          <div className="flex flex-col">
            <span className="text-[14px] text-[#A0A0A0]">
              Evaluaciones Pendientes
            </span>
            <span className="text-[24px] font-bold text-[#333333] mt-2">
              {studiesWithStudent.length}
            </span>
          </div>
        </Card>

        <Card className="border-none shadow-sm rounded-[16px]">
          <div className="flex flex-col">
            <span className="text-[14px] text-[#A0A0A0]">
              Calificación Promedio
            </span>
            <span className="text-[24px] font-bold text-[#333333] mt-2">
              {(
                sampleEvaluationData.reduce(
                  (acc, curr) => acc + curr.score,
                  0
                ) / studiesWithStudent.length
              ).toFixed(1)}
              /10
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
          {studiesWithStudent.length === 0 ? (
            <Card className="border-none shadow-sm rounded-[16px]">
              <p className="text-[16px] text-[#A0A0A0]">
                No hay evaluaciones pendientes
              </p>
            </Card>
          ) : (
            studiesWithStudent.map((evaluation) => (
              <Card
                key={evaluation.study.id}
                className="border-none shadow-sm rounded-[16px] m-4"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center">
                      <h3 className="text-[16px] font-medium text-[#333333]">
                        {evaluation.student_name}
                      </h3>
                      <Badge className="ml-2 bg-amber-100 text-amber-800">
                        Pendiente
                      </Badge>
                    </div>
                    <div className="flex items-center mt-1 text-[14px] text-[#A0A0A0]">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{evaluation.study.created_at}</span>
                      <span className="mx-2">•</span>
                      <span>Protocolo: {evaluation.study.protocol.toUpperCase()}</span>
                      <span className="mx-2">•</span>
                      <span>{evaluation.study.status.toUpperCase()}</span>
                    </div>
                  </div>
                    <Link to={`/teacher/evaluations/${evaluation.study.id}/videos`}>
                      Evaluar
                    </Link>
                </div>
              </Card>
            ))
          )}
        </TabsPanel>

        <TabsPanel value="completed" className="space-y-4">
          {sampleEvaluationData.map((evaluation) => (
            <Card
              key={evaluation.id}
              className="border-none shadow-sm rounded-[16px]"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <h3 className="text-[16px] font-medium text-[#333333]">
                      {evaluation.student}
                    </h3>
                    <Badge className="ml-2 bg-green-100 text-green-800">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Completada
                    </Badge>
                  </div>
                  <div className="flex items-center mt-1 text-[14px] text-[#A0A0A0]">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{evaluation.date}</span>
                    <span className="mx-2">•</span>
                    <span>Protocolo: {evaluation.protocol}</span>
                    <span className="mx-2">•</span>
                    <span>{evaluation.videos} videos</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {evaluation.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-[13px] bg-[#F4F4F4] px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="bg-[#4E81BD]/10 px-4 py-2 rounded-lg text-center">
                    <p className="text-[13px] text-[#A0A0A0]">Calificación</p>
                    <p className="text-[18px] font-medium text-[#4E81BD]">
                      {evaluation.score}/10
                    </p>
                  </div>
                  <Button fixedWidth={true}>
                    Ver detalles
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsPanel>
      </TabsContainer>
    </div>
  );
}

export const TeacherEvaluationsPage = () => {
  return (
    <TeacherLayout>
      <TeacherEvaluationsLayout />
    </TeacherLayout>
  );
};
