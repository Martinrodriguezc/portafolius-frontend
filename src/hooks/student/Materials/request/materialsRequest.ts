import axios, { AxiosResponse } from "axios";
import { config } from "../../../../config/config";
import { authService } from "../../../auth/authServices";
import type { StudentMaterial } from "../../../../types/studentMaterial";

export async function fetchStudentMaterials(
  studentId: number
): Promise<StudentMaterial[]> {
  const response: AxiosResponse<StudentMaterial[]> = await axios.get(
    `${config.SERVER_URL}/materials/${studentId}`,
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
      validateStatus: () => true,
    }
  );
  if (response.status !== 200) {
    throw new Error(`Error ${response.status} al cargar materiales`);
  }
  return response.data;
}