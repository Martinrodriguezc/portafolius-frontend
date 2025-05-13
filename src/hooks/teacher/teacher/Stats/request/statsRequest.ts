// src/hooks/teacher/evaluations/teacherStatsRequests.ts
import axios, { AxiosResponse } from 'axios';
import { config } from '../../../../../config/config';
import { TeacherStats } from '../../../../../types/Teacher';
import { authService } from '../../../../auth/authServices';

export async function fetchTeacherStats(
  teacherId: number
): Promise<TeacherStats> {
  const token = authService.getToken();
  if (!token) {
    throw new Error('No autorizado');
  }

  const url = `${config.SERVER_URL}/teacher/${teacherId}/stats`;
  const response: AxiosResponse<TeacherStats> = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    validateStatus: () => true,
  });

  if (response.status !== 200) {
    throw new Error(`Error ${response.status} al obtener estadísticas`);
  }

  return response.data;
}
