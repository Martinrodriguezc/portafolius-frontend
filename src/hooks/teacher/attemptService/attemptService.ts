import type {
  Attempt,
  CreateAttemptResponse
} from '../../../types/attempt';
import {
  createAttemptRequest,
  listAttemptsRequest
} from './request/attemptServiceRequest';

export const attemptService = {
  create(
    clipId: number,
    payload: { protocolKey: string; responses: { itemKey: string; score: number }[] }
  ): Promise<CreateAttemptResponse> {
    return createAttemptRequest(clipId, payload);
  },

  list(clipId: number): Promise<Attempt[]> {
    return listAttemptsRequest(clipId);
  },
};
