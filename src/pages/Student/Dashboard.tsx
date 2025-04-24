import { Link } from "react-router-dom";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import { authService } from "../../hooks/auth/authServices";
import { useRecentComments } from "../../hooks/student/RecentComments/useRecentComments";

export default function StudentDashboard() {
  const user = authService.getCurrentUser()!;
  const { comments, loading, error } = useRecentComments(Number(user.id)); //REVISAR

  return (
    <div className="p-8 space-y-12">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          ¡Bienvenido, {user.first_name}!
        </h1>
        <Link to="/student/comments">
          <Button>Ver todos los comentarios</Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Últimos comentarios
          </h2>
          {loading && (
            <p className="text-sm text-gray-500">Cargando comentarios…</p>
          )}
          {error && <p className="text-sm text-red-500">Error: {error}</p>}

          <div className="space-y-4">
            {!loading && !error && comments.length === 0 && (
              <Card className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 p-5">
                  No hay comentarios recientes.
                </p>
              </Card>
            )}

            {comments.map(({ id, text, author, date }) => (
              <Card
                key={id}
                className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="p-5">
                  <p className="text-base text-gray-700 mb-3 leading-relaxed">
                    {text}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="font-medium">{author}</span>
                    <span>{date}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Curva de aprendizaje
          </h2>
          <Card className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm h-80 flex items-center justify-center">
            <p className="text-sm text-gray-400">
              Gráfica de progreso (próximamente)
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}
