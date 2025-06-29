export interface PreUploadPlayerProps {
  file?: File;
  previewUrl?: string;
  className?: string;
}

export interface VideoCarouselProps {
  files: { file: File }[];
  className?: string;
} 