import Button from "../../components/common/Button/Button";
import { SignupCTASectionProps } from "../../types/Props/LearnMore/SignupCTASectionProps";

export function SignupCTASection({ onSignup }: SignupCTASectionProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6">
          ¿Listo para mejorar su enseñanza y aprendizaje en USC?
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto mb-8">
          Únase a PortafoliUS y revolucione la forma en que enseña y aprende
          Ultrasonido Clínico con nuestra innovadora plataforma educativa.
        </p>
        <Button variant="primary" onClick={onSignup}>
          Registrarse Ahora
        </Button>
      </div>
    </section>
  );
}
