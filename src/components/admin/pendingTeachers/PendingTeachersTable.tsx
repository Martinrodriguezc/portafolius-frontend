import { useState } from "react";
import { Check, X, User, Mail, Calendar, UserCheck, Search } from "lucide-react";
import { usePendingTeachers } from "../../../hooks/admin/usePendingTeachers";

export default function PendingTeachersTable() {
  const { 
    pendingTeachers, 
    loading, 
    error, 
    approveTeacher, 
    rejectTeacher 
  } = usePendingTeachers();

  const [searchTerm, setSearchTerm] = useState("");

  const handleApprove = async (teacherId: number) => {
    const teacher = pendingTeachers.find(t => t.id === teacherId);
    const teacherName = teacher ? `${teacher.first_name} ${teacher.last_name}` : 'este profesor';
    
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas aprobar a ${teacherName}?\n\nEsta acción no se puede deshacer.`
    );
    
    if (!confirmed) return;
    
    const success = await approveTeacher(teacherId);
    if (success) {
      alert(`${teacherName} ha sido aprobado exitosamente.`);
    }
  };

  const handleReject = async (teacherId: number) => {
    const teacher = pendingTeachers.find(t => t.id === teacherId);
    const teacherName = teacher ? `${teacher.first_name} ${teacher.last_name}` : 'este profesor';
    
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas rechazar a ${teacherName}?\n\nEsta acción no se puede deshacer y el profesor no podrá acceder al sistema.`
    );
    
    if (!confirmed) return;
    
    const success = await rejectTeacher(teacherId);
    if (success) {
      alert(`${teacherName} ha sido rechazado.`);
    }
  };

  const formatDate = (dateInput: string | Date) => {
    let date: Date;
    
    if (typeof dateInput === 'string') {
      date = new Date(dateInput);
    } else {
      date = dateInput;
    }
    
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Filtrar profesores por término de búsqueda
  const filteredTeachers = Array.isArray(pendingTeachers) 
    ? pendingTeachers.filter(teacher => {
        const fullName = `${teacher.first_name} ${teacher.last_name}`.toLowerCase();
        const email = teacher.email.toLowerCase();
        const search = searchTerm.toLowerCase();
        
        return fullName.includes(search) || email.includes(search);
      })
    : [];

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Buscador */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Contador de resultados */}
      {searchTerm && (
        <div className="text-sm text-gray-600">
          {filteredTeachers.length} resultado(s) encontrado(s) para "{searchTerm}"
        </div>
      )}

      {/* Lista de profesores */}
      {filteredTeachers.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <UserCheck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? "No se encontraron profesores" : "No hay profesores pendientes"}
          </h3>
          <p className="text-gray-600">
            {searchTerm 
              ? "Intenta con otros términos de búsqueda" 
              : "Todas las solicitudes de profesores han sido procesadas."
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {teacher.first_name} {teacher.last_name}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <Mail className="h-4 w-4 mr-1" />
                        {teacher.email}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Registrado el {formatDate(teacher.created_at)}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleApprove(teacher.id)}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Aprobar
                  </button>
                  <button
                    onClick={() => handleReject(teacher.id)}
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 