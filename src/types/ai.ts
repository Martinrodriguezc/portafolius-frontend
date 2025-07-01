import { QuizItem } from './aiMaterial';

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
    material: any;
    isLoading: boolean;
    error: string | null;
    generateMaterial: () => Promise<void>;
    detailedFeedback: string;
    videoInfoLoading: boolean;
    videoInfoError: string | null;
}

export interface DetailedVideoInfo {
    interactions: any[];
    videoDetails: any;
    protocol: any;
    isLoading: boolean;
    error: string | null;
    comprehensivePrompt: string;
}

export interface MaterialSummaryProps {
    summary: any;
}

export interface MaterialObjectivesProps {
    objectives: any;
}

export interface MaterialResourcesProps {
    resources: any[];
}

export interface EvaluationInfoSectionProps {
    clipId: number;
} 