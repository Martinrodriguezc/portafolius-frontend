import axios, { AxiosResponse } from 'axios';
import { config } from '../../../../config/config';
import { Video } from '../../../../types/VideoTypes';

export async function fetchStudyVideos(studyId: string): Promise<Video[]> {
  const url = `${config.SERVER_URL}/study/${studyId}/videos`;

  const response: AxiosResponse<{ videos?: Video[]; clips?: Video[] }> =
    await axios.get(url, {
      validateStatus: () => true,
    });

  if (response.status !== 200) {
    throw new Error(`Error ${response.status} al obtener vídeos`);
  }

  const { clips, videos } = response.data;
  return clips ?? videos ?? [];
}
