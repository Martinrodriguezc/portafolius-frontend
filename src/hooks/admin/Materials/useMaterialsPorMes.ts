import { useCallback, useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { config } from '../../../config/config';
import { checkAdminStatus } from '../adminCheck';
import { authService } from '../../auth/authServices';
import { DatosPorMes } from '../../admin/metricsServices';
import { MaterialesPorMes, MaterialDatosPorMes } from '../../../types/Admin/MaterialTypes';

// Hook para obtener datos de materiales creados por mes
export const useMaterialesPorMes = (): MaterialesPorMes => {
  const [data, setData] = useState<MaterialDatosPorMes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const adminCheck = checkAdminStatus();
    if (!adminCheck.isAdmin) {
      setError(adminCheck.error || 'No tienes permisos de administrador');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${config.SERVER_URL}/admin/metricas/materiales-por-mes`, {
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`
        }
      });
      
      if (response.data.success) {
        // Convertir DatosPorMes a MaterialDatosPorMes
        const materialesPorMes: MaterialDatosPorMes[] = response.data.data.map((item: DatosPorMes) => ({
          ...item,
        }));
        setData(materialesPorMes);
        setLastUpdate(new Date());
      } else {
        setError('La respuesta del servidor no fue exitosa');
      }
    } catch (e: unknown) {
      let errorMsg = 'Error al obtener los datos';
      if (e instanceof AxiosError) {
        errorMsg = e.message;
      } else if (e instanceof Error) {
        errorMsg = e.message;
      }
      setError(errorMsg);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    lastUpdate
  };
}; 