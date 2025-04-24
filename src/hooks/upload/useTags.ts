import { useState, useEffect } from 'react';
import axios from 'axios';
import { Tag, TagResponse } from '../../types/tag';

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const response = await axios.get<TagResponse>(`${BACKEND_URL}/video/tags`);
        
        if (response.data.success) {
          setTags(response.data.tags);
          setError(null);
        } else {
          throw new Error(response.data.msg || 'Error al obtener tags');
        }
      } catch (error: unknown) {
        console.error('Error al obtener tags:', error);
        setError((error as Error).message || 'Error al cargar los tags');
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [BACKEND_URL]);

  return { tags, loading, error };
}; 