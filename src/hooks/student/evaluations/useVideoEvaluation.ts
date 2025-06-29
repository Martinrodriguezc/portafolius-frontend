import { useEffect, useState } from "react";
import { EvaluationCheckResponse } from "../../../types/evaluation";
import { studentEvaluationService } from "./evaluationService";

export function useVideoEvaluation(clipId: number) {
  const [evaluationData, setEvaluationData] = useState<EvaluationCheckResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await studentEvaluationService.checkEvaluation(clipId);
        setEvaluationData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error al cargar la evaluación");
        }
      } finally {
        setLoading(false);
      }
    };

    if (clipId) {
      fetchEvaluation();
    }
  }, [clipId]);

  return { evaluationData, loading, error };
} 