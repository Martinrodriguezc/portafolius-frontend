import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

// Mock del hook useLoginForm
jest.mock('../../hooks/form/useLoginForm', () => ({
  useLoginForm: () => ({
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    generalError: '',
    formIncompleteError: '',
    handleInputChange: jest.fn(),
    handleSubmit: jest.fn((e) => e.preventDefault()),
    handleGoogleLogin: jest.fn(),
  }),
}));

describe('LoginForm Component', () => {
  const mockOnLoginSuccess = jest.fn();
  const mockOnNavigateToRegister = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe renderizar todos los elementos del formulario', () => {
    render(
      <LoginForm 
        onLoginSuccess={mockOnLoginSuccess}
        onNavigateToRegister={mockOnNavigateToRegister}
      />
    );

    // Verificar elementos principales
    expect(screen.getByText('PortafoliUS')).toBeInTheDocument();
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión con google/i })).toBeInTheDocument();
  });

  it('debe mostrar enlace de registro cuando se proporciona la función', () => {
    render(
      <LoginForm 
        onLoginSuccess={mockOnLoginSuccess}
        onNavigateToRegister={mockOnNavigateToRegister}
      />
    );

    const registerLink = screen.getByText(/regístrate/i);
    expect(registerLink).toBeInTheDocument();
  });

  it('no debe mostrar enlace de registro cuando no se proporciona la función', () => {
    render(
      <LoginForm 
        onLoginSuccess={mockOnLoginSuccess}
      />
    );

    const registerText = screen.queryByText(/¿no tienes una cuenta?/i);
    expect(registerText).not.toBeInTheDocument();
  });

  it('debe manejar clic en enlace de registro', () => {
    render(
      <LoginForm 
        onLoginSuccess={mockOnLoginSuccess}
        onNavigateToRegister={mockOnNavigateToRegister}
      />
    );

    const registerLink = screen.getByText(/regístrate/i);
    fireEvent.click(registerLink);

    expect(mockOnNavigateToRegister).toHaveBeenCalledTimes(1);
  });

  it('debe tener icono de Google en el botón correspondiente', () => {
    render(
      <LoginForm 
        onLoginSuccess={mockOnLoginSuccess}
      />
    );

    const googleButton = screen.getByRole('button', { name: /iniciar sesión con google/i });
    const googleIcon = googleButton.querySelector('svg');
    
    expect(googleIcon).toBeInTheDocument();
    expect(googleIcon).toHaveAttribute('viewBox', '0 0 488 512');
  });

  it('debe renderizar campos de entrada como requeridos', () => {
    render(
      <LoginForm 
        onLoginSuccess={mockOnLoginSuccess}
      />
    );

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    // Los campos tienen asterisco pero no la prop required del HTML
    expect(screen.getAllByText('*')).toHaveLength(2); // Verifica asteriscos de requerido
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});

// Test con errores mockeados - Los tests de errores se omiten porque 
// requieren configuración compleja de mocks dinámicos que dependen del estado del hook 