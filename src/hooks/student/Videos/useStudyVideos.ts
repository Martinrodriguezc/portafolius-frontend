import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Video } from "../../../types/VideoTypes";
import { fetchStudyVideos } from "./request/videosRequest";
import { fetchVideoMeta } from "../../../hooks/video/utils/requests";


export function useStudyVideos(studyId?: string) {
  const params = useParams<{ id: string }>();
  const id = studyId ?? params.id;

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setError("No se proporcionó ID de estudio");
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const basic: Video[] = await fetchStudyVideos(id);
        const enriched = await Promise.all(
          basic.map(async (v) => {
            const meta: Video = await fetchVideoMeta(String(v.id));
            return {
              ...v,
              protocol:    meta.protocol,
              upload_date: meta.upload_date, 
              duration_seconds: meta.duration_seconds,
            };
          })
        );

        setVideos(enriched);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  return { videos, loading, error, study_id: id };
}