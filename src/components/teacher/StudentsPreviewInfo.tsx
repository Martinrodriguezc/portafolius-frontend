import { Link } from "react-router-dom";
import Button from "../common/Button/Button";
import { StudentsPreviewInfoProps } from "../../types/Props/Students/StudentsPreviewInfoProps";

export default function StudentsPreviewInfo({
  student,
}: StudentsPreviewInfoProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-medium">
          {student.first_name} {student.last_name}
        </h3>
        <p className="text-sm text-[#A0A0A0]">{student.email}</p>
      </div>
      <Link to={`/teacher/students/${student.id}`}>
        <Button>Ver perfil</Button>
      </Link>
    </div>
  );
}
