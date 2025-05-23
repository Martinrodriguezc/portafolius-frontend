import { useState, useEffect } from "react";
import axios from "axios";
import { authService } from "../auth/authServices";
import { config } from "../../config/config";

interface PendingTeacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  created_at: string | Date;
}

export function usePendingTeachers() {
  const [pendingTeachers, setPendingTeachers] = useState<PendingTeacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingTeachers = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = authService.getToken();
      
      if (!token) {
        throw new Error("No hay token de autenticación");
      }

      const response = await axios.get(`${config.SERVER_URL}/admin/usuarios/profesores-pendientes`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = response.data.profesores || [];
      setPendingTeachers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching pending teachers:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
      setPendingTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  const approveTeacher = async (teacherId: number) => {
    try {
      const token = authService.getToken();
      
      if (!token) {
        throw new Error("No hay token de autenticación");
      }

      await axios.patch(
        `${config.SERVER_URL}/admin/usuarios/${teacherId}/autorizar`,
        {},
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      setPendingTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
      
      return true;
    } catch (err) {
      console.error("Error approving teacher:", err);
      
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(`Error al aprobar profesor: ${errorMessage}`);
      } else {
        setError("Error desconocido al aprobar profesor");
      }
      
      return false;
    }
  };

  const rejectTeacher = async (teacherId: number) => {
    try {
      const token = authService.getToken();
      
      if (!token) {
        throw new Error("No hay token de autenticación");
      }

      await axios.delete(
        `${config.SERVER_URL}/admin/usuarios/${teacherId}/rechazar`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      setPendingTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
      
      return true;
    } catch (err) {
      console.error("Error rejecting teacher:", err);
      setError(`Error al rechazar profesor: ${err instanceof Error ? err.message : "Error desconocido"}`);
      return false;
    }
  };

  useEffect(() => {
    fetchPendingTeachers();
  }, []);

  return {
    pendingTeachers,
    loading,
    error,
    approveTeacher,
    rejectTeacher,
    refetch: fetchPendingTeachers,
  };
} 