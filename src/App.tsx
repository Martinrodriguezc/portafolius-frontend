import { useState } from 'react';
import AuthPage from './pages/auth_page';

function App() {
  const [showAuth, setShowAuth] = useState(false);
  
  if (showAuth) {
    return <AuthPage />;
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 text-center px-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">
        PortafoliUS
      </h1>
      <p className="text-lg text-gray-700 max-w-xl mb-6">
        Plataforma educativa para el aprendizaje y retroalimentación efectiva en Ultrasonido Clínico.
      </p>
      <button
        onClick={() => setShowAuth(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Comenzar
      </button>
    </div>
  );
}

export default App;
