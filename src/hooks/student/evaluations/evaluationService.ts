import { EvaluationCheckResponse } from "../../../types/evaluation";
import { checkEvaluationRequest } from "./request/evaluationRequest";
 
export const studentEvaluationService = {
  checkEvaluation(clipId: number): Promise<EvaluationCheckResponse> {
    return checkEvaluationRequest(clipId);
  },
}; 