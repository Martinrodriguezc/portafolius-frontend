import { TeacherStudent } from "./studentType";
import { Study } from "./Study";

export interface TeacherProfile {
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  department: string;
  specialty: string;
  bio: string;
  avatar: string;
}

export interface PlatformSettingsType {
  autoAssign: boolean;
  notifyNewStudies: boolean;
  showScores: boolean;
  allowComments: boolean;
  defaultProtocol: string;
}

export interface EvaluationSettingsType {
  evaluationTemplate: string;
  minScore: number;
  maxVideosPerDay: number;
  autoPublish: boolean;
}

export interface TeacherStats {
  pendingCount: number;
  evaluatedToday: number;
  studentCount: number;
}

export interface StudentProfileViewProps {
  student: TeacherStudent;
  studies: Study[];
  loadingStudies: boolean;
  errorStudies: string;
}
