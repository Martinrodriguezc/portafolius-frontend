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
import ReturnButton from '../components/common/Button/ReturnButton';

const IA_Beta_Page: React.FC = () => {
    const { clipId } = useParams<{ clipId: string }>();
    const [additionalInfo, setAdditionalInfo] = useState('');

    const clipIdNumber = clipId ? parseInt(clipId, 10) : null;

    const {
        material,
        isLoading,
        error,
        generateMaterial,
        detailedFeedback,
        videoInfoLoading,
        videoInfoError
    } = useAIMaterialGeneration({
        clipId: clipIdNumber || 0,
        additionalInfo
    });

    if (!clipId || !clipIdNumber) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-800 mb-4">Error</h1>
                    <p className="text-slate-600">No se proporcionó un ID de video válido</p>
                </div>
            </div>
        );
    }

    const handleGenerateMaterial = async () => {
        await generateMaterial();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800 mb-1">
                                    Generar Material de Estudio con IA
                                </h1>
                                <p className="text-slate-600">
                                    Material personalizado basado en tu evaluación médica
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">Beta</span>
                                <span>•</span>
                                <span>Powered by AI</span>
                            </div>
                            <ReturnButton />
                        </div>
                    </div>
                </div>

                {videoInfoLoading && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-slate-200">
                        <div className="animate-pulse">
                            <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                        </div>
                    </div>
                )}

                {videoInfoError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-red-800">
                                Error al cargar información del video
                            </h3>
                        </div>
                        <p className="text-red-600">{videoInfoError}</p>
                    </div>
                )}

                <EvaluationInfoSection clipId={clipIdNumber} />

                <PromptPreview detailedFeedback={detailedFeedback} />

                <AdditionalInfoInput
                    additionalInfo={additionalInfo}
                    setAdditionalInfo={setAdditionalInfo}
                    onGenerate={handleGenerateMaterial}
                    loading={isLoading}
                    error={error || ''}
                />

                {material && (
                    <div className="space-y-6">
                        <MaterialSummary summary={material.summary} />

                        <MaterialObjectives objectives={material.objectives} />

                        <MaterialResources resources={material.resources} />

                        <InteractiveQuiz quizItems={material.quiz} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default IA_Beta_Page;