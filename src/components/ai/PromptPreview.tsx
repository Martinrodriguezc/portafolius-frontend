import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Check } from 'lucide-react';
import { PromptPreviewProps } from '../../types/ai';

export const PromptPreview: React.FC<PromptPreviewProps> = ({ 
    detailedFeedback 
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(detailedFeedback);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Error copying to clipboard:', err);
        }
    };

    if (!detailedFeedback) {
        return null;
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    Información Detallada que se envía al AI
                </h3>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 text-green-600" />
                                Copiado
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4" />
                                Copiar
                            </>
                        )}
                    </button>
                    <button
                        onClick={() => setIsVisible(!isVisible)}
                        className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded-md transition-colors"
                    >
                        {isVisible ? (
                            <>
                                <EyeOff className="w-4 h-4" />
                                Ocultar
                            </>
                        ) : (
                            <>
                                <Eye className="w-4 h-4" />
                                Ver Información
                            </>
                        )}
                    </button>
                </div>
            </div>

            {isVisible && (
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 rounded-lg p-4">
                    <div className="text-sm text-slate-700 whitespace-pre-wrap font-mono max-h-96 overflow-y-auto">
                        {detailedFeedback}
                    </div>
                    <div className="mt-3 text-xs text-slate-500">
                        Longitud de la información: {detailedFeedback.length} caracteres
                    </div>
                    <div className="mt-2 text-xs text-blue-600">
                        Esta información se envía como "feedback" al servicio AI que genera el material de estudio
                    </div>
                </div>
            )}
        </div>
    );
}; 