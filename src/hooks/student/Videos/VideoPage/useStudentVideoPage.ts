import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { EvaluationForm } from "../../../../types/evaluation";
import { fetchVideoMeta, fetchVideoUrl } from "../../../video/utils/requests";
import { Video } from "../../../../types/Video";

export function useStudentVideoPage() {
  const { clipId, studyId } = useParams<{ clipId: string; studyId: string }>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [url, setUrl] = useState("");
  const [meta, setMeta] = useState<Video | null>(null);
  const [evaluation, setEvaluation] = useState<EvaluationForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!clipId) {
      setError("No se proporcionó ID de video");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const [videoUrl, videoMeta] = await Promise.all([
          fetchVideoUrl(clipId),
          fetchVideoMeta(clipId),
        ]);
        setUrl(videoUrl);
        setMeta(videoMeta);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [clipId, studyId]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onTime = () =>
      vid.duration && setProgress((vid.currentTime / vid.duration) * 100);
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
    vid.currentTime = (Number(e.target.value) / 100) * vid.duration;
    setProgress(Number(e.target.value));
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

  return {
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
    setEvaluation
  };
}
