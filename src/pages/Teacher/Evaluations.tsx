// TeacherEvaluationsLayout.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, CheckCircle, Clock, Lightbulb } from "lucide-react";
import Card from "../../components/common/Card/Card";
import TabsContainer from "../../components/common/Tabs/TabsContainer";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsPanel from "../../components/common/Tabs/TabsPanel";
import Button from "../../components/common/Button/Button";
import { useAllStudies } from "../../hooks/teacher/useAllStudies/useAllStudies";
import { ErrorDisplay } from "../../components/common/Error/Error";
import { Badge } from "../../components/common/Badge/Badge";

export default function TeacherEvaluationsLayout() {
  const { pending, completed, loading, error } = useAllStudies();

  if (loading) return <p className="p-8">Cargando…</p>;
  if (error)
    return (
      <p className="p-8 text-red-500">
        <ErrorDisplay error={error} />
      </p>
    );

  // Panel wrapper
  const Panel: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-8">
      {children}
    </div>
  );

  const total = pending.length + completed.length;
  const avg =
    completed.length > 0
      ? (completed.reduce((sum, s) => sum + s.score, 0) / completed.length).toFixed(1)
      : "0.0";

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header + stats */}
      <Panel>
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Evaluaciones</h1>
          <p className="text-gray-500">Historial de tus evaluaciones</p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Total */}
          <div className="flex items-center p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow">
            <div className="p-3 bg-blue-500 rounded-full mr-4">
              <Badge className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-800">Totales</p>
              <p className="text-3xl font-extrabold text-gray-900">{total}</p>
            </div>
          </div>

          {/* Pendientes */}
          <div className="flex items-center p-4 bg-gradient-to-r from-amber-100 to-amber-200 rounded-lg shadow">
            <div className="p-3 bg-amber-500 rounded-full mr-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-amber-800">Pendientes</p>
              <p className="text-3xl font-extrabold text-gray-900">{pending.length}</p>
            </div>
          </div>

          {/* Promedio */}
          <div className="flex items-center p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow">
            <div className="p-3 bg-green-500 rounded-full mr-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-800">Calif. Promedio</p>
              <p className="text-3xl font-extrabold text-gray-900">{avg}/10</p>
            </div>
          </div>
        </div>
      </Panel>


      {/* Tabs */}
      <Panel>
        <TabsContainer defaultValue="pending">
          <TabsList className="mb-4 border-b border-slate-200">
            <TabsButton value="pending">Pendientes</TabsButton>
            <TabsButton value="completed">Completadas</TabsButton>
          </TabsList>

          {/* Pending */}
          <TabsPanel value="pending">
            {pending.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                No hay evaluaciones pendientes
              </div>
            ) : (
              <div className="space-y-4">
                {pending.map((study) => (
                  <Card
                    key={study.study_id}
                    className="border-none shadow-sm rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-medium text-gray-800">
                          {study.first_name} {study.last_name}
                        </h3>
                        <span className="text-sm text-amber-600 uppercase">Pendiente</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(study.created_at).toLocaleDateString("es-ES")}
                        <span className="mx-2">•</span>
                        {study.description.toUpperCase()}
                      </div>
                    </div>
                    <Link to={`/teacher/evaluations/${study.study_id}/videos`}>
                      <Button fixedWidth>Ver videos</Button>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </TabsPanel>

          {/* Completed */}
          <TabsPanel value="completed">
            {completed.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                No hay evaluaciones completadas
              </div>
            ) : (
              <div className="space-y-4">
                {completed.map((study) => (
                  <Card
                    key={study.study_id}
                    className="border-none shadow-sm rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-medium text-gray-800">
                          {study.first_name} {study.last_name}
                        </h3>
                        <span className="flex items-center text-sm text-green-600 uppercase gap-1">
                          <CheckCircle className="h-4 w-4" /> Completada
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(study.created_at).toLocaleDateString("es-ES")}
                        <span className="mx-2">•</span>
                        <strong className="mr-1">Estudio:</strong> {study.title || "—"}
                        <span className="mx-2">•</span>
                        <strong className="mr-1">Desc.:</strong> {study.description.toUpperCase()}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <span className="block text-sm text-gray-500">Calif.</span>
                        <span className="block text-xl font-semibold text-blue-600">
                          {study.score}/10
                        </span>
                      </div>
                      <Link to={`/teacher/evaluations/${study.study_id}/videos`}>
                        <Button fixedWidth>Ver videos</Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsPanel>
        </TabsContainer>
      </Panel>

      {/* Suggestions when no evaluations */}
      {total === 0 && (
        <Panel>
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <Lightbulb className="h-12 w-12 text-blue-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Sin evaluaciones aún
              </h2>
              <p className="text-gray-500 mb-4 max-w-md">
                Tus estudiantes aún no han subido videos. Invítalos a que comiencen a grabar y subir sus evaluaciones.
              </p>
              <Link to="/teacher/invite-students">
                <Button fixedWidth>Invitar estudiantes</Button>
              </Link>
            </div>
          </div>
        </Panel>
      )}

      {/* Suggestions when few evaluations */}
      {total > 0 && total <= 3 && (
        <Panel>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Sugerencias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Lightbulb className="h-6 w-6 text-blue-500 mt-1" />
              <div>
                <h3 className="font-medium text-gray-800">
                  Revisa guías de evaluación
                </h3>
                <p className="text-sm text-gray-500">
                  Asegúrate de conocer los criterios antes de comenzar.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-amber-500 mt-1" />
              <div>
                <h3 className="font-medium text-gray-800">
                  Prioriza evaluaciones
                </h3>
                <p className="text-sm text-gray-500">
                  Completa primero las evaluaciones pendientes para mantener a tus estudiantes al día.
                </p>
              </div>
            </div>
          </div>
        </Panel>
      )}
    </div>
  );
}
