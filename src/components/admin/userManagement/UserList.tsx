import React, { useState, useEffect } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import { useUserServices } from '../../../hooks/admin/userServices';
import UserTable from './UserTable';
import UserModal from './UserModal';
import { User } from '../../../types/Admin/UserTypes';
import { useLocation } from 'react-router-dom';

export const UserList: React.FC = () => {
  const { students, teachers, loading, error, fetchUsers } = useUserServices();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'estudiante' | 'profesor'>('estudiante');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('action') === 'new') {
      setIsModalOpen(true);
    }
  }, [location.search]);

  const filterUsers = (users: User[]) => {
    if (!searchTerm) return users;
    
    return users.filter(user => 
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredStudents = filterUsers(students);
  const filteredTeachers = filterUsers(teachers);

  const handleUserUpdate = () => {
    fetchUsers();
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-pulse">
          <p className="text-gray-500">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => fetchUsers()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full sm:w-auto justify-center"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle className="h-5 w-5" />
          <span>Añadir Usuario</span>
        </button>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-4">
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'estudiante'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('estudiante')}
          >
            Estudiantes ({filteredStudents.length})
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'profesor'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('profesor')}
          >
            Profesores ({filteredTeachers.length})
          </button>
        </nav>
      </div>

      <div className="mt-4">
        {activeTab === 'estudiante' ? (
          <UserTable users={filteredStudents} userType="estudiante" onUserUpdate={handleUserUpdate} />
        ) : (
          <UserTable users={filteredTeachers} userType="profesor" onUserUpdate={handleUserUpdate} />
        )}
      </div>

      {isModalOpen && (
        <UserModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleUserUpdate} 
          userType={activeTab}
        />
      )}
    </div>
  );
}; 