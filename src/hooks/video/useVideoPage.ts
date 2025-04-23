import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVideoUrl, postComment, fetchVideoMeta } from "./utils/requests";
import { Video } from "../../types/video";

export function useVideoPage() {
  const { id } = useParams<{ id: string }>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoUrl, setVideoUrl] = useState<string>("");
  const [meta, setMeta] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setError("No se proporcionó ID de vídeo");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const [url, videoMeta] = await Promise.all([
          fetchVideoUrl(id),
          fetchVideoMeta(id),
        ]);
        setVideoUrl(url);
        setMeta(videoMeta);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Registro los listeners cada vez que cambie la URL del video
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const updateProgress = () => {
      if (!vid.duration) return;
      const percent = (vid.currentTime / vid.duration) * 100;
      setProgress(percent);
    };

    vid.addEventListener("loadedmetadata", updateProgress);
    vid.addEventListener("timeupdate", updateProgress);

    return () => {
      vid.removeEventListener("loadedmetadata", updateProgress);
      vid.removeEventListener("timeupdate", updateProgress);
    };
  }, [videoUrl]);

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
    const seekTo = (Number(e.target.value) / 100) * vid.duration;
    vid.currentTime = seekTo;
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

  const handleSubmitComment = async () => {
    if (!id || !comment.trim()) return;
    try {
      await postComment(id, comment.trim());
      setComment("");
      const updated = await fetchVideoMeta(id);
      setMeta(updated);
    } catch (err) {
      console.error("Error comentando:", err);
    }
  };

  return {
    videoRef,
    videoUrl,
    meta,
    loading,
    error,
    isPlaying,
    togglePlay,
    progress,
    handleSeek,
    isFullscreen,
    toggleFullscreen,
    comment,
    setComment,
    handleSubmitComment,
  };
}
