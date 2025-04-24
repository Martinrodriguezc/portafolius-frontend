export interface VideoPlayerProps {
  src: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  togglePlay: () => void;
  progress: number;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}
