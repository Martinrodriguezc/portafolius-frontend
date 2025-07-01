import { Objectives } from "../../types/aiMaterial";
import { MaterialObjectivesProps } from "../../types/ai";

export default function MaterialObjectives({ objectives }: MaterialObjectivesProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    Objetivos de Aprendizaje
                </h2>
            </div>
            <div className="p-8">
                <ol className="space-y-4">
                    {objectives.map((o, i) => (
                        <li key={i} className="flex items-start">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-teal-100 text-blue-700 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 font-bold text-sm">
                                {i + 1}
                            </div>
                            <span className="text-slate-700 leading-relaxed pt-1">{o}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
} 