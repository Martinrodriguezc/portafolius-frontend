import { Objectives } from "../../types/aiMaterial";

interface MaterialObjectivesProps {
    objectives: Objectives;
}

export default function MaterialObjectives({ objectives }: MaterialObjectivesProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">🎯</div>
                    Objetivos de Aprendizaje
                </h2>
            </div>
            <div className="p-8">
                <ol className="space-y-4">
                    {objectives.map((o, i) => (
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
    );
} 