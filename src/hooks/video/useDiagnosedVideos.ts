import { useEffect, useState } from "react";
import { getDiagnosedVideos } from "../../components/diagnosis/DiagnosisService";


export const useDiagnosedVideos = () => {
  const [diagnosedIds, setDiagnosedIds] = useState<string[]>([]);

  useEffect(() => {
    getDiagnosedVideos()
      .then(setDiagnosedIds)
      .catch((err) =>
        console.error("Error al obtener diagnósticos:", err)
      );
  }, []);

  return diagnosedIds;
};
