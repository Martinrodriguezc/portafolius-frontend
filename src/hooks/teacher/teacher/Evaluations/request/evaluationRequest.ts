import axios, { AxiosResponse } from 'axios';
import { config } from '../../../../../config/config';
import { Evaluation } from '../../../../../types/evaluation';

export async function fetchPendingEvaluations(
  teacherId: number
): Promise<Evaluation[]> {
  const url = `${config.SERVER_URL}/teacher/${teacherId}/evaluations/pending`;
  const response: AxiosResponse<{ pending: Evaluation[] }> = await axios.get(url, {
    validateStatus: () => true,
  });
  if (response.status !== 200) {
    throw new Error(`Error ${response.status} al obtener pendientes`);
  }
  return response.data.pending;
}

export async function fetchCompletedEvaluations(
  teacherId: number
): Promise<Evaluation[]> {
  const url = `${config.SERVER_URL}/teacher/${teacherId}/evaluations/completed`;
  const response: AxiosResponse<{ completed: Evaluation[] }> = await axios.get(url, {
    validateStatus: () => true,
  });
  if (response.status !== 200) {
    throw new Error(`Error ${response.status} al obtener completadas`);
  }
  return response.data.completed;
}
