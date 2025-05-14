import React from "react";
import { Users, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import { TeacherStudent } from "../../../types/student";
import StudentsPreviewInfo from "../StudentsPreviewInfo";

interface StudentResultsProps {
  search: string;
  filtered: TeacherStudent[];
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const StudentResults: React.FC<StudentResultsProps> = ({
  search,
  filtered,
  setSearch,
}) => (
  <>
    {search && (
      <div className="mb-4 px-2 sm:px-0">
        <p className="text-sm sm:text-base text-[#666666]">
          <span className="font-medium text-[#333333]">{filtered.length}</span>{" "}
          {filtered.length === 1
            ? "estudiante encontrado"
            : "estudiantes encontrados"}{" "}
          para "<span className="text-[#4E81BD]">{search}</span>"
        </p>
      </div>
    )}

    <div className="animate-fadeIn">
      {filtered.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-[16px] shadow-sm mx-2 sm:mx-0">
          <Users className="h-12 w-12 sm:h-16 sm:w-16 text-slate-400 mb-4" />
          <p className="text-lg sm:text-xl font-medium text-[#333333] mb-2 text-center">
            No hay estudiantes
          </p>
          <p className="text-sm sm:text-base text-[#666666] mt-1 text-center max-w-sm">
            {search
              ? "No se encontraron estudiantes que coincidan con tu búsqueda. Intenta con otros términos."
              : "Aún no has añadido estudiantes a tu cohorte. Añade estudiantes para comenzar a gestionar su progreso."}
          </p>
          {search ? (
            <button
              onClick={() => setSearch("")}
              className="mt-4 text-[#4E81BD] hover:text-[#4E81BD]/80 transition-colors text-sm sm:text-base"
            >
              Limpiar búsqueda
            </button>
          ) : (
            <Link to="/teacher/students/new" className="mt-6 w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-4 sm:px-6 py-2.5 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                <UserPlus className="h-5 w-5" /> Añadir Estudiante
              </Button>
            </Link>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 sm:px-0">
          {filtered.map((s: TeacherStudent) => (
            <Card
              key={s.id}
              className="p-4 sm:p-5 rounded-[16px] border border-slate-200 shadow-sm hover:shadow-md transition-all"
            >
              <StudentsPreviewInfo student={s} />
            </Card>
          ))}
        </div>
      )}
    </div>
  </>
);
