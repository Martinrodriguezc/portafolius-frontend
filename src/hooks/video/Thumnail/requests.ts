import { config } from "../../../config/config";

export async function fetchThumbnailUrl(videoId: number): Promise<string> {
    const res = await fetch(
        `${config.SERVER_URL}/video/${videoId}/thumbnail-download-url`
    );
    if (!res.ok) {
        throw new Error(`Error ${res.status}: ${await res.text()}`);
    }
    const { url } = await res.json() as { url: string };
    return url;
}