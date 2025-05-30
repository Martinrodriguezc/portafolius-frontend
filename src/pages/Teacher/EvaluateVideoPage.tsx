import { useAllStudies } from "../../hooks/teacher/useAllStudies/useAllStudies";
import { useTeacherEvaluateVideo } from "../../hooks/teacher/evaluations/useTeacherEvaluateVideo/useTeacherEvaluateVideo";
import LoadingState from "../../components/teacher/EvaluateVideo/LoadingState";
import ErrorState from "../../components/teacher/EvaluateVideo/ErrorState";
import PageHeader from "../../components/teacher/EvaluateVideo/PageHeader";
import VideoSection from "../../components/teacher/EvaluateVideo/VideoSection";
import ProtocolEvaluationForm from "../../components/teacher/EvaluateVideo/ProtocolEvaluationForm";

export default function EvaluateVideoPage() {
  const {
    videoRef,
    url,
    meta,
    loading,
    error,
    protocol,
    responses,
    updateScore,
    onSubmit,
    isPlaying,
    togglePlay,
    progress,
    handleSeek,
    isFullscreen,
    toggleFullscreen,
  } = useTeacherEvaluateVideo();

  const { pending, completed } = useAllStudies();
  const allStudies = [...pending, ...completed];
  const currentStudy = meta
    ? allStudies.find(s => s.study_id === meta.study_id)
    : undefined;

  if (loading || !meta) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!protocol) return <div className="p-8">Cargando protocolo…</div>;

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <PageHeader meta={meta} />

      <div className="flex flex-col lg:flex-row gap-6">
        <VideoSection
          url={url}
          videoRef={videoRef}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          progress={progress}
          handleSeek={handleSeek}
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
          meta={meta}
          currentStudy={currentStudy}
        />

        <ProtocolEvaluationForm
          protocol={protocol}
          responses={responses}
          updateScore={updateScore}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

