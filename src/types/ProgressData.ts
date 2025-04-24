export interface ProgressData {
  totalStudies: number;
  evaluatedStudies: number;
  pendingStudies: number;
  averageScore: number;
  monthlyProgress: { month: string; studies: number; score: number }[];
  protocolPerformance: { protocol: string; studies: number; score: number }[];
  recentFeedback: {
    id: number;
    date: string;
    protocol: string;
    score: number;
    comment: string;
  }[];
}
