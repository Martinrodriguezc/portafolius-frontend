import { BookOpen, CheckCircle, FileVideo, Users } from "lucide-react";

export function ResourceRepositorySection() {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Repositorio de Material Educativo</h2>
            <p className="text-slate-600 mb-8">
              PortafoliUS incluye un completo repositorio de recursos educativos para complementar su aprendizaje en
              Ultrasonido Clínico:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
                <div className="flex items-center mb-3">
                  <FileVideo className="h-5 w-5 text-[#4E81BD] mr-2" />
                  <h4 className="font-semibold text-slate-800">Videos Instructivos</h4>
                </div>
                <p className="text-sm text-slate-600">Acceda a videos demostrativos de técnicas y procedimientos realizados por expertos.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
                <div className="flex items-center mb-3">
                  <BookOpen className="h-5 w-5 text-[#4E81BD] mr-2" />
                  <h4 className="font-semibold text-slate-800">Artículos Científicos</h4>
                </div>
                <p className="text-sm text-slate-600">Biblioteca de papers y publicaciones relevantes en el campo del Ultrasonido Clínico.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
                <div className="flex items-center mb-3">
                  <Users className="h-5 w-5 text-[#4E81BD] mr-2" />
                  <h4 className="font-semibold text-slate-800">Casos Clínicos</h4>
                </div>
                <p className="text-sm text-slate-600">Estudie casos reales con diferentes hallazgos y aprenda a interpretarlos correctamente.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-5 w-5 text-[#4E81BD] mr-2" />
                  <h4 className="font-semibold text-slate-800">Guías y Protocolos</h4>
                </div>
                <p className="text-sm text-slate-600">Documentación detallada sobre los diferentes protocolos de Ultrasonido Clínico.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }