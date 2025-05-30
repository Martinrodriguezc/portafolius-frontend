import React from "react";
import { Button } from "@headlessui/react";
import { UserPlus, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { TeacherStudent } from "../../../types/student";

type SummaryCardProps = {
  students: TeacherStudent[];
};

export const SummaryCard: React.FC<SummaryCardProps> = ({ students }) => {
  return (
    <div className="mb-8 bg-gradient-to-r from-[#4E81BD]/5 to-[#4E81BD]/10 rounded-2xl shadow-sm border border-[#4E81BD]/20 p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-[#4E81BD]/20 p-3 rounded-full">
            <Users className="h-8 w-8 text-[#4E81BD]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#333333]">
              Resumen de estudiantes
            </h2>
            <p className="text-[#666666]">
              Tienes{" "}
              <span className="font-medium text-[#4E81BD]">
                {students.length}
              </span>{" "}
              {students.length === 1 ? "estudiante" : "estudiantes"} en tu cohorte
            </p>
          </div>
        </div>

        <Button
          as={Link}
          to="/teacher/students/new"
          className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" /> Añadir
        </Button>
      </div>
    </div>
  );
};