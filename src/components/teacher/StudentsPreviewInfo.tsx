import { Link } from "react-router-dom";
import Button from "../common/Button/Button";
import { StudentsPreviewInfoProps } from "../../types/Props/Students/StudentsPreviewInfoProps";

export default function StudentsPreviewInfo({
  student,
}: StudentsPreviewInfoProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div className="flex-1">
        <h3 className="text-base sm:text-lg font-medium text-[#333333] leading-snug break-words">
          {student.first_name} {student.last_name}
        </h3>
        <p className="mt-1 text-sm text-[#A0A0A0] break-words">
          {student.email}
        </p>
      </div>
      <Link to={`/teacher/students/${student.id}`} className="w-full sm:w-auto">
        <Button className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base">
          Ver perfil
        </Button>
      </Link>
    </div>
  );
}
