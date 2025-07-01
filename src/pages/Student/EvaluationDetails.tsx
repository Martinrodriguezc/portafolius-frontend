import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, MessageSquare, User, Calendar, Sparkles } from "lucide-react";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import { useVideoEvaluation } from "../../hooks/student/evaluations/useVideoEvaluation";

export default function EvaluationDetails() {
  const { clipId } = useParams<{ clipId: string }>();
  const { evaluationData, loading, error } = useVideoEvaluation(Number(clipId));

  if (loading) {
    return (
      <div className="p-8 md:p-10 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to={`/student/${evaluationData?.studyId}/videos/${clipId}`}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
          <h1 className="text-2xl font-bold text-[#333333]">
            Detalles de Evaluación
          </h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="bg-slate-100 p-4 rounded-full mb-4 animate-pulse">
              <Star className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-slate-600">Cargando detalles de evaluación...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 md:p-10 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to={`/student/${evaluationData?.studyId}/videos/${clipId}`}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
          <h1 className="text-2xl font-bold text-[#333333]">
            Detalles de Evaluación
          </h1>
        </div>
        <Card className="p-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error al cargar la evaluación</p>
            <p className="text-slate-600">{error}</p>
          </div>
        </Card>
      </div>
    );
  }

  const hasEvaluation = evaluationData?.hasEvaluation && evaluationData?.evaluation;

  if (!hasEvaluation) {
    return (
      <div className="p-8 md:p-10 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to={`/student/${evaluationData?.studyId}/videos/${clipId}`}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
          <h1 className="text-2xl font-bold text-[#333333]">
            Detalles de Evaluación
          </h1>
        </div>
        <Card className="p-8">
          <div className="text-center">
            <p className="text-slate-600 mb-4">No se encontró evaluación para este video</p>
            <Link
              to={`/student/studies/${evaluationData?.studyId}/videos/${clipId}`}
            >
              <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white">
                Volver al video
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to={`/student/${evaluationData?.studyId}/videos/${clipId}`}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
        <h1 className="text-2xl font-bold text-[#333333]">
          Detalles de Evaluación
        </h1>
      </div>

      <div className="space-y-6">
        {/* Score Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#333333] flex items-center gap-2">
              <Star className="h-6 w-6 text-[#4E81BD]" />
              Calificación
            </h2>
            <div className="flex items-center gap-3">
              <div className="bg-[#4E81BD] text-white text-2xl font-bold h-16 w-16 rounded-full flex items-center justify-center">
                {evaluationData.evaluation!.score}
              </div>
              <span className="text-lg text-[#666666]">/ 10</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
            <div
              className="bg-[#4E81BD] h-3 rounded-full transition-all duration-500"
              style={{ width: `${(evaluationData.evaluation!.score / 10) * 100}%` }}
            ></div>
          </div>

          <p className="text-sm text-[#666666]">
            {evaluationData.evaluation!.score >= 8 ? "Excelente trabajo" :
              evaluationData.evaluation!.score >= 6 ? "Buen trabajo" :
                evaluationData.evaluation!.score >= 4 ? "Trabajo aceptable" :
                  "Necesita mejorar"}
          </p>
        </Card>

        {/* Feedback Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-[#333333] flex items-center gap-2 mb-4">
            <MessageSquare className="h-6 w-6 text-[#4E81BD]" />
            Retroalimentación Detallada
          </h2>
          <div className="bg-slate-50 border border-slate-200 rounded-[12px] p-6 text-[15px] text-[#333333] whitespace-pre-wrap leading-relaxed">
            {evaluationData.evaluation!.feedbackSummary ||
              "No hay retroalimentación detallada disponible para esta evaluación."}
          </div>
        </Card>

        {/* Evaluator Info */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-[#333333] flex items-center gap-2 mb-4">
            <User className="h-6 w-6 text-[#4E81BD]" />
            Información del Evaluador
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#4E81BD]/10 h-12 w-12 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-[#4E81BD]" />
              </div>
              <div>
                <p className="text-sm text-[#666666]">Evaluado por</p>
                <p className="text-lg font-medium text-[#333333]">
                  {evaluationData.evaluation!.teacherName || "Profesor"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#4E81BD]/10 h-12 w-12 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-[#4E81BD]" />
              </div>
              <div>
                <p className="text-sm text-[#666666]">Fecha de evaluación</p>
                <p className="text-lg font-medium text-[#333333]">
                  {evaluationData.evaluation!.submittedAt
                    ? new Date(evaluationData.evaluation!.submittedAt).toLocaleDateString(
                      "es-ES",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )
                    : "No disponible"}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Study Material Generation */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-[#333333] flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-[#4E81BD]" />
            Material de Estudio Personalizado
          </h2>
          <p className="text-[#666666] mb-6">
            Basándonos en tu evaluación, podemos generar material de estudio personalizado
            para ayudarte a mejorar en las áreas identificadas.
          </p>
          <div className="flex justify-center">
            <Link to={`/ia_beta/${clipId}`}>
              <Button className="w-full bg-gradient-to-r from-[#4E81BD] to-[#3B82F6] hover:from-[#4E81BD]/90 hover:to-[#3B82F6]/90 text-white px-6 py-3 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 text-lg">
                <Sparkles className="h-5 w-5" />
                GENERAR MATERIAL DE ESTUDIO CON IA (beta)
              </Button>
            </Link>
          </div>
        </Card>

        {/* Back to Video Button */}
        <div className="flex justify-center">
          <Link
            to={`/student/${evaluationData?.studyId}/videos/${clipId}`}
          >
            <Button variant="outline">
              Volver al video
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 