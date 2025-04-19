// src/hooks/video/useVideoPage.ts
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVideoUrl, postComment } from "./utils/requests";

export function useVideoPage() {
  const { id } = useParams<{ id: string }>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoUrl, setVideoUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const [comment, setComment] = useState<string>("");

  // Load video URL
  useEffect(() => {
    if (!id) {
      setError("No se proporcionó ID de vídeo");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const url = await fetchVideoUrl(id);
        setVideoUrl(url);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Update progress on timeupdate
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
  }, [videoRef]);

  // Toggle play/pause
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

  // Seek to a new time
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    vid.currentTime = (Number(e.target.value) / 100) * vid.duration;
    setProgress(Number(e.target.value));
  };

  // Toggle fullscreen on container
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

  // Submit comment
  const handleSubmitComment = async () => {
    if (!id || !comment.trim()) return;
    try {
      await postComment(id, comment.trim());
      setComment("");
    } catch (err) {
      console.error("Error enviando comentario:", err);
    }
  };

  return {
    videoRef,
    videoUrl,
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
