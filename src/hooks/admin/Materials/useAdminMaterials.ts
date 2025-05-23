import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Material } from "../../../types/material";
import { 
  fetchAllMaterials, 
  createMaterial, 
  updateMaterial, 
  deleteMaterial 
} from "./request/materialsRequest";

export const useAdminMaterials = (type?: string) => {
  const queryFn = async () => {
    const allMaterials = await fetchAllMaterials();
    
    if (type && type.trim() !== '') {
      const filteredMaterials = allMaterials.filter(material => material.type === type);
      return filteredMaterials;
    }
    
    return allMaterials;
  };
  
  return useQuery<Material[]>({
    queryKey: ["admin-materials", type],
    queryFn,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useCreateMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newMaterial: Partial<Material>) => createMaterial(newMaterial),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-materials"] });
    }
  });
};

export const useUpdateMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, material }: { id: number; material: Partial<Material> }) => 
      updateMaterial(id, material),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-materials"] });
    }
  });
};

export const useDeleteMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteMaterial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-materials"] });
    }
  });
}; 