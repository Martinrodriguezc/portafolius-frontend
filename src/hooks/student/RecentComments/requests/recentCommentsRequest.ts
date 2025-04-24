import { config } from "../../../../config/config";
import { RecentComment } from "../../../../types/RecentComment";

export const fetchRecentComments = async (
  userId: number
): Promise<RecentComment[]> => {
  const response = await fetch(
    `${config.SERVER_URL}/study/${userId}/comments`
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status} al cargar comentarios`);
  }
  const { comments } = (await response.json()) as { comments: RecentComment[] };
  return comments;
};
