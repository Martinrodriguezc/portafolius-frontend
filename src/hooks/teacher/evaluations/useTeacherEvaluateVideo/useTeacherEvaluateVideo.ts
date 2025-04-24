import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EvaluationForm } from "../../../../types/evaluation";
import { fetchVideoMeta, fetchVideoUrl } from "../../../video/utils/requests";
import { evaluationService } from "../evaluationService/evaluationService";
import { Video } from "../../../../types/VideoTypes";

export function useTeacherEvaluateVideo() {
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
        if (err instanceof Error) setError(err.message);
        else setError("Error al cargar vídeo");
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
        console.log(err);
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
    return () => {
      vid.removeEventListener("timeupdate", onTime);
    };
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
      navigate("/teacher/evaluations");
    } catch (err: unknown) {
      console.log(err);
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
