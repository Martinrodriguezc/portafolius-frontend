import axios, { AxiosResponse } from 'axios';
import { config } from '../../../../config/config';
import { RawStudy } from '../../../../types/Study';
import { EvaluationForm } from '../../../../types/evaluation';
import { authService } from '../../../auth/authServices';

export async function fetchStudies(userId: number): Promise<RawStudy[]> {
  const token = authService.getToken();
  if (!token) throw new Error('No autorizado');

  try {
    const response: AxiosResponse<{ studies?: RawStudy[] }> = await axios.get(
      `${config.SERVER_URL}/study/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.studies ?? [];
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const status = err.response.status;
      if (status === 401) throw new Error('No autorizado');
      throw new Error(`Error ${status} al obtener estudios`);
    }
    throw err;
  }
}

export async function fetchEvaluations(
  userId: number
): Promise<EvaluationForm[]> {
  const token = authService.getToken();
  if (!token) throw new Error('No autorizado');

  const response: AxiosResponse<
    EvaluationForm[] | { evaluations: EvaluationForm[] }
  > = await axios.get(
    `${config.SERVER_URL}/evaluations?studentId=${userId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      validateStatus: () => true,
    }
  );

  const { status, data } = response;
  if (status === 401) throw new Error('No autorizado');
  if (status === 204) return [];
  if (status !== 200) throw new Error(`Error ${status} al obtener evaluaciones`);

  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray((data as any).evaluations)) {
    return (data as any).evaluations;
  }
  return [];
}
