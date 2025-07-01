import React from 'react';
import { useDetailedVideoInfo } from '../../hooks/ai/useDetailedVideoInfo';
import { EvaluationInfoSectionProps } from '../../types/ai';

// Sub-components for better organization
const LoadingSkeleton: React.FC = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Información de Evaluación
        </h3>
        <div className="animate-pulse space-y-3">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
        </div>
    </div>
);

const ErrorDisplay: React.FC<{ error: string }> = ({ error }) => (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800">
                Error al cargar información
            </h3>
        </div>
        <p className="text-red-600">{error || 'No se pudo obtener la información del video'}</p>
    </div>
);

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 mb-4 border border-slate-200">
        <h4 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            {title}
        </h4>
        <div className="text-sm text-slate-700 space-y-2">
            {children}
        </div>
    </div>
);

const InfoRow: React.FC<{ label: string; value: string | number | null }> = ({ label, value }) => (
    <div className="flex justify-between items-start">
        <span className="font-medium text-slate-600 min-w-0 flex-1">{label}:</span>
        <span className="text-slate-800 text-right ml-2 break-words">{value || 'No disponible'}</span>
    </div>
);

const InteractionCard: React.FC<{ interaction: any; index: number }> = ({ interaction, index }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-4 mb-3 shadow-sm">
        <div className="flex items-center justify-between mb-3">
            <h5 className="font-semibold text-slate-800">
                Interacción {index + 1}
            </h5>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                {interaction.role}
            </span>
        </div>
        <div className="space-y-2 text-sm">
            <InfoRow label="Ventana" value={interaction.windowName} />
            <InfoRow label="Hallazgo" value={interaction.findingName} />
            <InfoRow label="Diagnóstico" value={interaction.possibleDiagnosisName} />
            {interaction.subdiagnosisName && (
                <InfoRow label="Subdiagnóstico" value={interaction.subdiagnosisName} />
            )}
            {interaction.comment && (
                <div className="pt-2 border-t border-slate-100">
                    <div className="font-medium text-slate-600 mb-1">Comentario:</div>
                    <div className="text-slate-800 bg-slate-50 p-3 rounded-lg border-l-4 border-slate-300">{interaction.comment}</div>
                </div>
            )}
            {interaction.professorComment && (
                <div className="pt-2 border-t border-slate-100">
                    <div className="font-medium text-slate-600 mb-1">Comentario del profesor:</div>
                    <div className="text-slate-800 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-300">{interaction.professorComment}</div>
                </div>
            )}
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                {new Date(interaction.createdAt).toLocaleString()}
            </div>
        </div>
    </div>
);

const ProtocolSection: React.FC<{ protocol: any }> = ({ protocol }) => (
    <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-4 mb-4 border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            Protocolo: {protocol.name}
        </h4>
        <div className="space-y-3">
            {protocol.sections.map((section: any) => (
                <div key={section.key} className="bg-white rounded-lg p-3 border border-blue-200 shadow-sm">
                    <div className="font-medium text-blue-800 mb-2">{section.name}</div>
                    <div className="space-y-1 text-sm">
                        {section.items.map((item: any) => (
                            <div key={item.key} className="flex justify-between items-center">
                                <span className="text-slate-700">{item.label}</span>
                                <span className="text-slate-500 text-xs">
                                    Escala {item.score_scale} • Máx {item.max_score}p
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const EvaluationInfoSection: React.FC<EvaluationInfoSectionProps> = ({ clipId }) => {
    const {
        videoDetails,
        interactions,
        protocol,
        isLoading,
        error,
        comprehensivePrompt
    } = useDetailedVideoInfo(clipId);

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (error || !videoDetails) {
        return <ErrorDisplay error={error || ''} />;
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                Información Detallada de Evaluación
            </h3>
            
            <div className="space-y-6">
                {/* Video Information */}
                <InfoCard title="Video">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <InfoRow label="Protocolo" value={videoDetails.video.protocol} />
                        <InfoRow label="Archivo" value={videoDetails.video.originalFilename} />
                        <InfoRow label="Tamaño" value={`${(Number(videoDetails.video.sizeBytes) / 1024 / 1024).toFixed(2)} MB`} />
                        <InfoRow label="Duración" value={`${videoDetails.video.durationSeconds || 0} segundos`} />
                    </div>
                </InfoCard>

                {/* Study Information */}
                <InfoCard title="Estudio">
                    <InfoRow label="Título" value={videoDetails.study.title} />
                    <InfoRow label="Descripción" value={videoDetails.study.description} />
                    <InfoRow label="Estado" value={videoDetails.study.status} />
                </InfoCard>

                {/* Student Information */}
                <InfoCard title="Estudiante">
                    <InfoRow label="Nombre" value={videoDetails.student.name} />
                    <InfoRow label="Email" value={videoDetails.student.email} />
                </InfoCard>

                {/* Evaluation Information */}
                <InfoCard title="Evaluación">
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-slate-600">Puntuación:</span>
                        <span className="text-2xl font-bold text-green-600">
                            {videoDetails.evaluation.score}/10
                        </span>
                    </div>
                    <InfoRow label="Profesor" value={videoDetails.evaluation.teacher.name} />
                    <InfoRow label="Fecha" value={new Date(videoDetails.evaluation.submittedAt).toLocaleString()} />
                    {videoDetails.evaluation.feedbackSummary && (
                        <div className="pt-2 border-t border-slate-100">
                            <div className="font-medium text-slate-600 mb-1">Resumen:</div>
                            <div className="text-slate-800 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                                {videoDetails.evaluation.feedbackSummary}
                            </div>
                        </div>
                    )}
                </InfoCard>

                {/* Student Interaction */}
                <InfoCard title="Interacción del Estudiante">
                    {videoDetails.studentInteraction ? (
                        <>
                            <InfoRow label="Comentario" value={videoDetails.studentInteraction.comment || 'Sin comentario'} />
                            <InfoRow label="Listo" value={videoDetails.studentInteraction.ready ? 'Sí' : 'No'} />
                            <InfoRow label="Fecha" value={new Date(videoDetails.studentInteraction.date).toLocaleString()} />
                        </>
                    ) : (
                        <div className="text-slate-500 italic">No hay interacción del estudiante registrada</div>
                    )}
                </InfoCard>

                {/* Professor Interaction */}
                {videoDetails.professorInteraction && (
                    <InfoCard title="Interacción del Profesor">
                        <InfoRow label="Comentario" value={videoDetails.professorInteraction.comment || 'Sin comentario'} />
                        <InfoRow label="Calidad de imagen" value={videoDetails.professorInteraction.imageQuality} />
                        <InfoRow label="Diagnóstico final" value={videoDetails.professorInteraction.finalDiagnosis} />
                        <InfoRow label="Fecha" value={new Date(videoDetails.professorInteraction.date).toLocaleString()} />
                    </InfoCard>
                )}

                {/* Detailed Interactions */}
                {interactions.length > 0 && (
                    <InfoCard title="Interacciones Detalladas">
                        <div className="space-y-3">
                            {interactions.map((interaction, index) => (
                                <InteractionCard key={interaction.id} interaction={interaction} index={index} />
                            ))}
                        </div>
                    </InfoCard>
                )}

                {/* Protocol Information */}
                {protocol && <ProtocolSection protocol={protocol} />}
            </div>
        </div>
    );
}; 