import axios, { AxiosResponse } from "axios";
import { config } from "../../../../../config/config";
import { authService } from "../../../../auth/authServices";
import { Material, CreateMaterialPayload } from "../../../../../types/material";
import { UserProps } from "../../../../../types/User";

export const fetchStudentsRequest = (): Promise<AxiosResponse<UserProps[]>> =>
  axios.get<UserProps[]>(
    `${config.SERVER_URL}/users?role=estudiante`,
    { headers: { Authorization: `Bearer ${authService.getToken()}` } }
  );

export const createMaterialRequest = (
  formData: FormData
): Promise<AxiosResponse<{ material: Material }>> =>
  axios.post<{ material: Material }>(
    `${config.SERVER_URL}/materials`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

export const createLinkRequest = (
  payload: CreateMaterialPayload
): Promise<AxiosResponse<{ material: Material }>> => {
  const fd = new FormData();
  fd.append("type", payload.type);
  fd.append("title", payload.title);
  fd.append("description", payload.description);
  fd.append("url", payload.url);
  fd.append("studentIds", JSON.stringify(payload.studentIds));
  return axios.post<{ material: Material }>(
    `${config.SERVER_URL}/materials`,
    fd,
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export interface MaterialStats {
  totalStudents: number;
  studentsWith: number;
  studentsWithout: number;
  totalMaterials: number;
}

export const fetchMaterialStatsRequest = (): Promise<AxiosResponse<MaterialStats>> =>
  axios.get<MaterialStats>(
    `${config.SERVER_URL}/materials/summary`,
    { headers: { Authorization: `Bearer ${authService.getToken()}` } }
  );