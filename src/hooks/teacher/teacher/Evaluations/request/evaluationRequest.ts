import { config } from "../../../../../config/config";
import { Evaluation } from "../../../../../types/evaluation";

export const fetchPendingEvaluations = async (
  teacherId: number
): Promise<Evaluation[]> => {
  const res = await fetch(
    `${config.SERVER_URL}/teacher/${teacherId}/evaluations/pending`
  );
  if (!res.ok) {
    throw new Error(`Error ${res.status} al obtener pendientes`);
  }
  const data = (await res.json()) as { pending: Evaluation[] };
  return data.pending;
};

export const fetchCompletedEvaluations = async (
  teacherId: number
): Promise<Evaluation[]> => {
  const res = await fetch(
    `${config.SERVER_URL}/teacher/${teacherId}/evaluations/completed`
  );
  if (!res.ok) {
    throw new Error(`Error ${res.status} al obtener completadas`);
  }
  const data = (await res.json()) as { completed: Evaluation[] };
  return data.completed;
};
