import axios from 'axios'
import { config } from '../../../../../config/config'
import { authService } from '../../../../auth/authServices'

export interface ProtocolCount {
  protocol: string
  count: number
}

export interface TeacherStudentStats {
  protocolCounts: ProtocolCount[]
}

export async function fetchStudentStats(
  studentId: number
): Promise<TeacherStudentStats> {
  const token = authService.getToken()
  const { data } = await axios.get<TeacherStudentStats>(
    `${config.SERVER_URL}/metrics/${studentId}/student-stats`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return data
}