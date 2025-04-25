export function LearningProcessSection() {
    return (<section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Proceso de Enseñanza-Aprendizaje</h2>

            <div className="max-w-4xl mx-auto">
                <div className="relative">
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-[#4E81BD]/30"></div>

                    <div className="relative flex flex-col md:flex-row items-center mb-12">
                        <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Adquisición de conocimiento teórico</h3>
                            <p className="text-slate-600">
                                Aprenda sobre indicaciones, contraindicaciones, física del sonido y hallazgos normales y patológicos
                                a través de clases, papers y documentos.
                            </p>
                        </div>
                        <div className="z-10 w-8 h-8 rounded-full bg-[#4E81BD] flex items-center justify-center text-white font-bold">
                            1
                        </div>
                        <div className="flex-1 md:pl-8 hidden md:block"></div>
                    </div>

                    <div className="relative flex flex-col md:flex-row items-center mb-12">
                        <div className="flex-1 md:text-right md:pr-8 hidden md:block"></div>
                        <div className="z-10 w-8 h-8 rounded-full bg-[#4E81BD] flex items-center justify-center text-white font-bold">
                            2
                        </div>
                        <div className="flex-1 md:pl-8 mb-4 md:mb-0">
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Adquisición de conocimiento práctico</h3>
                            <p className="text-slate-600">
                                Realice exámenes en pacientes reales y aprenda técnicas de optimización de imagen y adquisición.
                            </p>
                        </div>
                    </div>

                    <div className="relative flex flex-col md:flex-row items-center mb-12">
                        <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Integración clínica</h3>
                            <p className="text-slate-600">
                                Interprete los hallazgos en la pantalla para responder a la pregunta clínica que motivó el examen.
                            </p>
                        </div>
                        <div className="z-10 w-8 h-8 rounded-full bg-[#4E81BD] flex items-center justify-center text-white font-bold">
                            3
                        </div>
                        <div className="flex-1 md:pl-8 hidden md:block"></div>
                    </div>

                    <div className="relative flex flex-col md:flex-row items-center">
                        <div className="flex-1 md:text-right md:pr-8 hidden md:block"></div>
                        <div className="z-10 w-8 h-8 rounded-full bg-[#4E81BD] flex items-center justify-center text-white font-bold">
                            4
                        </div>
                        <div className="flex-1 md:pl-8 mb-4 md:mb-0">
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Feedback</h3>
                            <p className="text-slate-600">
                                Reciba evaluación y retroalimentación para mejorar y aprender a resolver problemas por sí mismo en
                                futuras ocasiones.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}