import axios, { AxiosResponse } from 'axios';
import { config } from '../../../config/config';
import {
  ListResponsesResponse
} from '../../../types/attempt';

interface CreateResponsePayload {
  protocol_item_id: number;
  score: number;
}

export async function createResponseRequest(
  attemptId: number,
  payload: CreateResponsePayload
): Promise<void> {
  const token = localStorage.getItem('auth_token') ?? '';
  const response: AxiosResponse<{ msg: string }> =
    await axios.post(
      `${config.SERVER_URL}/attempts/${attemptId}/responses`,
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
}

export async function listResponsesRequest(
  attemptId: number
): Promise<ListResponsesResponse> {
  const token = localStorage.getItem('auth_token') ?? '';
  const response: AxiosResponse<ListResponsesResponse> =
    await axios.get(
      `${config.SERVER_URL}/attempts/${attemptId}/responses`,
      {
        headers: { Authorization: `Bearer ${token}` },
        validateStatus: () => true,
      }
    );
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.data;
}
