import { Resource } from "../../types/aiMaterial";
import { MaterialResourcesProps } from "../../types/ai";

export default function MaterialResources({ resources }: MaterialResourcesProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    Recursos Recomendados
                </h2>
            </div>
            <div className="p-8">
                <div className="grid gap-4">
                    {resources.map((r: Resource, i: number) => (
                        <div
                            key={i}
                            className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200 hover:border-blue-300"
                        >
                            <a href={r.link} target="_blank" rel="noopener noreferrer" className="block group">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                                            {r.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-1">{r.source}</p>
                                    </div>
                                    <div className="ml-4 text-blue-500 group-hover:text-blue-700 transition-colors duration-200">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
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