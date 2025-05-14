import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { useAssignServices } from '../../../hooks/admin/assignServices';
import { Search } from 'lucide-react';

export const AssignmentsList: React.FC = () => {
  const { assignments, loading, error, fetchAssignments } = useAssignServices();
  const [searchTerm, setSearchTerm] = useState('');
  const [displayCount, setDisplayCount] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const filteredAssignments = useMemo(() => {
    if (!searchTerm.trim()) return assignments;

    const searchTermLower = searchTerm.toLowerCase();
    return assignments.filter((assignment) => {
      const teacherName = assignment.teacher.fullName.toLowerCase();
      const studentName = assignment.student.fullName.toLowerCase();
      return teacherName.includes(searchTermLower) || studentName.includes(searchTermLower);
    });
  }, [assignments, searchTerm]);

  const displayedAssignments = useMemo(() => {
    return filteredAssignments.slice(0, displayCount);
  }, [filteredAssignments, displayCount]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      setDisplayCount(prev => Math.min(prev + 10, filteredAssignments.length));
    }
  }, [filteredAssignments.length]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="text-center py-4">Cargando asignaciones...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Asignaciones Actuales</h2>
          <div className="relative w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por profesor o estudiante..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        
        {filteredAssignments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            {searchTerm ? 'No se encontraron asignaciones que coincidan con la búsqueda' : 'No hay asignaciones registradas'}
          </p>
        ) : (
          <div 
            ref={containerRef}
            className="overflow-y-auto max-h-[600px]"
            onScroll={handleScroll}
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estudiante
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profesor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Asignación
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayedAssignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {assignment.student.fullName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {assignment.teacher.fullName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(assignment.assignedAt)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {displayCount < filteredAssignments.length && (
              <div className="text-center py-4 text-sm text-gray-500">
                Desplázate hacia abajo para ver más asignaciones
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 