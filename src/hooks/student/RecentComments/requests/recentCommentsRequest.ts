import axios, { AxiosResponse } from 'axios';
import { config } from '../../../../config/config';
import { RecentComment } from '../../../../types/RecentComment';

export async function fetchRecentComments(
  userId: number
): Promise<RecentComment[]> {
  try {
    const response: AxiosResponse<{ comments: RecentComment[] }> = await axios.get(
      `${config.SERVER_URL}/study/${userId}/comments`
    );
    return response.data.comments;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(`Error ${err.response.status} al cargar comentarios`);
    }
    throw err;
  }
}
