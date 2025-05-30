import { useState, useEffect } from "react";
import { Attempt } from "../../../../types/attempt";
import { attemptService } from "../../attemptService/attemptService";

export function useAttempts(clipId: number) {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading]   = useState<boolean>(true);
  const [error, setError]       = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const data = await attemptService.list(clipId);
        setAttempts(data);
      } catch (e: any) {
        setError(e.message || "Error cargando intentos");
      } finally {
        setLoading(false);
      }
    })();
  }, [clipId]);

  return { attempts, loading, error };
}

