import { useState, useEffect } from 'react';
import { Tag } from '../../types/tag';
import { fetchTags } from './tagsRequests/requests';

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchTags()
      .then(fetched => {
        if (!mounted) return;
        setTags(fetched);
        setError(null);
      })
      .catch(err => {
        if (mounted) setError(err instanceof Error ? err.message : 'Error al cargar los tags');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { tags, loading, error };
}
