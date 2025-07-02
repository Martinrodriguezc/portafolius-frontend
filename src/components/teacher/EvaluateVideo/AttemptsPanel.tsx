import { Attempt } from '../../../types/attempt';
import {
    History,
    FileText,
    CalendarDays,
    Timer,
    User,
    MessageSquare,
    Award,
    TrendingUp,
    Star,
    Eye,
} from 'lucide-react';

interface AttemptsPanelProps {
    attempts: Attempt[];
}

function getScoreColor(score: number) {
    const MAX_SCORE = 29;
    const pct = (score / MAX_SCORE) * 100;
    if (pct >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (pct >= 80) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (pct >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
}

function getScoreIcon(score: number) {
    const MAX_SCORE = 29;
    const pct = (score / MAX_SCORE) * 100;
    if (pct >= 90) return <Award className="w-4 h-4" />;
    if (pct >= 80) return <TrendingUp className="w-4 h-4" />;
    if (pct >= 70) return <Star className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
}

export default function AttemptsPanel({ attempts }: AttemptsPanelProps) {
    return (
        <div className="w-full md:w-80 bg-white border-r border-gray-200 h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Intentos Previos</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {attempts.length}
                    </span>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {attempts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p className="text-sm">No hay intentos previos</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {attempts.map((attempt) => {
                            const submitted = new Date(attempt.submitted_at);
                            const date = submitted.toLocaleDateString();
                            const time = submitted.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            });
                            return (
                                <div
                                    key={attempt.id}
                                    className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div
                                            className={`flex items-center gap-2 px-2 py-1 rounded-full border text-xs font-medium ${getScoreColor(
                                                attempt.total_score
                                            )}`}
                                        >
                                            {getScoreIcon(attempt.total_score)}
                                            <span>
                                                {attempt.total_score}/29
                                            </span>
                                        </div>
                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                                            Completado
                                        </span>
                                    </div>
                                    <div className="space-y-2 text-xs text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="w-3 h-3" />
                                            <span>{date}</span>
                                            <Timer className="w-3 h-3 ml-2" />
                                            <span>{time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="w-3 h-3" />
                                            <span>{attempt.evaluator_name}</span>
                                        </div>
                                    </div>
                                    {attempt.comment && (
                                        <div className="mt-2 bg-gray-50 rounded p-2">
                                            <div className="flex items-start gap-2">
                                                <MessageSquare className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
                                                <p className="text-xs text-gray-700">{attempt.comment}</p>
                                            </div>
                                        </div>
                                    )}
                                    <button className="w-full mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        Ver detalles
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
} 