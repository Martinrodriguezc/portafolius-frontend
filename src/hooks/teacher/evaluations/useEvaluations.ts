import { useEffect, useState } from "react";
import type { EvaluationForm } from "../../../types/evaluation";
import { evaluationService } from "./evaluationService/evaluationService";

export function useEvaluations() {
  const [all, setAll] = useState<EvaluationForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const evs = await evaluationService.getAll();
        setAll(evs);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const pending = all.filter((e) => !e.submitted_at);
  const completed = all.filter((e) => !!e.submitted_at);

  return { pending, completed, loading, error };
}
