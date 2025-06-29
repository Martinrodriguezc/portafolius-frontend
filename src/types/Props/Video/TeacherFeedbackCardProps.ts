import { TeacherSelectionPayload } from "./TeacherSelectionPayload";

export interface TeacherFeedbackCardProps {
  teacherSelection: TeacherSelectionPayload;
  setTeacherSelection: React.Dispatch<React.SetStateAction<TeacherSelectionPayload>>;

  loadWindows: (protocolKey: string) => void;
  loadFindings: (protocolKey: string, windowId: number) => void;
  loadDiagnoses: (protocolKey: string, windowId: number, findingId: number) => void;
  loadSubdiagnoses: (protocolKey: string, diagnosisId: number) => void;
  loadSubSubs: (protocolKey: string, subId: number) => void;
  loadThirdOrders: (protocolKey: string, subSubId: number) => void;
  loadImageQualities: () => void;
  loadFinalDiagnoses: () => void;

  onSendInteraction: () => void;
}