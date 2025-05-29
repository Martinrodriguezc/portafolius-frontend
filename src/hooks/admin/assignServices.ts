import { useState, useCallback, useRef, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { config } from '../../config/config';
import { checkAdminStatus } from './adminCheck';
import { authService } from '../auth/authServices';
import { Assignment, AssignTeacherResponse } from '../../types/Admin/AssignmentTypes';

export const useAssignServices = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);
  const isLoadingRef = useRef(false);

  const fetchAssignments = useCallback(async (force = false) => {
    // Usar una referencia para evitar llamadas concurrentes y efectos de re-renderizado
    if (isLoadingRef.current && !force) return;
    
    // Si no es forzado y la última carga fue hace menos de 30 segundos, usar caché
    const now = Date.now();
    if (!force && now - lastFetchTime < 30000 && assignments.length > 0) {
      return;
    }

    // Establecer estado de carga
    isLoadingRef.current = true;
    setLoading(true);
    setError(null);

    const adminCheck = checkAdminStatus();
    if (!adminCheck.isAdmin) {
      setLoading(false);
      isLoadingRef.current = false;
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
      setLastFetchTime(now);
    } catch (e: unknown) {
      let errorMessage = 'Error al obtener las asignaciones';
      if (e instanceof AxiosError && e.response?.data?.msg) {
        errorMessage = e.response.data.msg;
      } else if (e instanceof Error) {
        errorMessage = e.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  }, [lastFetchTime, assignments.length]); // Eliminado loading de las dependencias

  // Cargar asignaciones al inicializar el hook
  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

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

      await fetchAssignments(true); 
      
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

  return {
    assignTeacherToStudent,
    fetchAssignments,
    assignments,
    loading,
    error
  };
}; 