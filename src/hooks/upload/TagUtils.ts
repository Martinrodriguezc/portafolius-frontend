import { useState, useEffect } from 'react';
import { config } from '../../config/config';
import { Condition, Organ, Structure } from '../../types/tag';

export function useTagOptions() {
  const [organs, setOrgans] = useState<Organ[]>([]);
  const [structures, setStructures] = useState<Structure[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTagData() {
      try {
        const res = await fetch(`${config.SERVER_URL}/video/tag_utils`);
        if (!res.ok) throw new Error(`Error ${res.status} al cargar opciones de tags`);
        const data = await res.json() as { organs: Organ[]; structures: Structure[]; conditions: Condition[] };
        setOrgans(data.organs);
        setStructures(data.structures);
        setConditions(data.conditions);
      } catch (err: any) {
        console.error('Error al cargar tag utils:', err);
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }
    fetchTagData();
  }, []);

  return { organs, structures, conditions, loading, error };
}
