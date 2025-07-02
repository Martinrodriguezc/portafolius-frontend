export interface EvaluationForm {
    id: number;
    study_id: number;
    teacher_id: number;
    submitted_at: string;
    score: number;
    feedback_summary: string;
    teacher_name: string;
  }

export interface Evaluation {
  id: number
  student: string
  protocol: string
  videos: number
  tags: string[]
  date: string
  score?: number
}

export interface EvaluationCheckResponse {
  clipId: number;
  studyId: number;
  hasEvaluation: boolean;
  evaluation?: {
    id: number;
    score: number;
    feedbackSummary: string | null;
    submittedAt: string;
    teacherName: string;
  };
}