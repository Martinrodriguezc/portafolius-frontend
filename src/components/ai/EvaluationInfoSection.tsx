import React from 'react';
import { useDetailedVideoInfo } from '../../hooks/ai/useDetailedVideoInfo';

interface EvaluationInfoSectionProps {
    clipId: number;
}

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
        return (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Información de Evaluación
                </h3>
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
            </div>
        );
    }

    if (error || !videoDetails) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Error al cargar información
                </h3>
                <p className="text-red-600">{error || 'No se pudo obtener la información del video'}</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Información Detallada de Evaluación
            </h3>
            
            <div className="space-y-4">
                {/* Video Information */}
                <div className="border-b pb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Video</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div><span className="font-medium">Protocolo:</span> {videoDetails.video.protocol}</div>
                        <div><span className="font-medium">Archivo:</span> {videoDetails.video.originalFilename}</div>
                        <div><span className="font-medium">Tamaño:</span> {videoDetails.video.sizeBytes} bytes</div>
                        <div><span className="font-medium">Duración:</span> {videoDetails.video.durationSeconds || 'No disponible'} segundos</div>
                    </div>
                </div>

                {/* Study Information */}
                <div className="border-b pb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Estudio</h4>
                    <div className="text-sm">
                        <div><span className="font-medium">Título:</span> {videoDetails.study.title}</div>
                        <div><span className="font-medium">Descripción:</span> {videoDetails.study.description}</div>
                        <div><span className="font-medium">Estado:</span> {videoDetails.study.status}</div>
                    </div>
                </div>

                {/* Student Information */}
                <div className="border-b pb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Estudiante</h4>
                    <div className="text-sm">
                        <div><span className="font-medium">Nombre:</span> {videoDetails.student.name}</div>
                        <div><span className="font-medium">Email:</span> {videoDetails.student.email}</div>
                    </div>
                </div>

                {/* Evaluation Information */}
                <div className="border-b pb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Evaluación</h4>
                    <div className="text-sm">
                        <div><span className="font-medium">Puntuación:</span> {videoDetails.evaluation.score}/10</div>
                        <div><span className="font-medium">Profesor:</span> {videoDetails.evaluation.teacher.name}</div>
                        <div><span className="font-medium">Fecha:</span> {new Date(videoDetails.evaluation.submittedAt).toLocaleString()}</div>
                        {videoDetails.evaluation.feedbackSummary && (
                            <div><span className="font-medium">Resumen:</span> {videoDetails.evaluation.feedbackSummary}</div>
                        )}
                    </div>
                </div>

                {/* Student Interaction */}
                <div className="border-b pb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Interacción del Estudiante</h4>
                    {videoDetails.studentInteraction ? (
                        <div className="text-sm">
                            <div><span className="font-medium">Comentario:</span> {videoDetails.studentInteraction.comment || 'Sin comentario'}</div>
                            <div><span className="font-medium">Listo:</span> {videoDetails.studentInteraction.ready ? 'Sí' : 'No'}</div>
                            <div><span className="font-medium">Fecha:</span> {new Date(videoDetails.studentInteraction.date).toLocaleString()}</div>
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500">Sin información de interacción del estudiante</div>
                    )}
                </div>

                {/* Professor Interaction */}
                <div className="border-b pb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Interacción del Profesor</h4>
                    {videoDetails.professorInteraction ? (
                        <div className="text-sm">
                            <div><span className="font-medium">Comentario:</span> {videoDetails.professorInteraction.comment || 'Sin comentario'}</div>
                            <div><span className="font-medium">Calidad de imagen:</span> {videoDetails.professorInteraction.imageQuality || 'No evaluada'}</div>
                            <div><span className="font-medium">Diagnóstico final:</span> {videoDetails.professorInteraction.finalDiagnosis || 'No especificado'}</div>
                            <div><span className="font-medium">Fecha:</span> {new Date(videoDetails.professorInteraction.date).toLocaleString()}</div>
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500">Sin información de interacción del profesor</div>
                    )}
                </div>

                {/* Detailed Interactions */}
                {interactions.length > 0 && (
                    <div className="border-b pb-4">
                        <h4 className="font-medium text-gray-700 mb-2">Interacciones Detalladas</h4>
                        <div className="space-y-3">
                            {interactions.map((interaction, index) => (
                                <div key={interaction.id} className="bg-gray-50 p-3 rounded">
                                    <div className="text-sm">
                                        <div className="font-medium mb-1">Interacción {index + 1} ({interaction.role})</div>
                                        <div><span className="font-medium">Ventana:</span> {interaction.windowName}</div>
                                        <div><span className="font-medium">Hallazgo:</span> {interaction.findingName}</div>
                                        <div><span className="font-medium">Diagnóstico:</span> {interaction.possibleDiagnosisName}</div>
                                        {interaction.subdiagnosisName && (
                                            <div><span className="font-medium">Subdiagnóstico:</span> {interaction.subdiagnosisName}</div>
                                        )}
                                        {interaction.comment && (
                                            <div><span className="font-medium">Comentario:</span> {interaction.comment}</div>
                                        )}
                                        {interaction.professorComment && (
                                            <div><span className="font-medium">Comentario del profesor:</span> {interaction.professorComment}</div>
                                        )}
                                        <div><span className="font-medium">Fecha:</span> {new Date(interaction.createdAt).toLocaleString()}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Protocol Information */}
                {protocol && (
                    <div>
                        <h4 className="font-medium text-gray-700 mb-2">Protocolo de Evaluación ({protocol.name})</h4>
                        <div className="space-y-3">
                            {protocol.sections.map(section => (
                                <div key={section.key} className="bg-blue-50 p-3 rounded">
                                    <div className="font-medium text-blue-800 mb-2">{section.name}</div>
                                    <div className="text-sm space-y-1">
                                        {section.items.map(item => (
                                            <div key={item.key}>
                                                <span className="font-medium">{item.label}:</span> Escala {item.score_scale}, Máximo {item.max_score} puntos
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}; 