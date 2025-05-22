import { useTeacherEvaluateVideo } from "../../hooks/teacher/evaluations/useTeacherEvaluateVideo/useTeacherEvaluateVideo";
import { useAllStudies }     from "../../hooks/teacher/useAllStudies/useAllStudies";
import LoadingState           from "../../components/teacher/EvaluateVideo/LoadingState";
import ErrorState             from "../../components/teacher/EvaluateVideo/ErrorState";
import PageHeader             from "../../components/teacher/EvaluateVideo/PageHeader";
import VideoSection           from "../../components/teacher/EvaluateVideo/VideoSection";
import EvaluationForm         from "../../components/teacher/EvaluateVideo/EvaluationForm";
import ExistingEvaluationCard from "../../components/teacher/EvaluateVideo/ExistingEvaluationCard";

export default function EvaluateVideoPage() {
  const {
    videoRef, url, meta, existing, loading, error,
    score, feedback, setScore, setFeedback,
    submitting, isPlaying, progress, isFullscreen,
    togglePlay, handleSeek, toggleFullscreen, onSubmit
  } = useTeacherEvaluateVideo();

  const { pending, completed } = useAllStudies();
  const allStudies = [...pending, ...completed];
  const currentStudy = meta
    ? allStudies.find(s => s.study_id === meta.study_id)
    : undefined;

  if (loading || !meta) return <LoadingState />;
  if (error)           return <ErrorState error={error} />;

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <PageHeader meta={meta} />

      <div className="flex flex-col lg:flex-row gap-6">
        <VideoSection
          url={url} videoRef={videoRef}
          isPlaying={isPlaying} togglePlay={togglePlay}
          progress={progress} handleSeek={handleSeek}
          isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen}
          meta={meta} currentStudy={currentStudy}
        />

        <EvaluationForm
          score={score} feedback={feedback}
          setScore={setScore} setFeedback={setFeedback}
          onSubmit={onSubmit} submitting={submitting}
          existing={!!existing}
        />

        {existing && <ExistingEvaluationCard existing={existing} />}
      </div>
    </div>
  );
}
