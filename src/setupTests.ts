import '@testing-library/jest-dom';

// Mock de React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
  }),
}));

// Mock de variables de entorno
process.env.VITE_API_URL = 'http://localhost:3000';

// Mock de console para tests más limpios
global.console = {
  ...console,
  // Silenciar warnings esperados en tests
  warn: jest.fn(),
  error: jest.fn(),
}; 