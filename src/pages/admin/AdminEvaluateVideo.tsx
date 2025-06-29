import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ClipboardList, ArrowLeft } from "lucide-react";
import Button from "../../components/common/Button/Button";
import LoadingState from "../../components/teacher/EvaluateVideo/LoadingState";
import ErrorState from "../../components/teacher/EvaluateVideo/ErrorState";
import VideoSection from "../../components/teacher/EvaluateVideo/VideoSection/VideoSection";
import EvaluationFormComponent from "../../components/teacher/EvaluateVideo/EvaluationForm";
import ExistingEvaluationCard from "../../components/teacher/EvaluateVideo/ExistingEvaluationCard";
import { fetchVideoMeta, fetchVideoUrl } from "../../hooks/video/utils/requests";
import { evaluationService } from "../../hooks/teacher/evaluations/evaluationService/evaluationService";
import { useAllStudies } from "../../hooks/teacher/useAllStudies/useAllStudies";
import { Video } from "../../types/VideoTypes";
import type { EvaluationForm } from "../../types/evaluation";
import type { TeacherSelectionPayload } from "../../types/Props/Video/TeacherSelectionPayload";
import type { Interaction } from "../../types/interaction";

function useAdminEvaluateVideo() {
  const { studyId, clipId } = useParams<{ studyId: string; clipId: string }>();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [url, setUrl] = useState<string>("");
  const [meta, setMeta] = useState<Video | null>(null);
  const [existing, setExisting] = useState<EvaluationForm | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const loadMedia = async () => {
      if (!clipId) {
        setError("No se proporcionó ID de video");
        setLoading(false);
        return;
      }
      try {
        const [videoUrl, videoMeta] = await Promise.all([
          fetchVideoUrl(clipId),
          fetchVideoMeta(clipId),
        ]);
        setUrl(videoUrl);
        setMeta(videoMeta);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error al cargar vídeo");
      } finally {
        setLoading(false);
      }
    };
    loadMedia();
  }, [clipId]);

  useEffect(() => {
    const loadExisting = async () => {
      if (!studyId) return;
      try {
        const all = await evaluationService.getAll();
        const evalFor = all.find((e) => e.study_id === Number(studyId));
        if (evalFor) {
          setExisting(evalFor);
          setScore(evalFor.score);
          setFeedback(evalFor.feedback_summary);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadExisting();
  }, [studyId]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onTime = () => {
      if (vid.duration) {
        setProgress((vid.currentTime / vid.duration) * 100);
      }
    };
    vid.addEventListener("timeupdate", onTime);
    return () => vid.removeEventListener("timeupdate", onTime);
  }, []);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    const val = Number(e.target.value);
    vid.currentTime = (val / 100) * vid.duration;
    setProgress(val);
  };

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;
    if (!isFullscreen) {
      container.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const onSubmit = async () => {
    if (submitting || score < 1 || score > 10) return;
    setSubmitting(true);
    try {
      if (existing) {
        await evaluationService.update(existing.id, score, feedback);
      } else if (studyId) {
        await evaluationService.create(Number(studyId), score, feedback);
      }
      alert("Evaluación enviada exitosamente");
      navigate("/admin/evaluations");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return {
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
  };
}

function AdminPageHeader({ meta }: { meta: Video | null }) {
  return (
    <header className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div className="flex items-start gap-3">
        <div className="bg-[#4E81BD]/10 p-2 rounded-full mt-1">
          <ClipboardList className="h-6 w-6 text-[#4E81BD]" />
        </div>
        <div>
          <h1 className="text-[24px] font-bold text-[#333333] mb-1 line-clamp-1">
            {meta ? `Evaluación: ${meta.original_filename}` : "Evaluación de video"}
          </h1>
          <p className="text-[#666666]">
            {meta
              ? `Protocolo: ${meta.protocol} • Subido: ${new Date(
                  meta.upload_date
                ).toLocaleDateString()}`
              : "Cargando información del video..."}
          </p>
        </div>
      </div>
      <Link to={meta ? `/admin/evaluations/${meta.study_id}/videos/${meta.id}` : "#"}>
        <Button
          variant="outline"
          className="border-slate-300 text-[#333333] hover:bg-slate-50 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al video
        </Button>
      </Link>
    </header>
  );
}

export default function AdminEvaluateVideo() {
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
  } = useAdminEvaluateVideo();

  const { pending, completed } = useAllStudies();
  const allStudies = [...pending, ...completed];
  const currentStudy = meta ? allStudies.find((s) => s.study_id === meta.study_id) : undefined;

  const [teacherSelection, setTeacherSelection] = useState<TeacherSelectionPayload>({} as TeacherSelectionPayload);
  const emptyInteractions: Interaction[] = [];
  const noop = () => {};

  if (loading || !meta) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <AdminPageHeader meta={meta} />

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
          interactions={emptyInteractions}
          teacherSelection={teacherSelection}
          setTeacherSelection={setTeacherSelection}
          loadWindows={noop}
          loadFindings={noop}
          loadDiagnoses={noop}
          loadSubdiagnoses={noop}
          loadSubSubs={noop}
          loadThirdOrders={noop}
          loadImageQualities={noop}
          loadFinalDiagnoses={noop}
          onSendInteraction={noop}
        />

        <EvaluationFormComponent
          score={score}
          feedback={feedback}
          setScore={setScore}
          setFeedback={setFeedback}
          onSubmit={onSubmit}
          submitting={submitting}
          existing={!!existing}
        />

        {existing && <ExistingEvaluationCard existing={existing} />}
      </div>
    </div>
  );
}