import { useState, useEffect } from 'react';
import { fetchThumbnailUrl } from './requests';

export function useVideoThumbnail(videoId: number) {
    const [url, setUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchThumbnailUrl(videoId)
            .then(u => setUrl(u))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [videoId]);

    return { url, loading, error };
}
