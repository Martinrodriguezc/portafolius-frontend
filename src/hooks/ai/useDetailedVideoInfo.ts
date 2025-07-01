import { useState, useEffect } from 'react';
import { getVideoInteractions, getVideoDetails, getProtocol } from './requests/aiMaterialRequests';
import { DetailedVideoInfo } from '../../types/ai';
import { Interaction, VideoDetails, Protocol } from '../../types/aiMaterial';

export const useDetailedVideoInfo = (clipId: number): DetailedVideoInfo => {
    const [interactions, setInteractions] = useState<Interaction[]>([]);
    const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
    const [protocol, setProtocol] = useState<Protocol | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const [interactionsData, videoDetailsData] = await Promise.all([
                    getVideoInteractions(clipId),
                    getVideoDetails(clipId)
                ]);

                setInteractions(interactionsData);
                setVideoDetails(videoDetailsData);

                if (videoDetailsData?.video?.protocol) {
                    try {
                        const protocolData = await getProtocol(videoDetailsData.video.protocol);
                        setProtocol(protocolData);
                    } catch (protocolError) {
                        console.warn('Could not fetch protocol:', protocolError);
                    }
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error fetching video information');
            } finally {
                setIsLoading(false);
            }
        };

        if (clipId) {
            fetchAllData();
        }
    }, [clipId]);

    const buildComprehensivePrompt = (): string => {
        if (!videoDetails) return '';

        let prompt = `INFORMACIÓN RELEVANTE PARA LA EVALUACIÓN:\n\n`;

        prompt += `PROTOCOLO: ${videoDetails.video.protocol}\n`;
        prompt += `ESTUDIO: ${videoDetails.study.title} - ${videoDetails.study.description}\n\n`;

        prompt += `EVALUACIÓN:\n`;
        prompt += `- Puntuación: ${videoDetails.evaluation.score}/10\n`;
        prompt += `- Profesor: ${videoDetails.evaluation.teacher.name}\n`;
        if (videoDetails.evaluation.feedbackSummary) {
            prompt += `- Feedback: ${videoDetails.evaluation.feedbackSummary}\n`;
        }
        prompt += `\n`;

        if (videoDetails.studentInteraction?.comment) {
            prompt += `COMENTARIO DEL ESTUDIANTE: ${videoDetails.studentInteraction.comment}\n`;
        }
        if (videoDetails.professorInteraction?.comment) {
            prompt += `COMENTARIO DEL PROFESOR: ${videoDetails.professorInteraction.comment}\n`;
        }
        if (videoDetails.professorInteraction?.imageQuality) {
            prompt += `CALIDAD DE IMAGEN: ${videoDetails.professorInteraction.imageQuality}\n`;
        }
        if (videoDetails.professorInteraction?.finalDiagnosis) {
            prompt += `DIAGNÓSTICO FINAL: ${videoDetails.professorInteraction.finalDiagnosis}\n`;
        }
        prompt += `\n`;

        if (interactions.length > 0) {
            prompt += `HALLAZGOS PRINCIPALES:\n`;
            interactions.forEach((interaction, index) => {
                prompt += `${index + 1}. ${interaction.windowName}: ${interaction.findingName} - ${interaction.possibleDiagnosisName}`;
                if (interaction.subdiagnosisName) {
                    prompt += ` (${interaction.subdiagnosisName})`;
                }
                if (interaction.comment) {
                    prompt += ` - ${interaction.comment}`;
                }
                if (interaction.professorComment) {
                    prompt += ` [Profesor: ${interaction.professorComment}]`;
                }
                prompt += `\n`;
            });
            prompt += `\n`;
        }

        if (protocol) {
            prompt += `CRITERIOS DE EVALUACIÓN (${protocol.name}):\n`;
            protocol.sections.forEach(section => {
                prompt += `${section.name}:\n`;
                section.items.forEach(item => {
                    prompt += `- ${item.label} (${item.score_scale}, max ${item.max_score} pts)\n`;
                });
            });
        }

        return prompt;
    };

    return {
        interactions,
        videoDetails,
        protocol,
        isLoading,
        error,
        comprehensivePrompt: buildComprehensivePrompt()
    };
}; 