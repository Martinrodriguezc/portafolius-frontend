import { useQuery } from "@tanstack/react-query";
import { fetchMaterialStatsRequest, MaterialStats } from "./request/materialRequest";

export function useMaterialStats() {
  return useQuery<MaterialStats>({
    queryKey: ["materialStats"],
    queryFn: async () => {
      const { data } = await fetchMaterialStatsRequest();
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}