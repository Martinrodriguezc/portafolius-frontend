import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState('login');

  return (
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
        <LoginForm onSwitchTab={() => setActiveTab('register')} />
      )}

      {/* Register Tab */}
      {activeTab === 'register' && (
        <RegisterForm />
      )}
    </div>
  );
} 