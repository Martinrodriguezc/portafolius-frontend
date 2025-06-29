import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { EvaluationInfoSection } from '../components/ai/EvaluationInfoSection';
import { PromptPreview } from '../components/ai/PromptPreview';
import AdditionalInfoInput from '../components/ai/AdditionalInfoInput';
import MaterialSummary from '../components/ai/MaterialSummary';
import MaterialObjectives from '../components/ai/MaterialObjectives';
import MaterialResources from '../components/ai/MaterialResources';
import InteractiveQuiz from '../components/ai/InteractiveQuiz';
import { useAIMaterialGeneration } from '../hooks/ai/useAIMaterialGeneration';

const IA_Beta_Page: React.FC = () => {
    const { clipId } = useParams<{ clipId: string }>();
    const [additionalInfo, setAdditionalInfo] = useState('');

    if (!clipId) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Error</h1>
                    <p className="text-gray-600">No se proporcionó un ID de video válido</p>
                </div>
            </div>
        );
    }

    const clipIdNumber = parseInt(clipId, 10);

    const {
        material,
        isLoading,
        error,
        generateMaterial,
        detailedFeedback,
        videoInfoLoading,
        videoInfoError
    } = useAIMaterialGeneration({
        clipId: clipIdNumber,
        additionalInfo
    });

    const handleGenerateMaterial = async () => {
        await generateMaterial();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Generar Material de Estudio con IA (Beta)
                    </h1>
                    <p className="text-gray-600">
                        Genera material de estudio personalizado basado en tu evaluación
                    </p>
                </div>

                {/* Loading state for video info */}
                {videoInfoLoading && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="animate-pulse">
                            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    </div>
                )}

                {/* Error state for video info */}
                {videoInfoError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-semibold text-red-800 mb-2">
                            Error al cargar información del video
                        </h3>
                        <p className="text-red-600">{videoInfoError}</p>
                    </div>
                )}

                {/* Evaluation Information */}
                <EvaluationInfoSection clipId={clipIdNumber} />

                {/* Information Preview */}
                <PromptPreview detailedFeedback={detailedFeedback} />

                {/* Additional Info Input */}
                <AdditionalInfoInput
                    additionalInfo={additionalInfo}
                    setAdditionalInfo={setAdditionalInfo}
                    onGenerate={handleGenerateMaterial}
                    loading={isLoading}
                    error={error || ''}
                />

                {/* Generated Material */}
                {material && (
                    <div className="space-y-6">
                        {/* Material Summary */}
                        <MaterialSummary summary={material.summary} />

                        {/* Material Objectives */}
                        <MaterialObjectives objectives={material.objectives} />

                        {/* Material Resources */}
                        <MaterialResources resources={material.resources} />

                        {/* Interactive Quiz */}
                        <InteractiveQuiz quizItems={material.quiz} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default IA_Beta_Page;