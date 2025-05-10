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
      <div className="mb-4">
        <p className="text-[#666666]">
          <span className="font-medium text-[#333333]">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "estudiante encontrado" : "estudiantes encontrados"} para "
          <span className="text-[#4E81BD]">{search}</span>"
        </p>
      </div>
    )}

    <div className="space-y-4 animate-fadeIn">
      {filtered.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-200 rounded-[16px] shadow-sm">
          <Users className="h-16 w-16 text-slate-400 mb-4" />
          <p className="text-xl font-medium text-[#333333] mb-2">
            No hay estudiantes
          </p>
          <p className="text-[#666666] mt-1 text-center max-w-md">
            {search
              ? "No se encontraron estudiantes que coincidan con tu búsqueda. Intenta con otros términos."
              : "Aún no has añadido estudiantes a tu cohorte. Añade estudiantes para comenzar a gestionar su progreso."}
          </p>
          {search ? (
            <button
              onClick={() => setSearch("")}
              className="mt-4 text-[#4E81BD] hover:text-[#4E81BD]/80 transition-colors"
            >
              Limpiar búsqueda
            </button>
          ) : (
            <Link to="/teacher/students/new" className="mt-6">
              <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-3 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center gap-2">
                <UserPlus className="h-5 w-5" /> Añadir Estudiante
              </Button>
            </Link>
          )}
        </Card>
      ) : (
        filtered.map((s: TeacherStudent) => (
          <Card
            key={s.id}
            className="p-5 rounded-[16px] border border-slate-200 shadow-sm hover:shadow-md transition-all"
          >
            <StudentsPreviewInfo student={s} />
          </Card>
        ))
      )}
    </div>
  </>
);
