import { useState, useEffect } from 'react';
import { fetchTagOptions } from './tagsRequests/requests';
import { Condition, Organ, Structure } from '../../types/tag';

export function useTagOptions() {
  const [organs, setOrgans] = useState<Organ[]>([]);
  const [structures, setStructures] = useState<Structure[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchTagOptions()
      .then(data => {
        if (!mounted) return;
        setOrgans(data.organs);
        setStructures(data.structures);
        setConditions(data.conditions);
      })
      .catch(err => {
        const msg = err instanceof Error ? err.message : 'Error';
        if (mounted) setError(msg);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { organs, structures, conditions, loading, error };
}