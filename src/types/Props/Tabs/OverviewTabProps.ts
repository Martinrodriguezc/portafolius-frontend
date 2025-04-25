export interface OverviewTabProps {
  monthlyProgress: {
    month: string;
    studies: number;
    score: number;
  }[];
  protocolPerformance: {
    protocol: string;
    studies: number;
    score: number;
  }[];
}
