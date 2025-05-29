import { useQuery } from '@tanstack/react-query'
import {
  fetchStudentStats,
  TeacherStudentStats
} from './request/statisticsRequest'

export function useStudentStats(studentId: number) {
  return useQuery<TeacherStudentStats>({
    queryKey: ['studentStats', studentId],
    queryFn: () => fetchStudentStats(studentId),
    enabled: studentId > 0,
  })
}