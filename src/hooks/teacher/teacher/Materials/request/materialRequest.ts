import axios, { AxiosResponse } from "axios";
import { config } from "../../../../../config/config";
import { authService } from "../../../../auth/authServices";
import { Material } from "../../../../../types/material";

export const fetchStudentsRequest = (): Promise<AxiosResponse<any[]>> =>
  axios.get(`${config.SERVER_URL}/users?role=estudiante`, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });

export const createMaterialRequest = (
  formData: FormData
): Promise<AxiosResponse<{ material: Material }>> =>
  axios.post(`${config.SERVER_URL}/materials`, formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });

export const createLinkRequest = (
  payload: {
    type: string;
    title: string;
    description: string;
    url: string;
    studentIds: number[];
  }
): Promise<AxiosResponse<{ material: Material }>> => {
  const fd = new FormData();
  fd.append("type", payload.type);
  fd.append("title", payload.title);
  fd.append("description", payload.description);
  fd.append("url", payload.url);
  fd.append("studentIds", JSON.stringify(payload.studentIds));
  return axios.post(`${config.SERVER_URL}/materials`, fd, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export interface MaterialStats {
  totalStudents: number;
  studentsWith: number;
  studentsWithout: number;
  totalMaterials: number;
}

export const fetchMaterialStatsRequest = (): Promise<AxiosResponse<MaterialStats>> =>
  axios.get(`${config.SERVER_URL}/materials/summary`, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });