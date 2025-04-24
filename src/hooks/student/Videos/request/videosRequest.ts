import { config } from "../../../../config/config";
import { Video } from "../../../../types/video";

export const fetchStudyVideos = async (studyId: string): Promise<Video[]> => {
  const resp = await fetch(`${config.SERVER_URL}/study/${studyId}/videos`);
  if (!resp.ok) {
    throw new Error(`Error ${resp.status} al obtener vídeos`);
  }
  const data = (await resp.json()) as {
    videos?: Video[];
    clips?: Video[];
  };
  return data.clips ?? data.videos ?? [];
};
