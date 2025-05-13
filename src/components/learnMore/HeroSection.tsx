export function HeroSection() {
  return (
    <section className="relative py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-sky-100 -z-10" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 sm:mb-4">
          Conozca <span className="text-[#4E81BD]">PortafoliUS</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
          Plataforma educativa innovadora diseñada para el aprendizaje y la retroalimentación efectiva en Ultrasonido Clínico.
        </p>
      </div>
    </section>
  );
}
