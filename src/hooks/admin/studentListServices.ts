import { useState, useEffect } from 'react';
import { useUserServices } from './userServices';
import { useAssignServices } from './assignServices';
import { User } from '../../types/Admin/UserTypes';

interface StudentWithAssignment extends User {
  assignedTeacher?: {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
  };
}

export const useStudentList = () => {
  const { students, loading: studentsLoading } = useUserServices();
  const { assignments, loading: assignmentsLoading } = useAssignServices();
  const [studentsWithAssignments, setStudentsWithAssignments] = useState<StudentWithAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);


  useEffect(() => {
    if (!studentsLoading && !assignmentsLoading) {
      const updatedStudents = students.map(student => {
        const assignment = assignments.find(a => a.student.id === student.id);
        return {
          ...student,
          assignedTeacher: assignment ? {
            id: assignment.teacher.id,
            firstName: assignment.teacher.firstName,
            lastName: assignment.teacher.lastName,
            fullName: assignment.teacher.fullName
          } : undefined
        };
      });
      setStudentsWithAssignments(updatedStudents);
      setLoading(false);
    }
  }, [students, assignments, studentsLoading, assignmentsLoading]);

  const getFilteredStudents = (searchTerm: string = '') => {
    if (!searchTerm.trim()) return studentsWithAssignments;
    
    const searchLower = searchTerm.toLowerCase();
    return studentsWithAssignments.filter(student => 
      student.first_name.toLowerCase().includes(searchLower) ||
      student.last_name.toLowerCase().includes(searchLower) ||
      student.email.toLowerCase().includes(searchLower)
    );
  };

  return {
    students: studentsWithAssignments,
    getFilteredStudents,
    loading,
    error,
  };
}; 