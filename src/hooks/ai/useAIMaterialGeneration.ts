import { useState } from 'react';
import { generateAIMaterial } from '../../services/aiMaterialService';
import { Material } from '../../types/aiMaterial';
import { useDetailedVideoInfo } from './useDetailedVideoInfo';

interface UseAIMaterialGenerationProps {
    clipId: number;
    additionalInfo: string;
}

interface UseAIMaterialGenerationReturn {
    material: Material | null;
    isLoading: boolean;
    error: string | null;
    generateMaterial: () => Promise<void>;
    detailedFeedback: string;
    videoInfoLoading: boolean;
    videoInfoError: string | null;
}

export const useAIMaterialGeneration = ({
    clipId,
    additionalInfo
}: UseAIMaterialGenerationProps): UseAIMaterialGenerationReturn => {
    const [material, setMaterial] = useState<Material | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get comprehensive video information
    const {
        comprehensivePrompt,
        isLoading: videoInfoLoading,
        error: videoInfoError
    } = useDetailedVideoInfo(clipId);

    const generateMaterial = async (): Promise<void> => {
        if (!comprehensivePrompt) {
            setError('No se pudo obtener la información del video');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Combine comprehensive info with additional info as feedback
            const detailedFeedback = `${comprehensivePrompt}\n\nINFORMACIÓN ADICIONAL DEL ESTUDIANTE:\n${additionalInfo}`;
            
            const generatedMaterial = await generateAIMaterial(clipId, detailedFeedback, '');
            setMaterial(generatedMaterial);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error generando material');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        material,
        isLoading,
        error,
        generateMaterial,
        detailedFeedback: comprehensivePrompt ? `${comprehensivePrompt}\n\nINFORMACIÓN ADICIONAL DEL ESTUDIANTE:\n${additionalInfo}` : '',
        videoInfoLoading,
        videoInfoError
    };
}; 