import type { Video } from '../../VideoTypes';
import type { StudyWithStatus } from '../../Study';

export interface VideoSectionProps {
  url: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  togglePlay(): void;
  progress: number;
  handleSeek(e: React.ChangeEvent<HTMLInputElement>): void;
  isFullscreen: boolean;
  toggleFullscreen(): void;
  meta: Video;
  currentStudy?: StudyWithStatus;
}