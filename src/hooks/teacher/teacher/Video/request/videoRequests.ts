import axios, { AxiosResponse } from 'axios';
import { config } from '../../../../../config/config';
import { TeacherVideo } from '../../../../../types/VideoTypes';
import { authService } from '../../../../auth/authServices';

export async function fetchTeacherVideos(
  teacherId: number
): Promise<{ pending: TeacherVideo[]; evaluated: TeacherVideo[] }> {
  const token = authService.getToken();
  if (!token) {
    throw new Error('No autorizado');
  }

  const url = `${config.SERVER_URL}/teacher/${teacherId}/videos`;
  const response: AxiosResponse<{ pending: TeacherVideo[]; evaluated: TeacherVideo[] }> =
    await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
      validateStatus: () => true,
    });

  if (response.status !== 200) {
    throw new Error(`Error ${response.status} al obtener vídeos`);
  }

  return response.data;
}
