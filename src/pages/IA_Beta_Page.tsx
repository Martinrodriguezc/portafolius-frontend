import { useState } from "react"
import Button from "../components/common/Button/Button"
import { config } from "../config/config"
import { LearnMoreNavbar } from "../components/learnMore/LearnMoreNavbar"
import { useNavigate } from "react-router-dom"

export default function BetaPage() {
    const [feedback, setFeedback] = useState("")
    const [material, setMaterial] = useState<any>(null) // Tipo any para evitar errores de tipado
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleGenerate = async () => {
        if (!feedback.trim()) return
        setLoading(true)
        setError("")
        setMaterial(null)
        try {
            const res = await fetch(`${config.IA_SERVICE_URL}/generate-material`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ feedback }),
            })
            const data: any = await res.json()
            if (!res.ok) throw new Error(data.detail || "Error generando material")
            setMaterial(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <LearnMoreNavbar handleBack={() => navigate("/home")} />

            <div className="max-w-6xl mx-auto p-6 md:p-8 lg:p-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Beta Version
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Generador de Material de Estudio</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Transforma el feedback de tu profesor en material de estudio personalizado con IA
                    </p>
                </div>

                {/* Input Section */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8">
                    <div className="mb-6">
                        <label htmlFor="feedback" className="block text-lg font-semibold text-slate-900 mb-3">
                            Feedback del Profesor
                        </label>
                        <textarea
                            id="feedback"
                            className="w-full p-6 border-2 border-slate-200 rounded-xl mb-6 h-48 resize-none focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-slate-700 placeholder-slate-400"
                            placeholder="Pega aquí el feedback del profesor para generar material de estudio personalizado..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <Button
                            onClick={handleGenerate}
                            disabled={!feedback.trim() || loading}
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

                        {feedback.trim() && <span className="text-sm text-slate-500">{feedback.length} caracteres</span>}
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

                {/* Results Section */}
                {material && (
                    <div className="space-y-8">
                        {/* Summary Section */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                                <h2 className="text-2xl font-bold text-white flex items-center">
                                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">📋</div>
                                    Resumen
                                </h2>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-3">
                                    {Array.isArray(material.summary) &&
                                        material.summary.map((s: string, i: number) => (
                                            <li key={i} className="flex items-start">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                                                <span className="text-slate-700 leading-relaxed">{s}</span>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>

                        {/* Objectives Section */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-6">
                                <h2 className="text-2xl font-bold text-white flex items-center">
                                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">🎯</div>
                                    Objetivos de Aprendizaje
                                </h2>
                            </div>
                            <div className="p-8">
                                <ol className="space-y-4">
                                    {Array.isArray(material.objectives) &&
                                        material.objectives.map((o: string, i: number) => (
                                            <li key={i} className="flex items-start">
                                                <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 font-bold text-sm">
                                                    {i + 1}
                                                </div>
                                                <span className="text-slate-700 leading-relaxed pt-1">{o}</span>
                                            </li>
                                        ))}
                                </ol>
                            </div>
                        </div>

                        {/* Resources Section */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
                                <h2 className="text-2xl font-bold text-white flex items-center">
                                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">📚</div>
                                    Recursos Recomendados
                                </h2>
                            </div>
                            <div className="p-8">
                                <div className="grid gap-4">
                                    {Array.isArray(material.resources) &&
                                        material.resources.map((r: any, i: number) => (
                                            <div
                                                key={i}
                                                className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow duration-200"
                                            >
                                                <a href={r.link} target="_blank" rel="noopener noreferrer" className="block group">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors duration-200">
                                                                {r.title}
                                                            </h3>
                                                            <p className="text-sm text-slate-500 mt-1">{r.source}</p>
                                                        </div>
                                                        <div className="ml-4 text-purple-500 group-hover:text-purple-700 transition-colors duration-200">
                                                            🔗
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Quiz Section */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-6">
                                <h2 className="text-2xl font-bold text-white flex items-center">
                                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">❓</div>
                                    Preguntas de Autoevaluación
                                </h2>
                            </div>
                            <div className="p-8">
                                <div className="space-y-8">
                                    {Array.isArray(material.quiz) &&
                                        material.quiz.map((q: any, i: number) => (
                                            <div key={i} className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                                                <div className="flex items-start mb-4">
                                                    <div className="w-8 h-8 bg-orange-100 text-orange-700 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 font-bold text-sm">
                                                        {i + 1}
                                                    </div>
                                                    <p className="font-semibold text-slate-900 leading-relaxed pt-1">{q.question}</p>
                                                </div>
                                                <div className="ml-12">
                                                    <ul className="space-y-2">
                                                        {Array.isArray(q.options) &&
                                                            q.options.map((opt: string, j: number) => (
                                                                <li key={j} className="flex items-center">
                                                                    <div className="w-6 h-6 border-2 border-slate-300 rounded-full mr-3 flex-shrink-0"></div>
                                                                    <span className="text-slate-700">{opt}</span>
                                                                </li>
                                                            ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
