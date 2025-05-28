import { Link } from "react-router-dom"
import {
  MessageSquare,
  BarChart2,
  BookOpen,
  Calendar
} from "lucide-react"
import Card from "../../components/common/Card/Card"
import Button from "../../components/common/Button/Button"
import { authService } from "../../hooks/auth/authServices"
import { useRecentComments } from "../../hooks/student/RecentComments/useRecentComments"
import { useDashboardMetrics } from "../../hooks/student/dashboardMetrics/useDashboardMetrics"
import RankingTable from "../../components/student/metrics/tables/RankingTable"
import ProgressLineChart from "../../components/student/metrics/charts/ProgressLineChart"

export default function StudentDashboard() {
  const user = authService.getCurrentUser()!
  const { comments, loading: commentsLoading, error: commentsError } =
    useRecentComments(Number(user.id))
  const { data: m, isLoading: mLoading, error: mError } =
    useDashboardMetrics(Number(user.id))

  const upcomingEvents = [
    { title: "Webinar de Ultrasonido", date: "28 abr · 18:00" },
    { title: "Mesa redonda de Anatomía", date: "30 abr · 16:00" },
    { title: "Workshop interactivo", date: "02 may · 10:00" }
  ]
  const resources = [
    {
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      title: "Guía de anatomía",
      desc: "Repasa las estructuras clave antes de continuar.",
      link: "/student/resources/anatomy"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-green-500" />,
      title: "Tutorial en video",
      desc: "Aprende técnicas de evaluación paso a paso.",
      link: "/student/resources/video"
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-purple-500" />,
      title: "Estadísticas",
      desc: "Consulta tu rendimiento histórico.",
      link: "/student/resources/stats"
    }
  ]

  let destacados: { study_id: number; title: string; score: number }[] = []
  let oportunidad: { study_id: number; title: string; score: number }[] = []
  if (m) {
    const map = new Map<number, { study_id: number; title: string; score: number }>()
    m.topStudies.concat(m.bottomStudies).forEach((s) => {
      if (!map.has(s.study_id)) {
        map.set(s.study_id, { study_id: s.study_id, title: s.title, score: s.score })
      }
    })
    const all = Array.from(map.values())
    destacados = all.filter((s) => s.score >= 7.0)
    oportunidad = all.filter((s) => s.score < 7.0)
  }

  const progressData =
    m?.evaluations.map((s) => ({
      fecha: s.submitted_at,
      nota: s.score
    })) ?? []

  // calcular promedio y variación
  const notas = progressData.map((p) => p.nota)
  const promedio =
    notas.length > 0
      ? (notas.reduce((sum, x) => sum + x, 0) / notas.length).toFixed(2)
      : "—"
  const variacion =
    notas.length > 1
      ? (((notas[notas.length - 1] - notas[0]) / notas[0]) * 100).toFixed(1)
      : "0.0"

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            ¡Bienvenido, {user.first_name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Revisa tu progreso y accede a tus recursos.
          </p>
        </div>
        <Link to="/student/comments">
          <Button variant="outline">Ver todos los comentarios</Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex flex-col items-center p-6">
          <MessageSquare className="h-8 w-8 text-indigo-500 mb-2" />
          <p className="text-lg font-semibold text-gray-800">
            {comments?.length ?? 0}
          </p>
          <p className="text-sm text-gray-500">Comentarios recientes</p>
        </Card>
        <Card className="flex flex-col items-center p-6">
          <BarChart2 className="h-8 w-8 text-green-500 mb-2" />
          <p className="text-lg font-semibold text-gray-800">
            {promedio}
          </p>
          <p className="mt-1 text-sm text-gray-500">Promedio de calificaciones</p>
        </Card>
        <Card className="flex flex-col items-center p-6">
          <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
          <p className="text-lg font-semibold text-gray-800">–</p>
          <p className="text-sm text-gray-500">Recursos</p>
        </Card>
        <Card className="flex flex-col items-center p-6">
          <Calendar className="h-8 w-8 text-teal-500 mb-2" />
          <p className="text-lg font-semibold text-gray-800">–</p>
          <p className="text-sm text-gray-500">Próximos eventos</p>
        </Card>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <BarChart2 className="mr-2 text-gray-600" /> Reportes
        </h2>
        {mLoading && <p>Cargando reportes…</p>}
        {mError && <p className="text-red-500">Error al cargar reportes</p>}
        {m && (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Estudios con mejor evaluación
              </h3>
              <RankingTable
                data={destacados.map((x) => ({
                  id: x.study_id,
                  nombre: x.title,
                  valor: x.score
                }))}
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Estudios con oportunidad de mejora
              </h3>
              <RankingTable
                data={oportunidad.map((x) => ({
                  id: x.study_id,
                  nombre: x.title,
                  valor: x.score
                }))}
              />
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-between">
          <span className="flex items-center">
            <BarChart2 className="mr-2 text-gray-600" /> Curva de aprendizaje
          </span>
          
        </h2>
        <Card className="h-64 p-4">
          <ProgressLineChart data={progressData} />
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <MessageSquare className="mr-2 text-gray-600" /> Últimos comentarios
        </h2>
        <Card className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-6">
          {commentsLoading && <p className="text-gray-500">Cargando comentarios…</p>}
          {commentsError && <p className="text-red-500">Error: {commentsError}</p>}
          {!commentsLoading && !commentsError && comments.length === 0 && (
            <div className="flex flex-col items-center py-12">
              <MessageSquare className="h-10 w-10 text-gray-300 mb-4" />
              <p className="text-gray-500">No hay comentarios recientes.</p>
              <Link to="/student/studies">
                <Button variant="outline" className="mt-4">
                  Ver tus estudios
                </Button>
              </Link>
            </div>
          )}
          <div className="space-y-4">
            {comments.map(({ id, text, author, date }) => (
              <div key={id} className="p-4 bg-white rounded-lg border hover:shadow">
                <p className="text-gray-700 mb-2 leading-relaxed">{text}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span className="font-medium">{author}</span>
                  <span>{date}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <BookOpen className="mr-2 text-gray-600" /> Recursos recomendados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map(({ icon, title, desc, link }) => (
            <Card key={title} className="p-6">
              {icon}
              <h3 className="mt-2 font-medium text-gray-800">{title}</h3>
              <p className="text-gray-500 mt-1">{desc}</p>
              <Link to={link} className="mt-4 inline-block">
                <Button size="sm" variant="outline">
                  Ver recurso
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Calendar className="mr-2 text-gray-600" /> Próximos eventos
        </h2>
        <ul className="space-y-4">
          {upcomingEvents.map((evt) => (
            <li key={evt.title}>
              <Card className="flex items-center p-4">
                <Calendar className="h-6 w-6 text-blue-500 mr-4" />
                <div>
                  <h3 className="font-medium text-gray-800">{evt.title}</h3>
                  <p className="text-sm text-gray-500">{evt.date}</p>
                </div>
                <Button className="ml-auto">Ir al evento</Button>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}