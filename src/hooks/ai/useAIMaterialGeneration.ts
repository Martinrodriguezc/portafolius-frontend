import { useState } from 'react';
import { generateAIMaterial } from './requests/aiMaterialRequests';
import { Material } from '../../types/aiMaterial';
import { useDetailedVideoInfo } from './useDetailedVideoInfo';
import { UseAIMaterialGenerationProps, UseAIMaterialGenerationReturn } from '../../types/ai';

export const useAIMaterialGeneration = ({
    clipId,
    additionalInfo
}: UseAIMaterialGenerationProps): UseAIMaterialGenerationReturn => {
    const [material, setMaterial] = useState<Material | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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