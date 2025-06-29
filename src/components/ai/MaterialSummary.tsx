import React from "react";
import { Summary } from "../../types/aiMaterial";

interface MaterialSummaryProps {
    summary: Summary;
}

export default function MaterialSummary({ summary }: MaterialSummaryProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">📋</div>
                    Resumen
                </h2>
            </div>
            <div className="p-8">
                <ul className="space-y-3">
                    {summary.map((s, i) => (
                        <li key={i} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                            <span className="text-slate-700 leading-relaxed">{s}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
} 