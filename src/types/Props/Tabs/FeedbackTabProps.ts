export interface FeedbackTabProps {
  recentFeedback: {
    id: number;
    date: string;
    protocol: string;
    score: number;
    comment: string;
  }[];
}
