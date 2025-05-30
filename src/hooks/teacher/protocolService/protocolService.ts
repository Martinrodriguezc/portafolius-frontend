import type { Protocol } from '../../../types/protocol';
import { fetchProtocolRequest } from './request/protocolServiceRequest';

export const protocolService = {
  get(key: string): Promise<Protocol> {
    return fetchProtocolRequest(key);
  },
};
