import { useState, useEffect } from 'react';
import axios from 'axios';
import { config } from '../../config/config';
import { checkAdminStatus } from './adminCheck';
import { authService } from '../auth/authServices';
import { DashboardStats } from '../../types/Admin/DashboardTypes';

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardStats = async () => {
    setLoading(true);
    setError(null);
    
    const adminCheck = checkAdminStatus();
    if (!adminCheck.isAdmin) {
      setError(adminCheck.error || 'No tienes permisos de administrador');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${config.SERVER_URL}/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`
        }
      });
      setStats(response.data);
    } catch (err) {
      setError('Error al obtener las estadísticas del dashboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchDashboardStats
  };
}; 