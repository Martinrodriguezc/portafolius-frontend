import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Check } from 'lucide-react';

interface PromptPreviewProps {
    detailedFeedback: string;
}

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
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    Información Detallada que se envía al AI
                </h3>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
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
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-700 whitespace-pre-wrap font-mono max-h-96 overflow-y-auto">
                        {detailedFeedback}
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
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