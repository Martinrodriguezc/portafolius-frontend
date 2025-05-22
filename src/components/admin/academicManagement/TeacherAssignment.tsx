import React, { useState, useMemo, useCallback } from 'react';
import { useAssignServices } from '../../../hooks/admin/assignServices';
import { useUserServices } from '../../../hooks/admin/userServices';
import { useStudentList } from '../../../hooks/admin/studentListServices';
import { User } from '../../../types/Admin/UserTypes';
import { Search, CheckSquare, Square } from 'lucide-react';
import { UserListProps } from '../../../types/Props/Admin/AcademicManagementProps';

interface StudentWithAssignment extends User {
  assignedTeacher?: {
    id: string | number;
    firstName?: string;
    lastName?: string;
    fullName?: string;
  };
}

const UserList: React.FC<UserListProps> = ({
  users,
  searchTerm,
  onSelect,
  selectedUser,
  selectedUsers = [],
  placeholder,
  label,
  multiSelect = false,
  showAssignmentStatus = false
}) => {
  const isUserSelected = (user: User) => {
    return selectedUsers.some(selected => selected.id === user.id);
  };

  const getAssignmentStatus = (user: StudentWithAssignment) => {
    if (user.assignedTeacher) {
      return `Asignado a: ${user.assignedTeacher.fullName || 'profesor'}`;
    }
    return 'No asignado';
  };

  const isAssigned = (user: StudentWithAssignment) => {
    return !!user.assignedTeacher;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            if (onSelect && typeof onSelect === 'function') {
              onSelect(null as unknown as User);
            }
          }}
          placeholder={placeholder}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mt-2 border border-gray-200 rounded-md overflow-hidden">
        <div className="max-h-64 overflow-y-auto">
          <div className="grid grid-cols-1 divide-y divide-gray-200">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => onSelect(user)}
                className={`p-3 cursor-pointer transition-colors duration-150 ${
                  (multiSelect ? isUserSelected(user) : selectedUser?.id === user.id)
                    ? 'bg-blue-50 hover:bg-blue-100'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {multiSelect && (
                    <div className="flex-shrink-0">
                      {isUserSelected(user) ? (
                        <CheckSquare className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.first_name} {user.last_name}
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                      {showAssignmentStatus && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isAssigned(user as StudentWithAssignment)
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {getAssignmentStatus(user as StudentWithAssignment)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TeacherAssignment: React.FC = () => {
  const { teachers, loading: teachersLoading } = useUserServices();
  const { loading: studentsLoading, getFilteredStudents, refreshList } = useStudentList();
  const { assignTeacherToStudent, loading: assignLoading, error: assignError } = useAssignServices();
  
  const [selectedStudents, setSelectedStudents] = useState<User[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<User | null>(null);
  const [studentSearch, setStudentSearch] = useState('');
  const [teacherSearch, setTeacherSearch] = useState('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const filteredStudents = useMemo(() => {
    return getFilteredStudents(studentSearch);
  }, [getFilteredStudents, studentSearch, refreshTrigger]);

  const handleStudentSelection = useCallback((student: User) => {
    setSelectedStudents(prev => {
      const isSelected = prev.some(s => s.id === student.id);
      if (isSelected) {
        return prev.filter(s => s.id !== student.id);
      } else {
        return [...prev, student];
      }
    });
  }, []);

  const handleAssignment = async () => {
    if (selectedStudents.length === 0 || !selectedTeacher) {
      return;
    }

    setIsAssigning(true);
    try {
      let allSuccess = true;
      for (const student of selectedStudents) {
        const result = await assignTeacherToStudent(selectedTeacher.email, student.email);
        if (!result.success) {
          allSuccess = false;
        }
      }
      
      if (allSuccess) {
        setSuccessMessage('Profesor asignado exitosamente');
        setTimeout(() => setSuccessMessage(''), 3000);
        setSelectedStudents([]);
        setSelectedTeacher(null);
        setStudentSearch('');
        setTeacherSearch('');
        
        await refreshList();
        
        setRefreshTrigger(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error en la asignación:', error);
    } finally {
      setIsAssigning(false);
    }
  };

  if (isAssigning || studentsLoading || teachersLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">
            {isAssigning ? 'Procesando asignación...' : 'Cargando usuarios...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Asignar Profesor a Estudiantes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UserList
            users={filteredStudents}
            searchTerm={studentSearch}
            onSelect={handleStudentSelection}
            selectedUser={null}
            selectedUsers={selectedStudents}
            placeholder="Buscar estudiantes..."
            label="Estudiantes"
            multiSelect={true}
            showAssignmentStatus={true}
          />

          <UserList
            users={teachers.filter(t => t.role === 'profesor')}
            searchTerm={teacherSearch}
            onSelect={(user) => {
              setSelectedTeacher(user);
              if (user) {
                setTeacherSearch(`${user.first_name} ${user.last_name}`);
              }
            }}
            selectedUser={selectedTeacher}
            placeholder="Buscar profesor..."
            label="Profesor"
          />
        </div>

        <div className="mt-6 space-y-4">
          {selectedStudents.length > 0 && (
            <div className="text-sm text-gray-600">
              {selectedStudents.length} estudiante{selectedStudents.length !== 1 ? 's' : ''} seleccionado{selectedStudents.length !== 1 ? 's' : ''}
            </div>
          )}

          {assignError && (
            <div className="text-red-600 text-sm">{assignError}</div>
          )}

          {successMessage && (
            <div className="text-green-600 text-sm">{successMessage}</div>
          )}

          <button
            onClick={handleAssignment}
            disabled={selectedStudents.length === 0 || !selectedTeacher || assignLoading || isAssigning}
            className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            {assignLoading || isAssigning ? 'Asignando...' : 'Asignar Profesor'}
          </button>
        </div>
      </div>
    </div>
  );
}; 