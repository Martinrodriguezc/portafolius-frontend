import axios, { AxiosResponse } from "axios";
import { Material } from "../../../../types/material";
import { config } from "../../../../config/config";
import { authService } from "../../../../hooks/auth/authServices";

// Función auxiliar para verificar si el usuario es admin o profesor
const checkAdminOrTeacherPermission = () => {
  const token = authService.getToken();
  if (!token) {
    throw new Error("No hay token de autenticación. Por favor, inicia sesión nuevamente.");
  }
  
  return token;
};

export const fetchAllMaterials = async (): Promise<Material[]> => {
  const url = `${config.SERVER_URL}/materials/all`;
  
  const token = checkAdminOrTeacherPermission();
  
  const response: AxiosResponse<{success: boolean, data: Material[]}> = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.data.success) {
    return [];
  }
  
  return response.data.data;
};

export const createMaterial = async (materialData: Partial<Material>): Promise<Material> => {
  const token = checkAdminOrTeacherPermission();
  
  const response: AxiosResponse<{success: boolean, message: string, data: Material}> = await axios.post(
    `${config.SERVER_URL}/materials`,
    materialData,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  
  return response.data.data;
};

export const updateMaterial = async (id: number, materialData: Partial<Material>): Promise<Material> => {
  const token = checkAdminOrTeacherPermission();
  
  const response: AxiosResponse<{success: boolean, message: string, data: Material}> = await axios.put(
    `${config.SERVER_URL}/materials/${id}`,
    materialData,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  
  return response.data.data;
};

export const deleteMaterial = async (id: number): Promise<void> => {
  const token = checkAdminOrTeacherPermission();
  
  await axios.delete(`${config.SERVER_URL}/materials/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}; 