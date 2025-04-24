import { useEffect, useState } from "react";
import { authService } from "../../hooks/auth/authServices";
import { useTeacherStats } from "../../hooks/teacher/teacher/Stats/useTeacherStats";
import { useTeacherVideos } from "../../hooks/teacher/teacher/Video/useTeacherVideos";
import TabsContainer from "../../components/common/Tabs/TabsContainer";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsPanel from "../../components/common/Tabs/TabsPanel";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";

export default function TeacherDashboard() {
  const [lastName, setLastName] = useState(() => {
    const u = authService.getCurrentUser();
    return u?.last_name ?? "";
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const user = (e as CustomEvent).detail;
      setLastName(user.last_name);
    };
    window.addEventListener("userUpdated", handler);
    return () => window.removeEventListener("userUpdated", handler);
  }, []);

  const { stats, loading: statsLoading, error: statsError } = useTeacherStats();
  const {
    pending,
    evaluated,
    loading: vidsLoading,
    error: vidsError,
  } = useTeacherVideos();

  if (statsLoading || vidsLoading) return <p className="p-8">Cargando…</p>;
  if (statsError)
    return <p className="p-8 text-red-500">Error: {statsError}</p>;
  if (vidsError) return <p className="p-8 text-red-500">Error: {vidsError}</p>;
  if (!stats) return null;

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
          {pending.map((v) => (
            <Card key={v.id} className="p-4 flex justify-between">
              <div>
                <h4>{v.original_filename}</h4>
                <p className="text-sm text-gray-500">
                  {new Date(v.upload_date).toLocaleString()} ·{" "}
                  {v.duration_seconds}s
                </p>
              </div>
              <Button>Evaluar</Button>
            </Card>
          ))}
        </TabsPanel>

        <TabsPanel value="evaluado">
          {evaluated.map((v) => (
            <Card key={v.id} className="p-4 flex justify-between">
              <div>
                <h4>{v.original_filename}</h4>
                <p className="text-sm text-gray-500">
                  {new Date(v.evaluated_at!).toLocaleString()} · {v.score}/10
                </p>
              </div>
              <Button>Ver</Button>
            </Card>
          ))}
        </TabsPanel>
      </TabsContainer>
    </div>
  );
}
