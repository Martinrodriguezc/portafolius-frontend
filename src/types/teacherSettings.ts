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
