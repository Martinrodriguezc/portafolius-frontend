export interface StudentInteractionPayload {
  protocolKey: string;
  windowId?: number;
  findingId?: number;
  diagnosisId?: number;
  subdiagnosisId?: number;
  subSubId?: number;
  thirdOrderId?: number;
  comment?: string;
  isReady: boolean;
}

export interface ProfessorInteractionPayload {
  protocolKey?: string;
  windowId?: number;
  findingId?: number;
  diagnosisId?: number;
  subdiagnosisId?: number;
  subSubId?: number;
  thirdOrderId?: number;

  imageQualityId?: number;
  finalDiagnosisId?: number;
  professorComment?: string;
  isReady?: boolean;
}
export interface Interaction {
  id: number;
  clipId: number;
  userId: number;
  role: 'estudiante' | 'profesor';
  protocolKey?: string;
  windowId?: number;
  findingId?: number;
  diagnosisId?: number;
  subdiagnosisId?: number;
  subSubId?: number;
  thirdOrderId?: number;
  protocolName?: string;
  windowName?: string;
  findingName?: string;
  possibleDiagnosisName?: string;
  subdiagnosisName?: string;
  subSubName?: string;
  thirdOrderName?: string;
  comment?: string;
  isReady?: boolean;
  imageQualityId?: number;
  finalDiagnosisId?: number;
  professorComment?: string;
  imageQualityName?: string;
  finalDiagnosisName?: string;
  createdAt: string;
}