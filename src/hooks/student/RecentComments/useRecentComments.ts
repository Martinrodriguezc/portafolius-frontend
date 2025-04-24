import { useEffect, useState } from "react";
import { fetchRecentComments } from "./requests/recentCommentsRequest";
import { RecentComment } from "../../../types/RecentComment";


export function useRecentComments(userId: number) {
  const [comments, setComments] = useState<RecentComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRecentComments(userId);
        setComments(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  return { comments, loading, error };
}
