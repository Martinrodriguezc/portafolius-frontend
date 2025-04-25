import { useState, useEffect } from "react";
import axios from "axios";
import { Tag, TagResponse } from "../../types/tag";
import { config } from "../../config/config";

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const response = await axios.get<TagResponse>(
          `${config.SERVER_URL}/video/tags`
        );
        console.log("TAGS SON:", response.data);

        if (response.data.success) {
          setTags(response.data.tags);
          setError(null);
        } else {
          throw new Error(response.data.msg || "Error al obtener tags");
        }
      } catch (error: unknown) {
        console.error("Error al obtener tags:", error);
        setError((error as Error).message || "Error al cargar los tags");
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return { tags, loading, error };
};
