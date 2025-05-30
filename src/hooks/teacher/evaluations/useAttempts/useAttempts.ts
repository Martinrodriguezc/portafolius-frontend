import { useState, useEffect } from "react";
import { Attempt } from "../../../../types/attempt";
import { attemptService } from "../attemptService/attemptService";

export function useAttempts(clipId: number) {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const data = await attemptService.list(clipId);
        setAttempts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [clipId]);

  return { attempts, loading, error };
}
