import { useQuery } from '@tanstack/react-query'
import {
  fetchInteractionMetrics,
  InteractionMetrics,
} from './request/interactionMetricsRequest'

export function useInteractionMetrics(studentId: number) {
  return useQuery<InteractionMetrics[], Error>({
    queryKey: ['interactionMetrics', studentId],
    queryFn: () => fetchInteractionMetrics(studentId),
    enabled: !!studentId,
  })
}