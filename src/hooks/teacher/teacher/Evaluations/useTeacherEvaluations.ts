import { useEffect, useState } from "react";
import type { Evaluation } from "../../../../types/evaluation";
import {
  fetchCompletedEvaluations,
  fetchPendingEvaluations,
} from "./request/evaluationRequest";

export function useTeacherEvaluations(teacherId: number) {
  const [pending, setPending] = useState<Evaluation[]>([]);
  const [completed, setCompleted] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        const [p, c] = await Promise.all([
          fetchPendingEvaluations(teacherId),
          fetchCompletedEvaluations(teacherId),
        ]);
        setPending(p);
        setCompleted(c);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error loading evaluations");
        }
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [teacherId]);

  return { pending, completed, loading, error };
}
