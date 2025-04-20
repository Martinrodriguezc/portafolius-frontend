import { StudentInfo } from "../../types/student";
import Button from "../common/Button/Button";
import { Link } from "react-router-dom";
import Field from "../common/Field/Field";

const StudentsPreviewInfo = ({ student }: StudentInfo) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
    <div className="mb-4 md:mb-0">
      <div className="flex items-center">
        <h3 className="text-[16px] font-medium text-[#333333]">{student.name}</h3>
        <span
          className={`ml-2 text-[13px] px-2 py-1 rounded-full ${
            student.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {student.status === "active" ? "Activo" : "Inactivo"}
        </span>
      </div>
      <p className="text-[14px] text-[#A0A0A0]">{student.email}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <span className="text-[13px] bg-[#F4F4F4] px-2 py-1 rounded-full">
          {student.specialty}
        </span>
        <span className="text-[13px] bg-[#F4F4F4] px-2 py-1 rounded-full">
          {student.year}
        </span>
        <span className="text-[13px] bg-[#F4F4F4] px-2 py-1 rounded-full">
          {student.institution}
        </span>
      </div>
    </div>
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
      <Field label="Estudios">{student.studies}</Field>
      <Field label="Promedio">{student.averageScore}/10</Field>
      <Field label="Última actividad">{student.lastActivity}</Field>
      <Link to={`/teacher/students/${student.id}`}>
        <Button>Ver perfil</Button>
      </Link>
    </div>
  </div>
);

export default StudentsPreviewInfo;