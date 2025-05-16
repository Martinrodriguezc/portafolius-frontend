import { ArrowLeft, Menu, Stethoscope, X } from 'lucide-react';
import Button from "../common/Button/Button";
import { LearnMoreNavbarProps } from "../../types/Props/LearnMore/LearnMoreNavbarProps";
import { useState } from "react";

export function LearnMoreNavbar({ handleBack }: LearnMoreNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-[#4E81BD] mr-2" />
            <span className="text-lg sm:text-xl font-bold text-slate-800">PortafoliUS</span>
          </div>
          
          <div className="hidden sm:block">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2 py-1.5 px-3 sm:py-2 sm:px-4"
              fixedWidth={false}
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </div>
          
          <button
            className="sm:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 pb-2 animate-fadeIn">
            <Button
              variant="outline"
              onClick={handleBack}
              className="w-full flex items-center justify-center gap-2 py-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a la página principal
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
