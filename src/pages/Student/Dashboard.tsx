import { Link } from "react-router-dom";
import {
  MessageSquare,
  BarChart2,
  BookOpen,
  Video,
  Calendar,
  FileText,
} from "lucide-react";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import { authService } from "../../hooks/auth/authServices";
import { useRecentComments } from "../../hooks/student/RecentComments/useRecentComments";

export default function StudentDashboard() {
  const user = authService.getCurrentUser()!;
  const { comments, loading, error } = useRecentComments(Number(user.id));

  return (
    <div className="p-8 space-y-12">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">
          ¡Bienvenido, {user.first_name}!
        </h1>
        <Link to="/student/comments">
          <Button>Ver todos los comentarios</Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 auto-rows-fr">
        <section className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <MessageSquare className="mr-2 text-gray-600" /> Últimos comentarios
          </h2>
          <Card className="flex-1 bg-gray-50 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            {loading && (
              <p className="p-6 text-sm text-gray-500">Cargando comentarios…</p>
            )}
            {error && (
              <p className="p-6 text-sm text-red-500">Error: {error}</p>
            )}
            {!loading && !error && comments.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full p-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-500 mb-4">
                  No hay comentarios recientes.
                </p>
                <Link to="/student/studies">
                  <Button variant="outline">Ver tus estudios</Button>
                </Link>
              </div>
            )}
            <div className="overflow-y-auto p-6 space-y-4 h-full">
              {comments.map(({ id, text, author, date }) => (
                <div
                  key={id}
                  className="group bg-white p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <p className="text-base text-gray-700 mb-3 leading-relaxed">
                    {text}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="font-medium">{author}</span>
                    <span>{date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <BarChart2 className="mr-2 text-gray-600" /> Curva de aprendizaje
          </h2>
          <Card className="flex-1 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex flex-col items-center justify-center p-8">
            <BarChart2 className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-sm text-gray-400 mb-4">
              Gráfica de progreso (próximamente)
            </p>
            <Link to="/student/progress">
              <Button variant="outline">Ver detalles</Button>
            </Link>
          </Card>
        </section>
      </div>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <BookOpen className="mr-2 text-gray-600" /> Recursos recomendados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <BookOpen className="h-6 w-6 text-blue-500 mb-3" />,
              title: "Guía de anatomía",
              desc: "Repasa las estructuras clave antes de continuar.",
              link: "/student/resources/anatomy",
            },
            {
              icon: <Video className="h-6 w-6 text-green-500 mb-3" />,
              title: "Tutorial en video",
              desc: "Aprende técnicas de evaluación paso a paso.",
              link: "/student/resources/video",
            },
            {
              icon: <BarChart2 className="h-6 w-6 text-purple-500 mb-3" />,
              title: "Estadísticas",
              desc: "Consulta tu rendimiento histórico y tendencias.",
              link: "/student/resources/stats",
            },
          ].map(({ icon, title, desc, link }) => (
            <Card
              key={title}
              className="group flex flex-col items-start p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
            >
              {icon}
              <h3 className="font-medium text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500 mt-2">{desc}</p>
              <Link to={link} className="mt-4">
                <Button size="sm" variant="outline">
                  Ver recurso
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar className="mr-2 text-gray-600" /> Próximos eventos
        </h2>
        <ul className="space-y-4">
          {[
            { title: "Webinar de Ultrasonido", date: "28 abr · 18:00" },
            { title: "Mesa redonda de Anatomía", date: "30 abr · 16:00" },
            { title: "Workshop interactivo", date: "02 may · 10:00" },
          ].map((evt) => (
            <li key={evt.title}>
              <Card className="flex items-center p-4 hover:bg-gray-50 transition">
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

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FileText className="mr-2 text-gray-600" /> Artículos recomendados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Anatomía Avanzada",
              desc: "Profundiza en detalles estructurales clave.",
              link: "/student/articles/anatomy-advanced",
              color: "indigo",
            },
            {
              title: "Técnicas de Ultrasonido",
              desc: "Consejos y mejores prácticas en imagenología.",
              link: "/student/articles/ultrasound-techniques",
              color: "teal",
            },
            {
              title: "Interpretación de Resultados",
              desc: "Guía práctica para análisis de hallazgos.",
              link: "/student/articles/result-interpretation",
              color: "pink",
            },
          ].map(({ title, desc, link, color }) => (
            <Card
              key={title}
              className="group flex flex-col items-start p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
            >
              <FileText className={`h-6 w-6 text-${color}-500 mb-3`} />
              <h3 className="font-medium text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500 mt-2">{desc}</p>
              <Link to={link} className="mt-4">
                <Button size="sm" variant="outline">
                  Leer artículo
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
