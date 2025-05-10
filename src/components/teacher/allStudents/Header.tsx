import { Button } from "@headlessui/react";
import { UserPlus, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const PageHeader = () => (
    <header className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-[#4E81BD]/10 p-2 rounded-full">
            <Users className="h-6 w-6 text-[#4E81BD]" />
          </div>
          <h1 className="text-[24px] font-bold text-[#333333]">Estudiantes</h1>
        </div>
        <p className="text-[#666666] ml-12">Gestiona y supervisa tu cohorte de estudiantes</p>
      </div>
      <Link to="/teacher/students/new">
        <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-3 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center gap-2 w-full md:w-auto">
          <UserPlus className="h-5 w-5" /> Añadir Estudiante
        </Button>
      </Link>
    </header>
  )