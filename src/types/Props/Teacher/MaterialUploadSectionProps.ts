export interface MaterialUploadSectionProps {
  accept: string;
  onFilesSelected: (files: FileList) => void;
  selectedFileNames?: string[];
  onRemoveFile?: (index: number) => void;
  maxSizeMb?: number;
}