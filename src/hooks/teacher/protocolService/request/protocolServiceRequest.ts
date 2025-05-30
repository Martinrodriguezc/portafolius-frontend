import axios, { AxiosResponse } from 'axios';
import { config } from '../../../../config/config';
import { Protocol } from '../../../../types/protocol';

export async function fetchProtocolRequest(key: string): Promise<Protocol> {
  const response: AxiosResponse<Protocol> =
    await axios.get(`${config.SERVER_URL}/protocols/${key}`, {
      validateStatus: () => true,
    });
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.data;
}
