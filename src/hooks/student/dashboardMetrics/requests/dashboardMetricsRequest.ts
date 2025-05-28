import axios from 'axios'
import { config } from '../../../../config/config'
import { authService } from '../../../auth/authServices'

export interface StudentDashboardMetrics {
  monthlyScores: { mes: string; average_score: number }[]
  monthlyStudies: { mes: string; studies_count: number }[]
  monthlyVideos: { mes: string; videos_count: number }[]
  monthlyComments: { mes: string; comments_count: number }[]
  topStudies: { study_id: number; title: string; score: number }[]
  bottomStudies: { study_id: number; title: string; score: number }[]
  evaluations: { submitted_at: string; score: number }[]
}

export async function fetchDashboardMetrics(userId: number): Promise<StudentDashboardMetrics> {
  const token = authService.getToken()
  const { data } = await axios.get<StudentDashboardMetrics>(
    `${config.SERVER_URL}/metrics/${userId}/dashboard-metrics`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return data
}