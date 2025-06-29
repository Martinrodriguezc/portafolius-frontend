import Button from "../common/Button/Button";

interface AdditionalInfoInputProps {
    additionalInfo: string;
    setAdditionalInfo: (value: string) => void;
    onGenerate: () => void;
    loading: boolean;
    error: string;
}

export default function AdditionalInfoInput({
    additionalInfo,
    setAdditionalInfo,
    onGenerate,
    loading,
    error
}: AdditionalInfoInputProps) {
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8">
            <div className="mb-6">
                <label htmlFor="additionalInfo" className="block text-lg font-semibold text-slate-900 mb-3">
                    Información Adicional (Opcional)
                </label>
                <textarea
                    id="additionalInfo"
                    className="w-full p-6 border-2 border-slate-200 rounded-xl mb-6 h-32 resize-none focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-slate-700 placeholder-slate-400"
                    placeholder="Agrega información adicional que consideres relevante para generar material de estudio más personalizado..."
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Button
                    onClick={onGenerate}
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-4 text-lg font-semibold"
                >
                    {loading ? (
                        <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Generando Material...
                        </div>
                    ) : (
                        "Generar Material de Estudio"
                    )}
                </Button>

                {additionalInfo.trim() && <span className="text-sm text-slate-500">{additionalInfo.length} caracteres</span>}
            </div>

            {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                        <div className="w-5 h-5 text-red-500 mr-3">⚠️</div>
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                </div>
            )}
        </div>
    );
} 