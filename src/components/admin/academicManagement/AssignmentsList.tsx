import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useAssignServices } from '../../../hooks/admin/assignServices';
import { Search, RefreshCw } from 'lucide-react';

export const AssignmentsList: React.FC = () => {
  const { assignments, loading, error, fetchAssignments } = useAssignServices();
  const [searchTerm, setSearchTerm] = useState('');
  const [displayCount, setDisplayCount] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);

  // Al montar, traemos las asignaciones
  useEffect(() => {
    fetchAssignments();
  }, []);

  // Filtrado por búsqueda
  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return assignments;
    return assignments.filter(({ student, teacher }) => {
      // Validación defensiva para evitar errores con datos undefined
      const studentName = student?.fullName || '';
      const teacherName = teacher?.fullName || '';
      return studentName.toLowerCase().includes(term) ||
             teacherName.toLowerCase().includes(term);
    });
  }, [assignments, searchTerm]);

  // Paginación por scroll
  const displayed = useMemo(() => filtered.slice(0, displayCount), [filtered, displayCount]);
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop <= el.clientHeight * 1.5) {
      setDisplayCount(prev => Math.min(prev + 10, filtered.length));
    }
  }, [filtered.length]);

  const formatDate = (s?: string) => {
    if (!s) return 'Fecha no disponible';
    const d = new Date(s);
    if (isNaN(d.getTime())) return 'Fecha inválida';
    return d.toLocaleDateString('es-ES', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">Cargando asignaciones…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
        <p className="font-medium">Error al cargar las asignaciones</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Asignaciones Actuales</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.reload()}
              disabled={loading}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              title="Actualizar página"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
            <div className="relative w-72">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar profesor o estudiante…"
                className="pl-10 pr-3 py-2 border rounded-md w-full focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            {searchTerm
              ? 'No se encontraron resultados para tu búsqueda.'
              : 'No hay asignaciones registradas.'}
          </p>
        ) : (
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="overflow-y-auto max-h-[600px]"
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estudiante</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profesor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayed.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{a.student?.fullName || 'Estudiante no disponible'}</td>
                    <td className="px-6 py-4">{a.teacher?.fullName || 'Profesor no disponible'}</td>
                    <td className="px-6 py-4">{formatDate(a.assignedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {displayed.length < filtered.length && (
              <p className="text-center py-4 text-sm text-gray-500">
                Desplázate para cargar más…
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};