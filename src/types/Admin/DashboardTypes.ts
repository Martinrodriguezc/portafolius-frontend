export interface DashboardStats {
  users: {
    total: number;
    newLastWeek: number;
    growthPercentage: number;
    roleDistribution: {
      role: string;
      count: number;
    }[];
  };
  evaluations: {
    total: number;
    newLastWeek: number;
    growthPercentage: number;
  };
  studies: {
    total: number;
    newLastWeek: number;
    growthPercentage: number;
    statusDistribution: {
      status: string;
      count: number;
    }[];
  };
} 