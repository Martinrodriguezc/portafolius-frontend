import { TeacherSelectionPayload } from "./TeacherSelectionPayload";

export interface FileUploadRowTeacherProps {
  fileItem: TeacherSelectionPayload;
  index: number;
  removeFile: (idx: number) => void;
  updateFileProtocol: (idx: number, protocolKey: string) => void;
  updateFileWindow: (idx: number, windowId: number) => void;
  updateFileFinding: (idx: number, findingId: number) => void;
  updateFileDiagnosis: (idx: number, diagnosisId: number) => void;
  updateFileSubdiagnosis: (idx: number, subdiagnosisId: number) => void;
  updateFileSubSub: (idx: number, subSubId: number) => void;
  updateFileThirdOrder: (idx: number, thirdOrderId: number) => void;
  updateFileImageQuality: (idx: number, imageQualityId: number) => void;
  updateFileFinalDiagnosis: (idx: number, finalDiagnosisId: number) => void;
  updateFileComment: (idx: number, comment?: string) => void;
  updateFileReady: (idx: number, isReady: boolean) => void;
}