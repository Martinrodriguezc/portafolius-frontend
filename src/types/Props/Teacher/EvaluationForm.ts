export interface EvaluationFormProps {
  score: number;
  feedback: string;
  setScore(n: number): void;
  setFeedback(s: string): void;
  onSubmit(): void;
  submitting: boolean;
  existing: boolean;
}