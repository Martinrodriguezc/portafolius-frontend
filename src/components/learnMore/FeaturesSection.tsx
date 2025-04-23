import { CheckCircle, LineChart, MessageSquare, Upload, Video } from "lucide-react";

export function FeaturesSection() {
    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Funcionalidades Principales</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Gestión de Estudios */}
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 bg-[#4E81BD]/10 rounded-lg flex items-center justify-center mb-4">
                            <Upload className="h-6 w-6 text-[#4E81BD]" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Gestión de Estudios</h3>
                        <p className="text-slate-600 mb-4">
                            Suba y organice estudios de ultrasonido (videos de 3-5 segundos) por protocolo, manteniendo un orden
                            cronológico para visualizar su progreso.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-600">Soporte para múltiples formatos de video (.mp4, .mov, .mpeg)</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-600">Organización automática por protocolo y fecha de realización</span>
                            </li>
                        </ul>
                    </div>

                    {/* Anotación de Videos */}
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 bg-[#4E81BD]/10 rounded-lg flex items-center justify-center mb-4">
                            <Video className="h-6 w-6 text-[#4E81BD]" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Anotación de Videos</h3>
                        <p className="text-slate-600 mb-4">
                            Los profesores pueden interactuar directamente con los videos, añadiendo anotaciones, destacando áreas
                            importantes y proporcionando retroalimentación específica.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-600">Herramientas de anotación en tiempo real</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-600">Marcadores visuales para destacar estructuras anatómicas</span>
                            </li>
                        </ul>
                    </div>

                    {/* Seguimiento del Progreso */}
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 bg-[#4E81BD]/10 rounded-lg flex items-center justify-center mb-4">
                            <LineChart className="h-6 w-6 text-[#4E81BD]" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Seguimiento del Progreso</h3>
                        <p className="text-slate-600 mb-4">
                            Visualice su curva de aprendizaje para cada protocolo, permitiéndole identificar áreas de mejora y
                            celebrar sus avances.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-600">Gráficos de progreso por protocolo</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-600">Estadísticas detalladas sobre su desempeño a lo largo del tiempo</span>
                            </li>
                        </ul>
                    </div>

                    {/* Comunicación Efectiva */}
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 bg-[#4E81BD]/10 rounded-lg flex items-center justify-center mb-4">
                            <MessageSquare className="h-6 w-6 text-[#4E81BD]" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Comunicación Efectiva</h3>
                        <p className="text-slate-600 mb-4">
                            Facilite la comunicación entre estudiantes y profesores a través de mensajería integrada y comentarios
                            en los estudios.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-600">Sistema de mensajería directa</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-600">Notificaciones sobre nuevos comentarios y evaluaciones</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}