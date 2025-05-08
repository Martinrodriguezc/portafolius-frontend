// TeacherDashboardPage.tsx
import React from "react";
import { BookOpen, CheckCircle, Clock } from "lucide-react";
import Button from "../../components/common/Button/Button";
import Card from "../../components/common/Card/Card";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsContainer from "../../components/common/Tabs/TabsContainer";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsPanel from "../../components/common/Tabs/TabsPanel";
import { useTeacherDashboard } from "../../hooks/teacher/dashboard/useTeacherDashboard";
import { useAllStudies } from "../../hooks/teacher/useAllStudies/useAllStudies";

export default function TeacherDashboardPage() {
  const {
    lastName,
    stats,
    statsLoading,
    statsError,
    pending,
    evaluated,
    vidsLoading,
    vidsError,
  } = useTeacherDashboard();

  const {
    pending: studiesPending,
    completed: studiesCompleted,
    loading: studiesLoading,
    error: studiesError,
  } = useAllStudies();

  if (statsLoading || vidsLoading || studiesLoading) {
    return <p className="p-8">Cargando…</p>;
  }
  if (statsError || vidsError || studiesError) {
    return (
      <p className="p-8 text-red-500">
        Error: {statsError || vidsError || studiesError}
      </p>
    );
  }
  if (!stats) {
    return null;
  }

  const allStudies = [...studiesPending, ...studiesCompleted];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header panel */}
      <Card className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <header>
          <h1 className="text-3xl font-bold mb-1">Dashboard de Profesor</h1>
          <p className="text-gray-500">Bienvenido de nuevo, Dr. {lastName}</p>
        </header>
      </Card>

      {/* Stats panel */}
      <Card className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <Clock className="h-8 w-8 text-yellow-500 mb-2" />
            <h3 className="font-semibold">Pendientes</h3>
            <p className="text-xl">{stats.pendingCount}</p>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
            <h3 className="font-semibold">Evaluados hoy</h3>
            <p className="text-xl">{stats.evaluatedToday}</p>
          </div>
          <div className="flex flex-col items-center">
            <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-semibold">Estudiantes</h3>
            <p className="text-xl">{stats.studentCount}</p>
          </div>
        </div>
      </Card>

      {/* Videos tabs panel */}
      <Card className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <TabsContainer defaultValue="pendiente">
          <TabsList className="mb-4 border-b border-slate-200">
            <TabsButton value="pendiente">Pendiente</TabsButton>
            <TabsButton value="evaluado">Evaluado</TabsButton>
          </TabsList>

          <TabsPanel value="pendiente">
            {pending.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Clock className="h-12 w-12 text-yellow-500 mb-4" />
                <p className="text-lg font-medium text-gray-800 mb-2">
                  No hay videos pendientes
                </p>
                <p className="text-sm text-gray-500 text-center">
                  Cuando tus estudiantes suban videos, los verás aquí para
                  evaluarlos.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pending.map((v) => {
                  const study = allStudies.find(
                    (s) => s.study_id === v.study_id
                  );
                  const studentName = study
                    ? `${study.first_name} ${study.last_name}`
                    : "Desconocido";
                  return (
                    <Card
                      key={v.id}
                      className="rounded-lg p-4 flex items-center justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">
                          {v.original_filename}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {studentName} ·{" "}
                          {new Date(v.upload_date).toLocaleDateString(
                            "es-ES",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <Button>Evaluar</Button>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsPanel>

          <TabsPanel value="evaluado">
            {evaluated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <p className="text-lg font-medium text-gray-800 mb-2">
                  No hay videos evaluados
                </p>
                <p className="text-sm text-gray-500 text-center">
                  Una vez que evalúes videos, sus resultados aparecerán aquí.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {evaluated.map((v) => {
                  const study = allStudies.find(
                    (s) => s.study_id === v.study_id
                  );
                  const studentName = study
                    ? `${study.first_name} ${study.last_name}`
                    : "Desconocido";
                  return (
                    <Card
                      key={v.id}
                      className="rounded-lg p-4 flex items-center justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">
                          {v.original_filename}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {studentName} ·{" "}
                          {new Date(v.evaluated_at!).toLocaleDateString(
                            "es-ES",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}{" "}
                          · {v.score}/10
                        </p>
                      </div>
                      <Button>Ver</Button>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsPanel>
        </TabsContainer>
      </Card>
    </div>
  );
}
