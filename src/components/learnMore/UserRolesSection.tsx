import { BookOpen, ChevronRight, Users } from "lucide-react";

export function UserRolesSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Roles de Usuario</h2>
                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-xl border border-slate-100">
                        <div className="w-16 h-16 bg-[#4E81BD]/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <Users className="h-8 w-8 text-[#4E81BD]" />
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-900 mb-4 text-center">Estudiantes</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <ChevronRight className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-slate-600">Subir estudios de ultrasonido para evaluación</span>
                            </li>
                            <li className="flex items-start">
                                <ChevronRight className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-slate-600">Ver retroalimentación y anotaciones de los profesores</span>
                            </li>
                            <li className="flex items-start">
                                <ChevronRight className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-slate-600">Seguir su progreso a través de curvas de aprendizaje</span>
                            </li>
                            <li className="flex items-start">
                                <ChevronRight className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-slate-600">Acceder a material educativo complementario</span>
                            </li>
                            <li className="flex items-start">
                                <ChevronRight className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-slate-600">Comunicarse con los profesores para resolver dudas</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-xl border border-slate-100">
                        <div className="w-16 h-16 bg-[#4E81BD]/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <BookOpen className="h-8 w-8 text-[#4E81BD]" />
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-900 mb-4 text-center">Profesores</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <ChevronRight className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-slate-600">Acceder a todos los estudios de los estudiantes</span>
                            </li>
                            <li className="flex items-start">
                                <ChevronRight className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-slate-600">Evaluar estudios mediante formularios estandarizados</span>
                            </li>
                            <li className="flex items-start">
                                <ChevronRight className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-slate-600">Anotar y comentar directamente sobre los videos</span>
                            </li>
                            <li className="flex items-start">
                                <ChevronRight className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-slate-600">Monitorear el progreso de los estudiantes</span>
                            </li>
                            <li className="flex items-start">
                                <ChevronRight className="h-5 w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                                <span className="text-slate-600">Proporcionar material educativo complementario</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}