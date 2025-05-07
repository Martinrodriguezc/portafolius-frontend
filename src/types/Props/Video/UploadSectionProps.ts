import React from "react";

export interface FileWithMetadata {
  file: File;
  protocol: string;
  tags: string[];
  selectedOrgan: string;
  selectedStructure: string;
  selectedCondition: string;
}

export interface UploadSectionProps {
  files: File[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
}
