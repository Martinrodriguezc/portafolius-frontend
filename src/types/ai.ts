import { QuizItem, Material, Interaction, VideoDetails, Protocol } from './aiMaterial';

export interface InteractiveQuizProps {
    quizItems: QuizItem[];
}

export interface AdditionalInfoInputProps {
    additionalInfo: string;
    setAdditionalInfo: (value: string) => void;
    onGenerate: () => void;
    loading: boolean;
    error: string;
}

export interface PromptPreviewProps {
    detailedFeedback: string;
}

export interface UseAIMaterialGenerationProps {
    clipId: number;
    additionalInfo: string;
}

export interface UseAIMaterialGenerationReturn {
    material: Material | null;
    isLoading: boolean;
    error: string | null;
    generateMaterial: () => Promise<void>;
    detailedFeedback: string;
    videoInfoLoading: boolean;
    videoInfoError: string | null;
}

export interface DetailedVideoInfo {
    interactions: Interaction[];
    videoDetails: VideoDetails | null;
    protocol: Protocol | null;
    isLoading: boolean;
    error: string | null;
    comprehensivePrompt: string;
}

export interface MaterialSummaryProps {
    summary: string[];
}

export interface MaterialObjectivesProps {
    objectives: string[];
}

export interface MaterialResourcesProps {
    resources: Array<{
        title: string;
        link: string;
        source: string;
    }>;
}

export interface EvaluationInfoSectionProps {
    clipId: number;
} 