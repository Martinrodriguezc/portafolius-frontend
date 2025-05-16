import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { config } from '../../config/config';
import { checkAdminStatus } from './adminCheck';
import { authService } from '../auth/authServices';
import { Assignment, AssignTeacherResponse } from '../../types/Admin/AssignmentTypes';

export const useAssignServices = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const assignTeacherToStudent = async (
    teacherEmail: string,
    studentEmail: string
  ): Promise<AssignTeacherResponse> => {
    setLoading(true);
    setError(null);

    const adminCheck = checkAdminStatus();
    if (!adminCheck.isAdmin) {
      setLoading(false);
      return { 
        success: false, 
        error: adminCheck.error || 'No tienes permisos de administrador' 
      };
    }

    try {
      const response = await axios.post(
        `${config.SERVER_URL}/admin/assign-teacher`,
        { teacherEmail, studentEmail },
        {
          headers: {
            'Authorization': `Bearer ${authService.getToken()}`
          }
        }
      );

      await fetchAssignments(); 
      
      setLoading(false);
      return {
        success: true,
        data: response.data
      };
    } catch (e: unknown) {
      let errorMessage = 'Error al asignar profesor';
      if (e instanceof AxiosError && e.response?.data?.msg) {
        errorMessage = e.response.data.msg;
      } else if (e instanceof Error) {
        errorMessage = e.message;
      }
      setError(errorMessage);
      setLoading(false);
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const fetchAssignments = async () => {
    setLoading(true);
    setError(null);

    const adminCheck = checkAdminStatus();
    if (!adminCheck.isAdmin) {
      setLoading(false);
      setError(adminCheck.error || 'No tienes permisos de administrador');
      return;
    }

    try {
      const response = await axios.get(
        `${config.SERVER_URL}/admin/assignments`,
        {
          headers: {
            'Authorization': `Bearer ${authService.getToken()}`
          }
        }
      );

      setAssignments(response.data.assignments);
      setLoading(false);
    } catch (e: unknown) {
      let errorMessage = 'Error al obtener las asignaciones';
      if (e instanceof AxiosError && e.response?.data?.msg) {
        errorMessage = e.response.data.msg;
      } else if (e instanceof Error) {
        errorMessage = e.message;
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  return {
    assignTeacherToStudent,
    fetchAssignments,
    assignments,
    loading,
    error
  };
}; 