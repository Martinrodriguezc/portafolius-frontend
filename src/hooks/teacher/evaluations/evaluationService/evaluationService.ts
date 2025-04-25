import type { EvaluationForm } from "../../../../types/evaluation";
import {
  createEvaluationRequest,
  fetchAllEvaluations,
  fetchEvaluationByStudyId,
  updateEvaluationRequest,
} from "./request/evaluationServiceRequest";

export const evaluationService = {
  getAll(): Promise<EvaluationForm[]> {
    return fetchAllEvaluations();
  },

  create(
    studyId: number,
    score: number,
    feedback: string
  ): Promise<EvaluationForm> {
    return createEvaluationRequest(studyId, score, feedback);
  },

  getByStudyId(studyId: number): Promise<EvaluationForm> {
    return fetchEvaluationByStudyId(studyId);
  },

  update(id: number, score: number, feedback: string): Promise<EvaluationForm> {
    return updateEvaluationRequest(id, score, feedback);
  },
};
