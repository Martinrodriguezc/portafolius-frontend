import { useQuery } from '@tanstack/react-query'
import { fetchDashboardMetrics, StudentDashboardMetrics } from './requests/dashboardMetricsRequest'

export function useDashboardMetrics(userId: number) {
  return useQuery<StudentDashboardMetrics>({
    queryKey: ['studentDashboard', userId],
    queryFn: () => fetchDashboardMetrics(userId),
    staleTime: 300_000,
  })
}