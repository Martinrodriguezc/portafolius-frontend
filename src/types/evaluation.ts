export interface EvaluationForm {
    id: number;
    study_id: number;
    teacher_id: number;
    submitted_at: string;
    score: number;
    feedback_summary: string;
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