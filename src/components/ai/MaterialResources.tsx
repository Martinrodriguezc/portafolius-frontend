import React from "react";
import { Resource } from "../../types/aiMaterial";

interface MaterialResourcesProps {
    resources: Resource[];
}

export default function MaterialResources({ resources }: MaterialResourcesProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">📚</div>
                    Recursos Recomendados
                </h2>
            </div>
            <div className="p-8">
                <div className="grid gap-4">
                    {resources.map((r: Resource, i: number) => (
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
    );
} 