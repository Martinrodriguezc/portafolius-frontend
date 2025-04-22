import { useEffect, useState } from 'react';
import { config } from '../../config/config';

export interface RecentComment {
  id: number;
  text: string;
  author: string;
  date: string;
  videoId: string;
}

export function useRecentComments(userId: number) {
  const [comments, setComments] = useState<RecentComment[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `${config.SERVER_URL}/study/${userId}/comments`
        );
        if (!resp.ok) throw new Error(`Error ${resp.status}`);
        const { comments } = await resp.json();
        setComments(comments);
      } catch (err: any) {
        setError(err.message || 'Error al cargar comentarios');
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  return { comments, loading, error };
}