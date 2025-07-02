import axios, { AxiosResponse } from 'axios';
import { config } from '../../../../config/config';
import { EvaluationCheckResponse } from '../../../../types/evaluation';
import { authService } from '../../../auth/authServices';

export async function checkEvaluationRequest(clipId: number): Promise<EvaluationCheckResponse> {
  const token = authService.getToken();
  if (!token) throw new Error("No autorizado");

  const response: AxiosResponse<EvaluationCheckResponse> = await axios.get(
    `${config.SERVER_URL}/video/${clipId}/evaluation/check`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      validateStatus: () => true,
    }
  );

  const { status, data } = response;
  if (status === 401) throw new Error("No autorizado");
  if (status !== 200) throw new Error(`Error ${status} al verificar evaluación`);

  return data;
} 