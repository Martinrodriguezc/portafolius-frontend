import { useState } from "react";
import { Student } from "../../types/student";

export const useStudentFilter = (students: Student[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(
        (student) =>
          student.name.toLowerCase().includes(term.toLowerCase()) ||
          student.email.toLowerCase().includes(term.toLowerCase()) ||
          student.specialty.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };

  return {
    searchTerm,
    filteredStudents,
    handleSearch,
  };
};
