import { useState, useEffect, useCallback, useRef } from 'react';
import { useUserServices } from './userServices';
import { useAssignServices } from './assignServices';
import { User } from '../../types/Admin/UserTypes';

interface StudentWithAssignment extends User {
  assignedTeacher?: {
    id: string;
    fullName: string;
  };
}

export const useStudentList = () => {
  const { students, loading: studentsLoading, fetchUsers } = useUserServices();
  const { assignments, loading: assignmentsLoading, fetchAssignments } = useAssignServices();
  const [studentsWithAssignments, setStudentsWithAssignments] = useState<StudentWithAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const refreshCounterRef = useRef(0);

  const getFilteredStudents = useCallback((searchTerm: string = '') => {
    if (!searchTerm.trim()) return studentsWithAssignments;
    
    const searchLower = searchTerm.toLowerCase();
    return studentsWithAssignments.filter(student => 
      student.first_name.toLowerCase().includes(searchLower) ||
      student.last_name.toLowerCase().includes(searchLower) ||
      student.email.toLowerCase().includes(searchLower)
    );
  }, [studentsWithAssignments]);

  useEffect(() => {
    if (!studentsLoading && !assignmentsLoading) {
      try {
        const updatedStudents = students.map(student => {
          // Buscar si hay una asignación para este estudiante
          const assignment = assignments.find(a => a.student.id === student.id);
          
          // Si hay asignación, devolver estudiante con datos del profesor
          if (assignment) {
            return {
              ...student,
              assignedTeacher: {
                id: assignment.teacher.id,
                fullName: assignment.teacher.fullName || 
                          `${assignment.teacher.firstName || ''} ${assignment.teacher.lastName || ''}`.trim() ||
                          'Profesor'
              }
            };
          } 
          
          // Si no hay asignación, devolver estudiante sin profesor asignado
          return { ...student };
        });
        
        setStudentsWithAssignments(updatedStudents);
        setError(null);
      } catch (err) {
        setError('Error al procesar los datos de los estudiantes');
        console.error('Error processing student data:', err);
      } finally {
        setLoading(false);
      }
    }
  }, [students, assignments, studentsLoading, assignmentsLoading, refreshCounterRef.current]);

  const refreshList = useCallback(async () => {
    setLoading(true);
    try {
      // Forzar la recarga de usuarios y asignaciones
      await Promise.all([
        fetchUsers(),
        fetchAssignments(true)
      ]);
      
      // Incrementar el contador para forzar la actualización del efecto
      refreshCounterRef.current += 1;
    } catch (err) {
      console.error('Error refreshing data:', err);
      setError('Error al actualizar los datos');
      setLoading(false);
    }
  }, [fetchUsers, fetchAssignments]);

  return {
    students: studentsWithAssignments,
    getFilteredStudents,
    loading,
    error,
    refreshList
  };
}; 