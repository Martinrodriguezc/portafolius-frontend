import { MaterialSummaryProps } from "../../types/ai";

export default function MaterialSummary({ summary }: MaterialSummaryProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    Resumen del Material
                </h2>
            </div>
            <div className="p-8">
                <ul className="space-y-4">
                    {summary.map((s: string, i: number) => (
                        <li key={i} className="flex items-start">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                            <span className="text-slate-700 leading-relaxed">{s}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
} 