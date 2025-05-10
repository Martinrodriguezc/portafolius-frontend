import React from "react";

export interface FileWithMetadata {
  file: File;
  protocol: string;
  selectedOrgan: string;
  selectedStructure: string;
  selectedCondition: string;
  tags: { id: number; text: string }[];
}

export interface UploadSectionProps {
  files: FileWithMetadata[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  updateFileProtocol: (index: number, protocol: string) => void;
  updateFileOrgan: (index: number, organId: string) => void;
  updateFileStructure: (index: number, structureId: string) => void;
  updateFileCondition: (index: number, conditionId: string) => void;
  addTagToFile: (index: number) => void;
  removeTagFromFile: (fileIndex: number, tagIndex: number) => void;
}
