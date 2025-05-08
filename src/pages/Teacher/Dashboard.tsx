import { CheckCircle, Clock } from "lucide-react";
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
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard de Profesor</h1>
        <p className="text-gray-500">Bienvenido de nuevo, Dr. {lastName}</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="font-bold">Pendientes</h3>
          <p>{stats.pendingCount}</p>
        </Card>
        <Card>
          <h3 className="font-bold">Evaluados hoy</h3>
          <p>{stats.evaluatedToday}</p>
        </Card>
        <Card>
          <h3 className="font-bold">Estudiantes</h3>
          <p>{stats.studentCount}</p>
        </Card>
      </div>

      <TabsContainer defaultValue="pendiente">
        <TabsList className="mb-6">
          <TabsButton value="pendiente">Pendiente</TabsButton>
          <TabsButton value="evaluado">Evaluado</TabsButton>
        </TabsList>

        <TabsPanel value="pendiente">
          {pending.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-200 rounded-lg">
              <Clock className="h-12 w-12 text-yellow-500 mb-4" />
              <p className="text-lg font-medium text-[#333333]">
                No hay videos pendientes
              </p>
              <p className="text-sm text-[#A0A0A0] mt-1 text-center">
                Cuando tus estudiantes suban videos, los verás aquí para evaluarlos.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {pending.map((v) => {
                const study = allStudies.find((s) => s.study_id === v.study_id);
                const studentName = study
                  ? `${study.first_name} ${study.last_name}`
                  : "Desconocido";
                return (
                  <Card
                    key={v.id}
                    className="rounded-[8px] p-4 flex items-center justify-between"
                  >
                    <div className="flex-1 mr-4">
                      <h3 className="text-lg font-medium text-[#333333]">
                        {v.original_filename}
                      </h3>
                      <div className="text-xs text-[#A0A0A0] mt-1">
                        {studentName} ·{" "}
                        {new Date(v.upload_date).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </div>
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
            <Card className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-200 rounded-lg">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <p className="text-lg font-medium text-[#333333]">
                No hay videos evaluados
              </p>
              <p className="text-sm text-[#A0A0A0] mt-1 text-center">
                Una vez que evalúes videos, sus resultados aparecerán aquí.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {evaluated.map((v) => {
                const study = allStudies.find((s) => s.study_id === v.study_id);
                const studentName = study
                  ? `${study.first_name} ${study.last_name}`
                  : "Desconocido";
                return (
                  <Card
                    key={v.id}
                    className="rounded-[8px] p-4 flex items-center justify-between"
                  >
                    <div className="flex-1 mr-4">
                      <h3 className="text-lg font-medium text-[#333333]">
                        {v.original_filename}
                      </h3>
                      <div className="text-xs text-[#A0A0A0] mt-1">
                        {studentName} ·{" "}
                        {new Date(v.evaluated_at!).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}{" "}
                        · {v.score}/10
                      </div>
                    </div>
                    <Button>Ver</Button>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsPanel>
      </TabsContainer>
    </div>
  );
}