import { config } from "../../../../config/config";
import { RawStudy } from "../../../../types/Study";
import { authService } from "../../../auth/authServices";

export const createNewStudy = async (
  userId: string,
  title: string,
  description: string
): Promise<string> => {
  console.log("Creando nuevo estudio para subir los archivos");

  const endpoint = `${config.SERVER_URL}/study/${userId}/studies`;
  console.log("Solicitando URL prefirmada a:", endpoint);

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });
    console.log("Respuesta recibida en POST study:", response);
  } catch (networkError) {
    console.log("Error en la creación del estudio:", networkError);
    throw networkError;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.log("Backend devolvió error:", {
      status: response.status,
      body: errorData,
    });
    throw new Error(errorData.message || "Error al crear el estudio");
  }

  const data = await response.json();
  const { study } = data;
  console.log("Estudio creado con éxito:", study);
  return study.id;
};

export const fetchStudentStudies = async (
  userId: string
): Promise<RawStudy[]> => {
  const token = authService.getToken();
  if (!token) throw new Error("No autorizado");

  const res = await fetch(`${config.SERVER_URL}/study/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status} al obtener estudios`);
  }

  const { studies } = (await res.json()) as { studies: RawStudy[] };
  return studies;
};
