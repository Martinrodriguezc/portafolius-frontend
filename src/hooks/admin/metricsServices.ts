import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { config } from '../../config/config';
import { checkAdminStatus } from './adminCheck';
import { authService } from '../auth/authServices';

// Interfaces para tipos de datos
export interface DistribucionUsuarios {
  role: string;
  cantidad: number;
}

export interface DatosPorMes {
  mes: string;
  cantidad: number;
}

export interface TasaFinalizacion {
  estudios_evaluados: number;
  total_estudios: number;
  tasa_finalizacion: number;
}

export interface Profesor {
  id: number;
  nombre: string;
  evaluaciones: number;
}

export interface MaterialPorTipo {
  tipo: string;
  cantidad: number;
}

export interface UsuarioConPromedio {
  id: number;
  nombre_completo: string;
  promedio: number;
  cantidad_evaluaciones: number;
}

export interface PromedioUsuarios {
  top_usuarios: UsuarioConPromedio[];
  bottom_usuarios: UsuarioConPromedio[];
}

// Hook genérico para consumir cualquier endpoint de métricas
const useMetricaData = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
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
      const response = await axios.get(`${config.SERVER_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`
        }
      });
      
      if (response.data.success) {
        setData(response.data.data);
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
  }, [endpoint]);

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

// Hooks específicos para cada métrica
export const useUsuariosPorRol = () => 
  useMetricaData<DistribucionUsuarios[]>('/admin/metricas/usuarios-por-rol');

export const useUsuariosPorMes = () => 
  useMetricaData<DatosPorMes[]>('/admin/metricas/usuarios-por-mes');

export const useEstudiosPorMes = () => 
  useMetricaData<DatosPorMes[]>('/admin/metricas/estudios-por-mes');

export const useTasaFinalizacionEstudios = () => 
  useMetricaData<TasaFinalizacion>('/admin/metricas/tasa-finalizacion-estudios');

export const useTopProfesoresEvaluaciones = () => 
  useMetricaData<Profesor[]>('/admin/metricas/top-profesores-evaluaciones');

export const useVideoClipsPorMes = () => 
  useMetricaData<DatosPorMes[]>('/admin/metricas/video-clips-por-mes');

export const useMaterialPorTipo = () => 
  useMetricaData<MaterialPorTipo[]>('/admin/metricas/material-por-tipo');

export const useUsuariosPorPromedio = () => 
  useMetricaData<PromedioUsuarios>('/admin/metricas/usuarios-por-promedio');

// Función de utilidad para formatear fechas
export const formatearMes = (fechaYYYYMM: string): string => {
  const [anio, mes] = fechaYYYYMM.split('-');
  const fecha = new Date(parseInt(anio), parseInt(mes) - 1);
  return fecha.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
};

// Función para exportar datos a CSV
export const exportarCSV = <T extends Record<string, unknown>>(datos: T[], nombreArchivo: string): void => {
  if (!datos.length) return;
  
  const headers = Object.keys(datos[0]).join(',');
  const filas = datos.map(item => Object.values(item).join(',')).join('\n');
  const csv = `${headers}\n${filas}`;
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${nombreArchivo}_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 