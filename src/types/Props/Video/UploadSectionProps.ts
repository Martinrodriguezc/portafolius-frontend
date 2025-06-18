import React from "react";
import { FileWithMetadata } from "../../../types/File";

export interface UploadSectionProps {
  files: FileWithMetadata[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  updateFileProtocol: (index: number, protocolKey: string) => void;
  updateFileWindow: (index: number, windowId: number) => void;
  updateFileFinding: (index: number, findingId: number) => void;
  updateFileDiagnosis: (index: number, diagnosisId: number) => void;
  updateFileSubdiagnosis: (index: number, subdiagnosisId: number) => void;
  updateFileSubSub: (index: number, subSubId: number) => void;
  updateFileThirdOrder: (index: number, thirdOrderId: number) => void;
  updateFileReady: (idx: number, isReady: boolean) => void;
  updateFileComment: (idx: number, comment: string) => void;
}