import { BookOpen, ChevronRight, Users } from 'lucide-react';

export function UserRolesSection() {
  const studentRoles = [
    "Subir estudios de ultrasonido para evaluación",
    "Ver retroalimentación y anotaciones de los profesores",
    "Seguir su progreso a través de curvas de aprendizaje",
    "Acceder a material educativo complementario",
    "Comunicarse con los profesores para resolver dudas"
  ];

  const teacherRoles = [
    "Acceder a todos los estudios de los estudiantes",
    "Evaluar estudios mediante formularios estandarizados",
    "Anotar y comentar directamente sobre los videos",
    "Monitorear el progreso de los estudiantes",
    "Proporcionar material educativo complementario"
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-6 sm:mb-8 md:mb-12">
          Roles de Usuario
        </h2>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-5 sm:p-6 md:p-8 rounded-xl border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#4E81BD]/10 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-[#4E81BD]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3 sm:mb-4 text-center">
              Estudiantes
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {studentRoles.map((role, index) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-slate-600">{role}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-5 sm:p-6 md:p-8 rounded-xl border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#4E81BD]/10 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-[#4E81BD]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3 sm:mb-4 text-center">
              Profesores
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {teacherRoles.map((role, index) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#4E81BD] mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-slate-600">{role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
