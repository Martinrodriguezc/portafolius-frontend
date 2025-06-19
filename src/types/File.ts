export interface FileWithMetadata {
  file: File;
  protocolKey: string;
  windowId?: number;
  findingId?: number;
  diagnosisId?: number;
  subdiagnosisId?: number;
  subSubId?: number;
  thirdOrderId?: number;
  comment?: string;
  isReady?: boolean;
  imageQualityId?: number;
  finalDiagnosisId?: number;
}