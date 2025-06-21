import { useRef, useState, useEffect } from "react";
import { anonymizeVideoLocally } from "../upload/uploadRequests/requests";

interface UsePreUploadPlayerProps {
  file?: File;
  previewUrl?: string;
}

export const usePreUploadPlayer = ({ file, previewUrl }: UsePreUploadPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [localUrl, setLocalUrl] = useState<string | null>(null);
  const [isAnonymizing, setIsAnonymizing] = useState(false);
  const [anonymizationError, setAnonymizationError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocalUrl = async () => {
      if (file) {
        try {
          setIsAnonymizing(true);
          setAnonymizationError(null);
          const cleanedFile = await anonymizeVideoLocally(file);
          const url = URL.createObjectURL(cleanedFile);
          setLocalUrl(url);
          return () => URL.revokeObjectURL(url);
        } catch (error) {
          console.error("Error anonymizing video:", error);
          setAnonymizationError(error instanceof Error ? error.message : "Error al anonimizar el video");
          // Fallback to original file if anonymization fails
          const url = URL.createObjectURL(file);
          setLocalUrl(url);
          return () => URL.revokeObjectURL(url);
        } finally {
          setIsAnonymizing(false);
        }
      }
      // If using previewUrl prop, don't need to manage object URL
      setLocalUrl(previewUrl || null);
    };
    fetchLocalUrl();
  }, [file, previewUrl]);

  // Play/pause logic
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Fullscreen logic
  const toggleFullscreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (!isFullscreen) {
      if (video.requestFullscreen) video.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Track progress
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setProgress((video.currentTime / video.duration) * 100 || 0);
    setIsPlaying(!video.paused);
  };

  // Handle video ended
  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  // Seek logic
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const pct = Number(e.target.value);
    video.currentTime = (pct / 100) * video.duration;
    setProgress(pct);
  };

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return {
    videoRef,
    isPlaying,
    progress,
    isFullscreen,
    localUrl,
    isAnonymizing,
    anonymizationError,
    togglePlay,
    toggleFullscreen,
    handleTimeUpdate,
    handleVideoEnded,
    handleSeek,
    stopPropagation,
  };
}; 