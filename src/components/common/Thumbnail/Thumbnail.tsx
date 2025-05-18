import { useVideoThumbnail } from "../../../hooks/video/Thumnail/useVideoThumbnail";

export function VideoThumbnail({ videoId, alt }: { videoId: number; alt?: string }) {
    const { url, loading, error } = useVideoThumbnail(videoId);

    if (loading) {
        return <div className="h-32 bg-gray-200 animate-pulse rounded" />;
    }
    if (error || !url) {
        return <div className="text-red-500">Error al cargar miniatura</div>;
    }
    return (
        <img
            src={url}
            alt={alt || 'Thumbnail'}
            className="object-cover rounded-md"
        />
    );
}
