import { ArrowLeft, Stethoscope } from "lucide-react";
import Button from "../common/Button/Button";

interface LearnMoreNavbarProps {
    handleBack: () => void
}

export function LearnMoreNavbar({ handleBack }: LearnMoreNavbarProps) {
    return (<nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
                <Stethoscope className="h-6 w-6 text-[#4E81BD] mr-2" />
                <span className="text-xl font-bold text-slate-800">PortafoliUS</span>
            </div>
            <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver
            </Button>
        </div>
    </nav>)
}