import React from "react";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import { Textarea } from "../../components/common/Textarea/Textarea";
import VideoPlayer from "../../components/student/videos/VideoPlayer";
import { useTeacherEvaluateVideo } from "../../hooks/teacher/evaluations/useTeacherEvaluateVideo/useTeacherEvaluateVideo";

interface ExistingEvaluation {
  id: number;
  study_id: number;
  teacher_id: number;
  submitted_at: string;
  score: number;
  feedback_summary: string;
  created_at: string;
  protocol: string;
  title: string;
  student_first_name: string;
  student_last_name: string;
  teacher_name: string;
}

const TeacherEvaluateVideoPage: React.FC = () => {
  const {
    videoRef,
    url,
    meta,
    existing,
    loading,
    error,
    score,
    feedback,
    setScore,
    setFeedback,
    submitting,
    isPlaying,
    progress,
    isFullscreen,
    togglePlay,
    handleSeek,
    toggleFullscreen,
    onSubmit,
  } = useTeacherEvaluateVideo();

  if (loading) return <p className="p-8">Cargando…</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  return (
    <div className="p-8 flex flex-col lg:flex-row gap-6">
      {/* Video y Detalles del estudio */}
      <div className="w-full lg:w-2/3 space-y-4">
        <Card className="rounded-lg overflow-hidden">
          <VideoPlayer
            src={url}
            videoRef={videoRef}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            progress={progress}
            handleSeek={handleSeek}
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
          />
        </Card>

        <Card className="p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[#333] mb-2">
            Detalles del estudio
          </h3>
          <p className="text-sm text-[#555] mb-1">
            <strong>Estudiante:</strong> {meta?.order_index} {meta?.object_key}
          </p>
          <p className="text-sm text-[#555] mb-1">
            <strong>Título:</strong>{" "}
            {meta?.original_filename || "No disponible"}
          </p>
          <p className="text-sm text-[#555] mb-1">
            <strong>Protocolo:</strong>{" "}
            {meta?.original_filename?.toUpperCase() || "No especificado"}
          </p>
          <p className="text-sm text-[#555] mb-1">
            <strong>Archivo:</strong> {meta?.original_filename}
          </p>
        </Card>
      </div>

      {/* Formulario y Evaluación existente */}
      <div className="w-full lg:w-1/3">
        <Card className="p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Evaluación de Video</h2>
          <label className="block text-sm mb-1">Calificación (1–10):</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={score === 0 ? "" : score}
            onChange={(e) => {
              const val = e.target.value;
              const num = Number(val);
              if (val === "") {
                setScore(0);
              } else if (!isNaN(num) && num >= 1 && num <= 10) {
                setScore(num);
              }
            }}
            placeholder="Ingresa una nota del 1 al 10"
            className="w-full mb-4 px-3 py-2 border rounded"
          />
          <Textarea
            placeholder="Feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full min-h-[100px] mb-4"
          />
          <Button
            onClick={onSubmit}
            disabled={submitting || score < 1 || !feedback.trim()}
            className="w-full"
          >
            {existing ? "Actualizar evaluación" : "Enviar evaluación"}
          </Button>
        </Card>

        {/* Tarjeta que muestra la evaluación existente entregada */}
        {existing && (
          <Card className="mt-6 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Evaluación entregada</h3>
            <p className="text-sm">
              <strong>Calificación:</strong>{" "}
              {(existing as ExistingEvaluation).score}
            </p>
            <p className="text-sm">
              <strong>Feedback:</strong>{" "}
              {(existing as ExistingEvaluation).feedback_summary}
            </p>
            <p className="text-sm">
              <strong>Profesor:</strong>{" "}
              {(existing as ExistingEvaluation).teacher_name}
            </p>
            <p className="text-sm">
              <strong>Protocolo:</strong>{" "}
              {(existing as ExistingEvaluation).protocol}
            </p>
            <p className="text-sm">
              <strong>Título:</strong> {(existing as ExistingEvaluation).title}
            </p>
            <p className="text-xs text-gray-500">
              <strong>Fecha de envío:</strong>{" "}
              {new Date(
                (existing as ExistingEvaluation).submitted_at
              ).toLocaleString()}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TeacherEvaluateVideoPage;
