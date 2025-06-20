import { useRef, useState, useEffect } from "react";

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

  // Generate previewUrl if file is provided
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    // If using previewUrl prop, don't need to manage object URL
    setLocalUrl(previewUrl || null);
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
    togglePlay,
    toggleFullscreen,
    handleTimeUpdate,
    handleVideoEnded,
    handleSeek,
    stopPropagation,
  };
}; 