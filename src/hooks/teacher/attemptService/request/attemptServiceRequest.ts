import axios, { AxiosResponse } from 'axios';
import { config } from '../../../../config/config';
import {
  Attempt,
  CreateAttemptResponse,
  ListAttemptsResponse
} from '../../../../types/attempt';

interface CreateAttemptPayload {
  protocolKey: string;
  responses: { itemKey: string; score: number }[];
}

export async function createAttemptRequest(
  clipId: number,
  payload: CreateAttemptPayload
): Promise<CreateAttemptResponse> {
  const token = localStorage.getItem('auth_token') ?? '';
  const response: AxiosResponse<CreateAttemptResponse> =
    await axios.post(
      `${config.SERVER_URL}/clips/${clipId}/attempts`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        validateStatus: () => true,
      }
    );
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.data;
}

export async function listAttemptsRequest(
  clipId: number
): Promise<Attempt[]> {
  const token = localStorage.getItem('auth_token') ?? '';
  const response: AxiosResponse<ListAttemptsResponse> =
    await axios.get(`${config.SERVER_URL}/clips/${clipId}/attempts`, {
      headers: { Authorization: `Bearer ${token}` },
      validateStatus: () => true,
    });
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.data.attempts;
}
