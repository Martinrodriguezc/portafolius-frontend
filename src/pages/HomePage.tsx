import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Menu, Stethoscope, Users, Wand2, X } from 'lucide-react';
import { useState } from "react";

import Button from "../components/common/Button/Button";
import FooterSection from "../components/common/Footer/footer";

export default function HomePage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/register");
  const handleLearnMore = () => navigate('/learn_more');

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Stethoscope className="h-6 w-6 text-[#4E81BD] mr-2" />
              <span className="text-xl font-bold text-slate-800">PortafoliUS</span>
            </div>

            <div className="hidden md:flex gap-3">
            <Button variant="primary" onClick={handleLogin}>
                Iniciar sesión
              </Button>
              <Button variant="outline" onClick={handleSignup}>
                Registrarse
              </Button>
            </div>

            <button
              className="md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
              onClick={toggleMobileMenu}
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-3 pb-3 space-y-3 animate-fadeIn">
              <Button variant="primary" onClick={handleLogin} className="w-full py-2.5">
                Iniciar sesión
              </Button>
              <Button variant="outline" onClick={handleSignup} className="w-full py-2.5">
                Registrarse
              </Button>
            </div>
          )}
        </div>
      </nav>

      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-sky-100 -z-10" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-center bg-no-repeat bg-cover opacity-10 -z-10" />

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex flex-col space-y-5 md:space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#4E81BD] text-white text-xs sm:text-sm font-medium max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                <Wand2 className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">Plataforma de educación clínica en ultrasonido</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Domine las técnicas de <span className="text-[#4E81BD]">Ultrasonido</span> con la guía de expertos
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl">
                PortafoliUS es una plataforma educativa avanzada para un aprendizaje y retroalimentación efectivos en
                Ultrasonido Clínico, diseñada tanto para estudiantes como para docentes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Button variant="primary" onClick={handleSignup} className="py-3 px-6" fixedWidth={false}>
                  Empezar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={handleLearnMore} className="py-3 px-6" fixedWidth={false}>
                  Aprender más
                </Button>
              </div>
            </div>

            <div className="relative mt-8 md:mt-0">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-800 rounded-2xl blur-xl opacity-30 animate-pulse" />
              <div className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
                <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
                  <div className="h-16 sm:h-24 w-16 sm:w-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="h-8 sm:h-12 w-8 sm:w-12 text-[#4E81BD]" />
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Plataforma de</h2>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#4E81BD]">Ultrasonido Clínico</h3>
                    <p className="text-sm sm:text-base text-slate-600 max-w-md">
                      Desarrollada por expertos para mejorar las habilidades diagnósticas y la precisión en la práctica
                      médica.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full pt-2 sm:pt-4">
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-xl border border-blue-100">
                      <h4 className="font-semibold text-[#4E81BD]">Estudiantes</h4>
                      <p className="text-xs sm:text-sm text-slate-600">Aprende con casos reales</p>
                    </div>
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-xl border border-blue-100">
                      <h4 className="font-semibold text-[#4E81BD]">Profesores</h4>
                      <p className="text-xs sm:text-sm text-slate-600">Evalúa con precisión</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-8 sm:mb-12">
            Diseñado para la excelencia en la educación médica
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-slate-50 p-5 sm:p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow
                  flex flex-col items-center text-center
                  sm:block sm:text-left">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                Aprendizaje Integral
              </h3>
              <p className="text-sm sm:text-base text-slate-600">
                Acceda a un plan de estudios estructurado y recursos diseñados por expertos en ultrasonido.
              </p>
            </div>

            <div className="bg-slate-50 p-5 sm:p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow
                  flex flex-col items-center text-center
                  sm:block sm:text-left">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                Comentarios de expertos
              </h3>
              <p className="text-sm sm:text-base text-slate-600">
                Reciba comentarios detallados de educadores experimentados sobre sus técnicas de ultrasonido.
              </p>
            </div>

            <div className="bg-slate-50 p-5 sm:p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow
                  flex flex-col items-center text-center
                  sm:block sm:text-left sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                <Wand2 className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                Seguimiento del progreso
              </h3>
              <p className="text-sm sm:text-base text-slate-600">
                Monitorea el desarrollo de tus habilidades con análisis detallados y métricas de rendimiento.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">¿Estás listo para mejorar tus habilidades en ultrasonido?</h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-6 sm:mb-8">
            Únase hoy a nuestra plataforma y acceda a paneles de control especializados tanto para estudiantes como para
            docentes.
          </p>

          <div className="flex justify-center">
            <Button
              onClick={handleSignup}
              className="px-6 py-3 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors max-w-xs sm:max-w-md"
            >
              Registrarse ahora
            </Button>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
