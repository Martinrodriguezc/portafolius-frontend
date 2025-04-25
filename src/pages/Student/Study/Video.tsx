import { ReturnButton } from "../../../components/common/Button/ReturnButton";
import Card from "../../../components/common/Card/Card";
import VideoPlayer from "../../../components/student/videos/VideoPlayer";
import { useStudentVideoPage } from "../../../hooks/student/Videos/VideoPage/useStudentVideoPage";

export default function StudentVideoPage() {
  const {
    videoRef,
    url,
    meta,
    evaluation,
    loading,
    error,
    isPlaying,
    progress,
    isFullscreen,
    togglePlay,
    handleSeek,
    toggleFullscreen,
  } = useStudentVideoPage();

  if (loading) return <p className="p-8">Cargando…</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  return (
    <div className="p-8 flex flex-col gap-6">
      <header className="mb-8 flex justify-between items-center">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-[20px] font-bold text-[#333333]">
            {meta?.original_filename}
          </h1>
          <p className="text-[#A0A0A0]">Fecha de subida: {meta?.upload_date}</p>
        </div>
        <ReturnButton />
      </header>

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
            <strong>Estudiante:</strong> {meta?.original_filename}
          </p>
          <p className="text-sm text-[#555] mb-1">
            <strong>Título:</strong> {meta?.status || "No disponible"}
          </p>
          <p className="text-sm text-[#555] mb-1">
            <strong>Protocolo:</strong>{" "}
            {meta?.object_key?.toUpperCase() || "No especificado"}
          </p>
          <p className="text-sm text-[#555] mb-1">
            <strong>Archivo:</strong> {meta?.original_filename}
          </p>
        </Card>
      </div>

      <div className="w-full lg:w-2/3 space-y-4">
        <Card className="p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Evaluación</h2>
          {evaluation ? (
            <>
              <p className="text-sm text-[#555] mb-2">
                <strong>Profesor:</strong> {evaluation.feedback_summary}{" "}
                {evaluation.study_id}
              </p>
              <p className="text-sm text-[#555] mb-2">
                <strong>Calificación:</strong> {evaluation.score}/10
              </p>
              <p className="text-sm text-[#555] mb-1">
                <strong>Feedback:</strong>
              </p>
              <div className="border p-3 bg-gray-50 rounded text-sm text-[#333] whitespace-pre-wrap">
                {evaluation.feedback_summary}
              </div>
            </>
          ) : (
            <p className="text-[#A0A0A0]">
              Este video aún no ha sido evaluado.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
