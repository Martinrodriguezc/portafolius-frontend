import { Label } from "../../common/Label/Label";
import { UserProps } from "../../../types/User";

interface StudentSelectionListProps {
  students: UserProps[];
  selectedStudentIds: number[];
  isLoading: boolean;
  error: string | null;
  onToggleStudent: (id: number | string) => void;
}

export default function StudentSelectionList({ 
  students, 
  selectedStudentIds, 
  isLoading, 
  error, 
  onToggleStudent 
}: StudentSelectionListProps) {
  if (error) {
    return <p className="text-red-500 mb-4">{error}</p>;
  }

  return (
    <div>
      <Label htmlFor="students">Estudiantes</Label>
      {isLoading ? (
        <p className="py-2">Cargando estudiantes…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded p-2">
          {students.map((student) => {
            const studentId = typeof student.id === "string" ? parseInt(student.id, 10) : student.id;
            const isSelected = selectedStudentIds.includes(studentId);
            
            return (
              <label key={student.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleStudent(student.id)}
                  className="h-4 w-4 text-[#4E81BD] border-gray-300 rounded"
                />
                <span className={isSelected ? "font-medium" : ""}>
                  {student.first_name} {student.last_name} ({student.email})
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
} 