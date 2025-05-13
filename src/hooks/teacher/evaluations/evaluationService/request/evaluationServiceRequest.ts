import axios, { AxiosResponse } from 'axios';
import { config } from '../../../../../config/config';
import { EvaluationForm } from '../../../../../types/evaluation';

export async function fetchAllEvaluations(): Promise<EvaluationForm[]> {
  const token = localStorage.getItem('auth_token') ?? '';
  const response: AxiosResponse<{ evaluations: EvaluationForm[] }> =
    await axios.get(`${config.SERVER_URL}/evaluations`, {
      headers: { Authorization: `Bearer ${token}` },
      validateStatus: () => true,
    });
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.data.evaluations;
}

export async function createEvaluationRequest(
  studyId: number,
  score: number,
  feedback: string
): Promise<EvaluationForm> {
  const token = localStorage.getItem('auth_token') ?? '';
  const response: AxiosResponse<EvaluationForm> =
    await axios.post(
      `${config.SERVER_URL}/evaluations/${studyId}`,
      { score, feedback_summary: feedback },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        validateStatus: () => true,
      }
    );
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.data;
}

export async function fetchEvaluationByStudyId(
  studyId: number
): Promise<EvaluationForm> {
  const response: AxiosResponse<{ evaluation: EvaluationForm }> =
    await axios.get(`${config.SERVER_URL}/evaluations/by-study/${studyId}`, {
      validateStatus: () => true,
    });
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.data.evaluation;
}

export async function updateEvaluationRequest(
  id: number,
  score: number,
  feedback: string
): Promise<EvaluationForm> {
  const token = localStorage.getItem('auth_token') ?? '';
  const response: AxiosResponse<EvaluationForm> =
    await axios.put(
      `${config.SERVER_URL}/${id}`,
      { score, feedback_summary: feedback },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        validateStatus: () => true,
      }
    );
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.data;
}
