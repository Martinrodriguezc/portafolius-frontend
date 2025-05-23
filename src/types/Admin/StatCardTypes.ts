import { ReactNode } from 'react';

export interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  trend: string;
  trendUp: boolean;
  subtitle: string;
} 