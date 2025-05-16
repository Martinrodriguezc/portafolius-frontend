import Button from "../../components/common/Button/Button";
import { SignupCTASectionProps } from "../../types/Props/LearnMore/SignupCTASectionProps";

export function SignupCTASection({ onSignup }: SignupCTASectionProps) {
  return (
    <section className="py-10 sm:py-12 md:py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 max-w-md sm:max-w-xl lg:max-w-3xl">
          ¿Listo para mejorar su enseñanza y aprendizaje en USC?
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-6 sm:mb-8">
          Únase a PortafoliUS y revolucione la forma en que enseña y aprende
          Ultrasonido Clínico con nuestra innovadora plataforma educativa.
        </p>
        <Button 
          variant="primary" 
          onClick={onSignup}
          className="py-2.5 sm:py-3 px-6 sm:px-8 text-sm sm:text-base"
        >
          Registrarse Ahora
        </Button>
      </div>
    </section>
  );
}
