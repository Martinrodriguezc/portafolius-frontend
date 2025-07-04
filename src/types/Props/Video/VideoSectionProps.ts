import type { Video } from '../../VideoTypes';
import type { StudyWithStatus } from '../../Study';
import type { Interaction } from '../../../types/interaction';
import type { TeacherSelectionPayload } from '../../../types/Props/Video/TeacherSelectionPayload';

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

  interactions: Interaction[];
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