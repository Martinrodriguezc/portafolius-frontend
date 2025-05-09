import { ArrowRight, Clock, FileVideo, Lightbulb, Users } from "lucide-react";
import Card from "../../common/Card/Card";
import { Link } from "react-router-dom";
import { Button } from "@headlessui/react";

export const Suggestions: React.FC<{ total: number; pending: number }> = ({ total, pending }) => {
    if (total === 0) {
        return (
            <Card className="bg-white p-6 rounded-[16px] shadow-sm border border-slate-200 animate-fadeIn">
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <div className="bg-[#4E81BD]/10 p-4 rounded-full">
                        <Lightbulb className="h-12 w-12 text-[#4E81BD]" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-[#333333] mb-2">
                            Sin evaluaciones aún
                        </h2>
                        <p className="text-[#666666] mb-4 max-w-md">
                            Tus estudiantes aún no han subido videos. Invítalos a grabar y subir sus evaluaciones.
                        </p>
                        <Link to="/teacher/students">
                            <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-3 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center gap-2">
                                <Users className="h-5 w-5" /> Gestionar estudiantes
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        );
    }
    if (total <= 3) {
        return (
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-[16px] shadow-sm border border-blue-100 animate-fadeIn">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#4E81BD]/20 p-2 rounded-full">
                        <Lightbulb className="h-6 w-6 text-[#4E81BD]" />
                    </div>
                    <h2 className="text-[18px] font-semibold text-[#333333]">
                        Sugerencias para evaluaciones
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
                        <h3 className="text-[16px] font-medium text-[#333333] mb-3 flex items-center gap-2">
                            <FileVideo className="h-5 w-5 text-[#4E81BD]" />
                            Revisa guías de evaluación
                        </h3>
                        <p className="text-[14px] text-[#666666]">
                            Conoce los criterios antes de evaluar los videos de tus estudiantes.
                        </p>
                        <Link to="/teacher/guides" className="text-[#4E81BD] text-[14px] font-medium flex items-center mt-3">
                            Ver guías <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
                        <h3 className="text-[16px] font-medium text-[#333333] mb-3 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-amber-500" />
                            Prioriza evaluaciones
                        </h3>
                        <p className="text-[14px] text-[#666666]">
                            Completa primero las pendientes para mantener a tus estudiantes al día.
                        </p>
                        <Link
                            to={pending > 0 ? `/teacher/evaluations/${[0]}/videos` : "#"}
                            className={`text-[14px] font-medium flex items-center mt-3 ${pending > 0 ? "text-[#4E81BD]" : "text-slate-400 cursor-not-allowed"
                                }`}
                        >
                            {pending > 0 ? (
                                <>Evaluar pendientes <ArrowRight className="h-4 w-4 ml-1" /></>
                            ) : (
                                "No hay pendientes"
                            )}
                        </Link>
                    </div>
                </div>
            </Card>
        );
    }
    return null;
};