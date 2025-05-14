import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useUserServices } from '../../../hooks/admin/userServices';
import { UserFormData } from '../../../types/Admin/UserTypes';
import { UserModalProps } from '../../../types/Props/AdminUserProps';

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, userType, user }) => {
  const { addUser, updateUser } = useUserServices();
  const [formData, setFormData] = useState<UserFormData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: userType,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const role = user.role === 'estudiante' ? 'estudiante' : 
                   user.role === 'profesor' ? 'profesor' : 
                   user.role === 'admin' ? 'admin' : 'estudiante';
      
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: '',
        role: role,
      });
    } else {
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: userType,
      });
    }
  }, [user, userType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (user) {
        const userData = { ...formData };
        const dataToUpdate = { ...userData };
        if (!formData.password) {
          const { password, ...restData } = dataToUpdate;
          const result = await updateUser(user.id, restData);
          
          if (result.success) {
            onSave();
          } else if (result.error) {
            setError(result.error);
          }
        } else {
          const result = await updateUser(user.id, dataToUpdate);
          
          if (result.success) {
            onSave();
          } else if (result.error) {
            setError(result.error);
          }
        }
      } else {
        if (!formData.password) {
          setError('La contraseña es requerida para nuevos usuarios');
          setIsSubmitting(false);
          return;
        }

        const result = await addUser(formData);
        if (result.success) {
          onSave();
        } else if (result.error) {
          setError(result.error);
        }
      }
    } catch (err) {
      setError('Ha ocurrido un error. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md bg-white shadow-xl border-l border-gray-200 overflow-y-auto">
      <div className="p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {user ? 'Editar Usuario' : 'Añadir Nuevo Usuario'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellido
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña {user && '(Dejar en blanco para mantener la actual)'}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required={!user}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rol
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="estudiante">Estudiante</option>
                <option value="profesor">Profesor</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : user ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal; 