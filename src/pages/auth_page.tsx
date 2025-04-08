import { useState } from 'react';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  
  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userType: '',
    password: ''
  });
  
  // Estado para errores de cada campo
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userType: '',
    password: ''
  });

  // Manejar cambios en los campos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Validar el formulario
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reiniciar errores
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      userType: '',
      password: ''
    };
    
    let isValid = true;
    
    // Validar nombre
    if (!formData.firstName.trim()) {
      errors.firstName = 'El nombre es obligatorio';
      isValid = false;
    }
    
    // Validar apellido
    if (!formData.lastName.trim()) {
      errors.lastName = 'El apellido es obligatorio';
      isValid = false;
    }
    
    // Validar email
    if (!formData.email.trim()) {
      errors.email = 'El correo electrónico es obligatorio';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Ingresa un correo electrónico válido';
      isValid = false;
    }
    
    // Validar tipo de usuario
    if (!formData.userType) {
      errors.userType = 'Por favor, selecciona un tipo de usuario';
      isValid = false;
    }
    
    // Validar contraseña
    if (!formData.password) {
      errors.password = 'La contraseña es obligatoria';
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
      isValid = false;
    } else if (!/[!@#$%^&*]/.test(formData.password)) {
      errors.password = 'La contraseña debe contener al menos un símbolo especial';
      isValid = false;
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = 'La contraseña debe contener al menos una letra mayúscula';
      isValid = false;
    }
    
    setFormErrors(errors);
    
    if (isValid) {
      // Aquí iría el código para enviar el formulario
      console.log('Formulario enviado correctamente', formData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFB] p-4">
      <div className="w-full max-w-md">
        <div className="bg-white border-none shadow-sm rounded-[16px] p-8">
          {/* Tabs */}
          <div className="grid w-full grid-cols-2 mb-6 border rounded-md overflow-hidden">
            <button 
              className={`py-2 ${activeTab === 'login' ? 'bg-[#4E81BD] text-white' : 'bg-gray-100'}`}
              onClick={() => setActiveTab('login')}
            >
              Iniciar Sesión
            </button>
            <button 
              className={`py-2 ${activeTab === 'register' ? 'bg-[#4E81BD] text-white' : 'bg-gray-100'}`}
              onClick={() => setActiveTab('register')}
            >
              Registrarse
            </button>
          </div>

          {/* Login Tab */}
          {activeTab === 'login' && (
            <div>
              <div className="flex flex-col items-center mb-6">
                <h1 className="text-[32px] font-bold text-[#4E81BD]">PortafoliUS</h1>
                <h2 className="text-[20px] font-bold text-[#333333] mt-4">Iniciar sesión</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[14px] text-[#333333]">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="w-full h-[42px] text-[14px] border border-[#A0A0A0] rounded-[8px] px-3"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-[14px] text-[#333333]">
                      Contraseña
                    </label>
                    <a href="#" className="text-[13px] text-[#4E81BD]">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="w-full h-[42px] text-[14px] border border-[#A0A0A0] rounded-[8px] px-3"
                  />
                </div>
                <button className="w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[14px] font-medium py-[12px] rounded-[8px] mt-4">
                  Iniciar Sesión
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#A0A0A0]/30"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-2 text-[#A0A0A0]">O continúa con</span>
                  </div>
                </div>

                <button className="w-full border border-[#A0A0A0] text-[14px] font-medium py-[12px] rounded-[8px] flex items-center justify-center">
                  <svg
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Iniciar sesión con Google
                </button>

                <div className="text-center mt-4">
                  <span className="text-[13px] text-[#333333]">¿No tienes una cuenta? </span>
                  <a 
                    href="#" 
                    className="text-[13px] font-bold text-[#4E81BD]"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('register');
                    }}
                  >
                    Regístrate
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Register Tab */}
          {activeTab === 'register' && (
            <div>
              <div className="flex flex-col items-center mb-6">
                <h1 className="text-[32px] font-bold text-[#4E81BD]">PortafoliUS</h1>
                <h2 className="text-[20px] font-bold text-[#333333] mt-4">Registrarse</h2>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-[14px] text-[#333333]">
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      placeholder="Tu nombre"
                      className={`w-full h-[42px] text-[14px] border ${formErrors.firstName ? 'border-red-500' : 'border-[#A0A0A0]'} rounded-[8px] px-3`}
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    {formErrors.firstName && (
                      <p className="text-red-500 text-[12px] mt-1">{formErrors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-[14px] text-[#333333]">
                      Apellido <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      placeholder="Tu apellido"
                      className={`w-full h-[42px] text-[14px] border ${formErrors.lastName ? 'border-red-500' : 'border-[#A0A0A0]'} rounded-[8px] px-3`}
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    {formErrors.lastName && (
                      <p className="text-red-500 text-[12px] mt-1">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[14px] text-[#333333]">
                    Correo electrónico <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className={`w-full h-[42px] text-[14px] border ${formErrors.email ? 'border-red-500' : 'border-[#A0A0A0]'} rounded-[8px] px-3`}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-[12px] mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="userType" className="block text-[14px] text-[#333333]">
                    Tipo de usuario <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="userType"
                    className={`w-full h-[42px] text-[14px] border ${formErrors.userType ? 'border-red-500' : 'border-[#A0A0A0]'} rounded-[8px] px-3`}
                    value={formData.userType}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Selecciona tu rol</option>
                    <option value="student">Estudiante</option>
                    <option value="teacher">Profesor</option>
                  </select>
                  {formErrors.userType && (
                    <p className="text-red-500 text-[12px] mt-1">{formErrors.userType}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-[14px] text-[#333333]">
                    Contraseña <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    className={`w-full h-[42px] text-[14px] border ${formErrors.password ? 'border-red-500' : 'border-[#A0A0A0]'} rounded-[8px] px-3`}
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setShowPasswordRequirements(true)}
                  />
                  {showPasswordRequirements && (
                    <div className="text-[12px] text-gray-600 bg-gray-50 p-2 rounded border border-gray-200 mt-1">
                      La contraseña debe tener:
                      <ul className="list-disc pl-5 mt-1">
                        <li>Mínimo 8 caracteres</li>
                        <li>Al menos un símbolo especial (!@#$%^&*)</li>
                        <li>Al menos una letra en mayúscula</li>
                      </ul>
                    </div>
                  )}
                  {formErrors.password && (
                    <p className="text-red-500 text-[12px] mt-1">{formErrors.password}</p>
                  )}
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[14px] font-medium py-[12px] rounded-[8px] mt-4"
                >
                  Registrarse
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
