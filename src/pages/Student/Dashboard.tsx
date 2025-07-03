import { Link } from "react-router-dom";
import {
  MessageSquare,
  BarChart2,
  BookOpen,
  Calendar,
  FileText,
  Play,
  Download,
  ExternalLink,
  Globe,
} from "lucide-react";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import { authService } from "../../hooks/auth/authServices";
import { useRecentComments } from "../../hooks/student/RecentComments/useRecentComments";
import { useDashboardMetrics } from "../../hooks/student/dashboardMetrics/useDashboardMetrics";
import { useStudentMaterials } from "../../hooks/student/Materials/useStudentMaterials";
import { config } from "../../config/config";
import RankingTable from "../../components/student/metrics/tables/RankingTable";
import ProgressLineChart from "../../components/student/metrics/charts/ProgressLineChart";
import StatisticsTable from "../../components/student/metrics/tables/StatisticsTable";

export default function StudentDashboard() {
  const user = authService.getCurrentUser()!;
  const studentId = Number(user.id);
  const { comments, loading: commentsLoading, error: commentsError } =
    useRecentComments(studentId);
  const { data: m, isLoading: mLoading, error: mError } =
    useDashboardMetrics(studentId);
  const { data: materials = [] } = useStudentMaterials(studentId);

  let destacados: { study_id: number; title: string; score: number }[] = [];
  let oportunidad: { study_id: number; title: string; score: number }[] = [];
  if (m) {
    const map = new Map<
      number,
      { study_id: number; title: string; score: number }
    >();
    m.topStudies.concat(m.bottomStudies).forEach((s) => {
      if (!map.has(s.study_id)) {
        map.set(s.study_id, {
          study_id: s.study_id,
          title: s.title,
          score: s.score,
        });
      }
    });
    const all = Array.from(map.values());
    destacados = all.filter((s) => s.score >= 7.0);
    oportunidad = all.filter((s) => s.score < 7.0);
  }

  const progressData =
    m?.evaluations.map((s) => ({
      fecha: s.submitted_at,
      nota: s.score,
    })) ?? [];

  const notas = progressData.map((p) => p.nota);
  const promedio =
    notas.length > 0
      ? (notas.reduce((sum, x) => sum + x, 0) / notas.length).toFixed(2)
      : "—";

  const totalMaterials = materials.length;
  const lastThree = [...materials]
    .sort(
      (a, b) =>
        new Date(b.upload_date).getTime() -
        new Date(a.upload_date).getTime()
    )
    .slice(0, 3);

  const extractDomain = (url: string) => {
    try {
      const u = new URL(url.startsWith("http") ? url : `https://${url}`);
      return u.hostname.replace("www.", "");
    } catch {
      return url;
    }
  };
  const makeHref = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;


  const hasMetrics =
    !!m && (m.topStudies.length > 0 || m.bottomStudies.length > 0);

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
          <p className="mt-1 text-sm text-gray-500">
            Promedio de calificaciones
          </p>
        </Card>
        <Card className="flex flex-col items-center p-6">
          <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
          <p className="text-lg font-semibold text-gray-800">
            {totalMaterials}
          </p>
          <p className="text-sm text-gray-500">Materiales</p>
        </Card>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Calendar className="mr-2 text-gray-600" /> Estadísticas
        </h2>
        <StatisticsTable />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <BarChart2 className="mr-2 text-gray-600" /> Reportes
        </h2>
        {mLoading && <p>Cargando reportes…</p>}
        {mError && <p className="text-red-500">Error al cargar reportes</p>}
        {!mLoading && !mError && !hasMetrics && (
          <Card className="bg-white p-6">
            <p className="text-gray-500">No hay datos para mostrar</p>
          </Card>
        )}
        {hasMetrics && (
          <Card className="bg-white p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Estudios con mejor evaluación
                </h3>
                <RankingTable
                  data={destacados.map((x) => ({
                    id: x.study_id,
                    nombre: x.title,
                    valor: parseFloat(x.score.toFixed(1)),
                  }))}
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Estudios con oportunidad de mejora
                </h3>
                <RankingTable
                  data={oportunidad.map((x) => ({
                    id: x.study_id,
                    nombre: x.title,
                    valor: parseFloat(x.score.toFixed(1)),
                  }))}
                />
              </div>
            </div>
          </Card>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <BarChart2 className="mr-2 text-gray-600" /> Curva de aprendizaje
        </h2>
        <Card className="h-64 p-4 bg-white">
          <ProgressLineChart data={progressData} />
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <BookOpen className="mr-2 text-gray-600" /> Recursos recomendados
        </h2>

        {lastThree.length === 0 ? (
          <Card className="bg-white p-6">
            <p className="text-gray-500">
              Aún no tienes recursos asignados. Espera a que tu profesor los
              asigne.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lastThree.map((m) => {
              if (m.type === "document" || m.type === "video") {
                const Icon = m.type === "document" ? FileText : Play;
                return (
                  <Card key={m.id} className="p-6">
                    <Icon className="h-6 w-6 text-gray-600 mb-2" />
                    <h3 className="mt-2 font-medium text-gray-800">
                      {m.title}
                    </h3>
                    <p className="text-gray-500 mt-1 line-clamp-2">
                      {m.description}
                    </p>
                    <button
                      onClick={() =>
                        (window.location.href = `${config.SERVER_URL}/materials/download/${m.id}`)
                      }
                      className="inline-flex items-center gap-2 text-[#4E81BD] hover:text-[#2c5f9f] mt-4"
                    >
                      <Download className="h-4 w-4" /> Descargar
                    </button>
                  </Card>
                );
              }
              const href = makeHref(m.url);
              const domain = extractDomain(m.url);
              return (
                <Card key={m.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-800 line-clamp-2 flex-1">
                      {m.title}
                    </h3>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full hover:bg-[#4E81BD]/10 text-[#4E81BD] transition-colors ml-2"
                      title="Abrir enlace"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                  <div className="flex items-center mb-2 text-xs text-[#666666]">
                    <Globe className="h-3 w-3 mr-1 text-[#4E81BD]" />
                    <span>{domain}</span>
                  </div>
                  <p className="text-sm text-[#666666] mb-4 line-clamp-3">
                    {m.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-[#666666]">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>
                      {new Date(m.upload_date).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
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

    </div>
  );
}