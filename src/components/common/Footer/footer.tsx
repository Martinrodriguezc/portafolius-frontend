import { Stethoscope } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="py-8 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Stethoscope className="h-6 w-6 text-[#4E81BD] mr-2" />
            <span className="text-lg font-semibold text-slate-800">
              PortafoliUS
            </span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} PortafoliUS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
