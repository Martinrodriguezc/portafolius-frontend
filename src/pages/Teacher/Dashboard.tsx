import { useTeacherStats } from "../../hooks/teacher/useTeacherStats"
import { useTeacherVideos } from "../../hooks/teacher/useTeacherVideos"
import { authService } from "../../hooks/authServices"
import TabsContainer from "../../components/common/Tabs/TabsContainer"
import TabsList from "../../components/common/Tabs/TabsList"
import TabsButton from "../../components/common/Tabs/TabsButton"
import TabsPanel from "../../components/common/Tabs/TabsPanel"
import Card from "../../components/common/Card/Card"
import Button from "../../components/common/Button/Button"

export default function TeacherDashboard() {
  const user = authService.getCurrentUser()
  const lastName = user?.last_name || ""
  const { stats, loading: statsLoading, error: statsError } = useTeacherStats()
  const { pending, evaluated, loading: vidsLoading, error: vidsError } =
    useTeacherVideos()

  if (statsLoading || vidsLoading) return <p className="p-8">Cargando…</p>
  if (statsError) return <p className="p-8 text-red-500">Error: {statsError}</p>
  if (vidsError) return <p className="p-8 text-red-500">Error: {vidsError}</p>
  if (!stats) return null

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard de Profesor</h1>
        <p className="text-gray-500">Bienvenido de nuevo, Dr. {lastName}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex flex-col space-y-2">
            <h3 className="text-xl font-bold">Pendientes</h3>
            <p className="text-sm">Videos por evaluar</p>
            <span className="text-2xl font-bold">{stats.pendingCount}</span>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col space-y-2">
            <h3 className="text-xl font-bold">Evaluados</h3>
            <p className="text-sm">Hoy</p>
            <span className="text-2xl font-bold">{stats.evaluatedToday}</span>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col space-y-2">
            <h3 className="text-xl font-bold">Estudiantes</h3>
            <p className="text-sm">Registrados</p>
            <span className="text-2xl font-bold">{stats.studentCount}</span>
          </div>
        </Card>
      </div>

      <TabsContainer defaultValue="pendiente" className="w-full">
        <TabsList className="mb-6">
          <TabsButton value="pendiente">Pendiente</TabsButton>
          <TabsButton value="evaluado">Evaluado</TabsButton>
        </TabsList>

        <TabsPanel value="pendiente">
          <div className="space-y-4">
            {pending.map((v) => (
              <Card
                key={v.id}
                className="p-4 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium">{v.original_filename}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(v.upload_date).toLocaleString()} ·{" "}
                    {v.duration_seconds}s
                  </p>
                </div>
                <Button onClick={() => {}}>
                  Evaluar
                </Button>
              </Card>
            ))}
          </div>
        </TabsPanel>

        <TabsPanel value="evaluado">
          <div className="space-y-4">
            {evaluated.map((v) => (
              <Card
                key={v.id}
                className="p-4 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium">{v.original_filename}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(v.evaluated_at!).toLocaleString()} · {v.score}/10
                  </p>
                </div>
                <Button onClick={() => {}}>
                  Ver
                </Button>
              </Card>
            ))}
          </div>
        </TabsPanel>
      </TabsContainer>
    </div>
  )
}