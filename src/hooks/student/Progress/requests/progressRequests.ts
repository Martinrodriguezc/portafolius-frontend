import { config } from "../../../../config/config";
import { EvaluationForm } from "../../../../types/evaluation";
import { authService } from "../../../auth/authServices";
import { Study } from "../../Studies/useStudentStudies";

export const fetchStudies = async (userId: number): Promise<Study[]> => {
  console.log("Obteniendo estudios para userId:", userId);
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

  const { studies } = (await res.json()) as { studies: Study[] };
  return studies;
};

export const fetchEvaluations = async (
  userId: number
): Promise<EvaluationForm[]> => {
  console.log("Obteniendo evaluaciones para userId:", userId);
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
  if (!res.ok) throw new Error(`Error ${res.status} al obtener evaluaciones`);

  return (await res.json()) as EvaluationForm[];
};
