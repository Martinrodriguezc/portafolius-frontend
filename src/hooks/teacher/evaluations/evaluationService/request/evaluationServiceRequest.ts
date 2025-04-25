import { config } from "../../../../../config/config";
import { EvaluationForm } from "../../../../../types/evaluation";

export const fetchAllEvaluations = async (): Promise<EvaluationForm[]> => {
  const res = await fetch(`${config.SERVER_URL}/evaluations`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    },
  });
  console.log("Obteniendo evaluaciones:", res)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data = (await res.json()) as { evaluations: EvaluationForm[] };
  return data.evaluations;
};

export const createEvaluationRequest = async (
  studyId: number,
  score: number,
  feedback: string
): Promise<EvaluationForm> => {
  const res = await fetch(`${config.SERVER_URL}/evaluations/${studyId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify({ score, feedback_summary: feedback }),
  });
  console.log("wena")
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()) as EvaluationForm;
};

export const fetchEvaluationByStudyId = async (
  studyId: number
): Promise<EvaluationForm> => {
  const res = await fetch(
    `${config.SERVER_URL}/evaluations/by-study/${studyId}`
  );
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data = (await res.json()) as { evaluation: EvaluationForm };
  return data.evaluation;
};

export const updateEvaluationRequest = async (
  id: number,
  score: number,
  feedback: string
): Promise<EvaluationForm> => {
  const res = await fetch(`${config.SERVER_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify({ score, feedback_summary: feedback }),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()) as EvaluationForm;
};
