import { Link } from "react-router-dom";
import {
  MessageSquare,
  AlertCircle,
  BookOpen,
  Lightbulb,
  Clock,
  Plus,
} from "lucide-react";
import { authService } from "../../hooks/auth/authServices";
import Button from "../../components/common/Button/Button";
import { useRecentComments } from "../../hooks/student/RecentComments/useRecentComments";
import { ReturnButton } from "../../components/common/Button/ReturnButton";
import Card from "../../components/common/Card/Card";

export default function CommentsPage() {
  const userId = authService.getCurrentUser()?.id ?? "";
  const { comments, loading, error } = useRecentComments(Number(userId));

  const PageHeader = () => (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-[#4E81BD]/10 p-2 rounded-full">
          <MessageSquare className="h-6 w-6 text-[#4E81BD]" />
        </div>
        <div>
          <h1 className="text-[24px] font-bold text-[#333333]">Todos los comentarios</h1>
          <p className="text-[#666666]">Lista completa de tus comentarios y acceso al video relacionado</p>
        </div>
      </div>
      <ReturnButton />
    </header>
  );

  // Loading state
  if (loading) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-[16px] shadow-sm border border-slate-100 p-10">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#4E81BD]/5 rounded-full animate-ping"></div>
            <div className="relative inline-block w-16 h-16 border-4 border-[#4E81BD]/20 border-t-[#4E81BD] rounded-full animate-spin"></div>
          </div>
          <p className="text-[18px] font-medium text-[#333333] mb-2">Cargando comentarios…</p>
          <p className="text-[#666666] text-center max-w-md">
            Estamos recuperando tus comentarios. Esto tomará solo un momento.
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />
        <div className="bg-red-50 border border-red-200 rounded-[16px] p-6 mb-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="h-7 w-7 text-red-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-[20px] font-semibold text-red-700 mb-3">
                No se pudieron cargar los comentarios
              </h2>
              <p className="text-[15px] text-red-600 mb-4">
                {error.toString() || "Ha ocurrido un error al obtener los comentarios."}
              </p>
              <ul className="list-disc pl-5 text-[14px] text-red-600 space-y-1">
                <li>Problemas de conexión a internet</li>
                <li>El servidor no responde</li>
                <li>Tu sesión ha expirado</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex justify-start">
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-[8px] flex items-center gap-2 shadow-sm transition-all"
            >
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Intentar nuevamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (comments.length === 0) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-[16px] shadow-sm border border-slate-100 p-10 text-center">
          <div className="bg-[#4E81BD]/10 p-6 rounded-full mb-6">
            <BookOpen className="h-12 w-12 text-[#4E81BD]" />
          </div>
          <h2 className="text-[22px] font-semibold text-[#333333] mb-3">No hay comentarios</h2>
          <p className="text-[16px] text-[#666666] mb-6 max-w-md">
            Aún no has hecho comentarios. Ve a tus estudios y deja tu primer comentario.
          </p>
          <Link to="/student/studies">
            <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[16px] font-medium py-3 px-8 rounded-[8px] shadow-sm flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Ver estudios
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Main list (with “few” suggestion)
  const hasFew = comments.length <= 3;

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <PageHeader />

      <div className="space-y-4">
        {comments.map((com) => (
          <Card
            key={com.id}
            className="bg-gray-100 border-none rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start gap-4"
          >
            <div className="flex-1">
              <p className="text-sm text-gray-800 mb-2">{com.text}</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span className="font-medium">{com.author}</span>
                <span>{com.date}</span>
              </div>
            </div>
            <Link to={`/student/${com.studyId}/videos/${com.videoId}`}>
              <Button className="bg-blue-600 hover:bg-blue-600/90 text-white text-sm font-medium py-2 px-3 rounded-lg">
                Ver video
              </Button>
            </Link>
          </Card>
        ))}
      </div>

      {hasFew && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="rounded-[16px] border border-slate-200 p-6 flex items-start gap-4">
            <Lightbulb className="h-6 w-6 text-[#4E81BD] mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-[#333333] mb-1">
                Da tu feedback
              </h3>
              <p className="text-sm text-[#666666]">
                Aprovecha tus estudios para dejar comentarios útiles y ayudar a tus compañeros.
              </p>
            </div>
          </Card>
          <Card className="rounded-[16px] border border-slate-200 p-6 flex items-start gap-4">
            <Clock className="h-6 w-6 text-amber-500 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-[#333333] mb-1">
                Revisa feedback pendiente
              </h3>
              <p className="text-sm text-[#666666]">
                Si ves pocos comentarios, vuelve más tarde—puede que tus videos estén en evaluación.
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
