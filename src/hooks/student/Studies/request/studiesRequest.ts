import axios, { AxiosResponse } from 'axios';
import { config } from '../../../../config/config';
import { RawStudy } from '../../../../types/Study';
import { authService } from '../../../auth/authServices';

interface ErrorResponse {
  message?: string;
  [key: string]: unknown;
}

export async function createNewStudy(
  userId: string,
  title: string,
  description: string
): Promise<string> {
  const endpoint = `${config.SERVER_URL}/study/${userId}/studies`;

  try {
    const response: AxiosResponse<{ study: { id: string } }> = await axios.post(
      endpoint,
      { title, description },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data.study.id;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const msg = (err.response.data as ErrorResponse).message;
      throw new Error(msg || `Error ${err.response.status} al crear el estudio`);
    }
    throw err;
  }
}

export async function fetchStudentStudies(
  userId: string
): Promise<RawStudy[]> {
  const token = authService.getToken();
  if (!token) throw new Error('No autorizado');

  try {
    const response: AxiosResponse<{ studies: RawStudy[] }> = await axios.get(
      `${config.SERVER_URL}/study/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        validateStatus: () => true,
      }
    );
    if (response.status !== 200) {
      throw new Error(`Error ${response.status} al obtener estudios`);
    }
    return response.data.studies;
  } catch (err) {
    if (axios.isAxiosError(err) && !err.response) {
      throw err;
    }
    throw err;
  }
}
