import { config } from "../../../../config/config";
import { RawStudy } from "../../../../types/Study";
import { EvaluationForm } from "../../../../types/evaluation";
import { authService } from "../../../auth/authServices";

export async function fetchStudies(userId: number): Promise<RawStudy[]> {
  const token = authService.getToken();
  if (!token) throw new Error("No autorizado");

  const res = await fetch(`${config.SERVER_URL}/study/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) throw new Error("No autorizado");
  if (!res.ok) throw new Error(`Error ${res.status} al obtener estudios`);

  const body = await res.json();
  return (body.studies ?? []) as RawStudy[];
}

export async function fetchEvaluations(
  userId: number
): Promise<EvaluationForm[]> {
  const token = authService.getToken();
  if (!token) throw new Error("No autorizado");

  const res = await fetch(
    `${config.SERVER_URL}/evaluations?studentId=${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 401) throw new Error("No autorizado");
  if (res.status === 204) return [];
  if (!res.ok) throw new Error(`Error ${res.status} al obtener evaluaciones`);

  const body = await res.json();

  if (Array.isArray(body)) return body as EvaluationForm[];
  if (body && Array.isArray(body.evaluations)) return body.evaluations;
  return [];
}