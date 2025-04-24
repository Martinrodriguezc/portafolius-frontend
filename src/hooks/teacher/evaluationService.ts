import { config } from "../../config/config";
import type { EvaluationForm } from "../../types/evaluation";

export const evaluationService = {
  async getAll(): Promise<EvaluationForm[]> {
    const res = await fetch(config.SERVER_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.evaluations;
  },

  async create(
    studyId: number,
    score: number,
    feedback: string
  ): Promise<EvaluationForm> {
    const res = await fetch(`${config.SERVER_URL}/${studyId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify({ score, feedback_summary: feedback }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  },

  async getByStudyId(studyId: number): Promise<EvaluationForm> {
    const res = await fetch(`${config.SERVER_URL}/evaluations/by-study/${studyId}`);
    console.log(res)
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.evaluation;
  },

  async update(
    id: number,
    score: number,
    feedback: string
  ): Promise<EvaluationForm> {
    const res = await fetch(`${config.SERVER_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify({ score, feedback_summary: feedback }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  },
};
