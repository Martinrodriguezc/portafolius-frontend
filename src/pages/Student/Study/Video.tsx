import { ReturnButton } from "../../../components/common/Button/ReturnButton";
import Card from "../../../components/common/Card/Card";
import VideoPlayer from "../../../components/student/videos/VideoPlayer";
import { useStudentVideoPage } from "../../../hooks/student/Videos/VideoPage/useStudentVideoPage";
import { useStudentStudies } from "../../../hooks/student/Studies/useStudentStudies";
import { authService } from "../../../hooks/auth/authServices";

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

  const { studies, loading: studiesLoading } = useStudentStudies();
  const study = studies.find((s) => s.id === meta?.study_id);
  const currentUser = authService.getCurrentUser();
  const studentName = currentUser
    ? `${currentUser.first_name} ${currentUser.last_name}`
    : "";

  if (loading || studiesLoading) return <p className="p-8">Cargando…</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-center">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-[20px] font-bold text-[#333333]">
            {meta?.original_filename}
          </h1>
          <p className="text-[#A0A0A0]">
            Fecha de subida: {new Date(meta!.upload_date).toLocaleString()}
          </p>
        </div>
        <ReturnButton />
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
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
              <strong>Estudiante:</strong> {studentName}
            </p>
            <p className="text-sm text-[#555] mb-1">
              <strong>Título:</strong> {study?.title ?? "No disponible"}
            </p>
            <p className="text-sm text-[#555] mb-1">
              <strong>Protocolo:</strong>{" "}
              {meta?.protocol}
            </p>

          </Card>
        </div>

        <div className="w-full lg:w-1/3">
          <Card className="p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Evaluación</h3>
            {evaluation ? (
              <>
                <p className="text-sm text-[#555] mb-2">
                  <strong>Calificación:</strong> {evaluation.score}/10
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
    </div>
  );
}