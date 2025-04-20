import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Video } from '../../types/video';
import { config } from '../../config/config';

interface FetchResponse {
  videos?: Video[];
  clips?: Video[];
}

export function useStudyVideos(studyId?: string) {
  const params = useParams<{ id: string }>();
  const study_id = studyId ?? params.id;

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!study_id) {
      setError('No se proporcionó ID de estudio');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const resp = await fetch(
          `${config.SERVER_URL}/study/${study_id}/videos`
        );
        if (!resp.ok) {
          throw new Error(`Error ${resp.status} al obtener vídeos`);
        }
        const data: FetchResponse = await resp.json();
        setVideos(data.videos ?? data.clips ?? []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [study_id]);

  return { videos, loading, error, study_id };
}
