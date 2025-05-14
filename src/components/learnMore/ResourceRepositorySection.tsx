import { BookOpen, CheckCircle, FileVideo, Users } from 'lucide-react';

export function ResourceRepositorySection() {
  const resources = [
    {
      icon: FileVideo,
      title: "Videos Instructivos",
      description: "Acceda a videos demostrativos de técnicas y procedimientos realizados por expertos."
    },
    {
      icon: BookOpen,
      title: "Artículos Científicos",
      description: "Biblioteca de papers y publicaciones relevantes en el campo del Ultrasonido Clínico."
    },
    {
      icon: Users,
      title: "Casos Clínicos",
      description: "Estudie casos reales con diferentes hallazgos y aprenda a interpretarlos correctamente."
    },
    {
      icon: CheckCircle,
      title: "Guías y Protocolos",
      description: "Documentación detallada sobre los diferentes protocolos de Ultrasonido Clínico."
    }
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 text-center">
            Repositorio de Material Educativo
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 text-center max-w-2xl mx-auto">
            PortafoliUS incluye un completo repositorio de recursos educativos
            para complementar su aprendizaje en Ultrasonido Clínico:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {resources.map((resource, index) => (
              <div key={index} className="bg-slate-50 p-4 sm:p-5 rounded-lg border border-slate-100 hover:shadow-sm transition-shadow duration-300">
                <div className="flex items-center mb-2 sm:mb-3">
                  <resource.icon className="h-5 w-5 text-[#4E81BD] mr-2" />
                  <h4 className="font-semibold text-slate-800">{resource.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
