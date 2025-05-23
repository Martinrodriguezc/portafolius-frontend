import axios from "axios";
import { config } from "../../../../config/config";
import { authService } from "../../../auth/authServices";
import type { StudentMaterial } from "../../../../types/studentMaterial";

export async function fetchStudentMaterials(
  studentId: number
): Promise<StudentMaterial[]> {
  const url = `${config.SERVER_URL}/materials/student/${studentId}/`;
  const response = await axios.get<StudentMaterial[]>(url, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
    validateStatus: () => true,
  });
  if (response.status !== 200) {
    throw new Error(`Error ${response.status}`);
  }
  return response.data;
}