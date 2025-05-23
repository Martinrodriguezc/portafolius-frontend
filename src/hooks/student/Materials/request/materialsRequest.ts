import axios from "axios";
import { config } from "../../../../config/config";
import { authService } from "../../../auth/authServices";
import type { StudentMaterial } from "../../../../types/studentMaterial";

export async function fetchStudentMaterials(
  studentId: number
): Promise<StudentMaterial[]> {
  const url = `${config.SERVER_URL}/materials/student/${studentId}`;
  const token = authService.getToken();
  const response = await axios.get<StudentMaterial[]>(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}