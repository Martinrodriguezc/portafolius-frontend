import { renderHook, act } from '@testing-library/react';
import { useLoginForm } from './useLoginForm';

// Mock de authService
jest.mock('../auth/authServices', () => ({
  authService: {
    login: jest.fn(),
    initiateGoogleLogin: jest.fn(),
  },
}));

// Mock de useFormHook
jest.mock('./useFormHook', () => ({
  useFormHook: jest.fn(() => ({
    formData: { email: '', password: '' },
    formErrors: { email: '', password: '' },
    handleInputChange: jest.fn(),
  })),
}));

// Mock de validación
jest.mock('../../utils/validation/forms/formValidation', () => ({
  validateLoginForm: jest.fn(() => ({ 
    isValid: true, 
    errors: { email: '', password: '' } 
  })),
}));

import { authService } from '../auth/authServices';
import { useFormHook } from './useFormHook';
import { validateLoginForm } from '../../utils/validation/forms/formValidation';

describe('useLoginForm Hook', () => {
  const mockOnSuccess = jest.fn();
  const mockLogin = authService.login as jest.Mock;
  const mockInitiateGoogleLogin = authService.initiateGoogleLogin as jest.Mock;
  const mockUseFormHook = useFormHook as jest.Mock;
  const mockValidateLoginForm = validateLoginForm as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFormHook.mockReturnValue({
      formData: { email: 'test@example.com', password: 'password123' },
      formErrors: { email: '', password: '' },
      handleInputChange: jest.fn(),
    });
    mockValidateLoginForm.mockReturnValue({ 
      isValid: true, 
      errors: { email: '', password: '' } 
    });
  });

  it('debe inicializar con valores por defecto', () => {
    const { result } = renderHook(() => useLoginForm());

    expect(result.current.email).toBe('test@example.com');
    expect(result.current.password).toBe('password123');
    expect(result.current.emailError).toBe('');
    expect(result.current.passwordError).toBe('');
    expect(result.current.generalError).toBe('');
    expect(result.current.formIncompleteError).toBe('');
  });

  it('debe manejar envío exitoso del formulario', async () => {
    mockLogin.mockResolvedValueOnce({});
    
    const { result } = renderHook(() => useLoginForm(mockOnSuccess));

    const mockEvent = { preventDefault: jest.fn() } as React.FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockLogin).toHaveBeenCalledWith({ 
      email: 'test@example.com', 
      password: 'password123' 
    });
    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('debe mostrar error cuando la validación falla por campos vacíos', async () => {
    mockValidateLoginForm.mockReturnValue({
      isValid: false,
      errors: { email: 'required', password: 'required' }
    });
    mockUseFormHook.mockReturnValue({
      formData: { email: '', password: '' },
      formErrors: { email: 'required', password: 'required' },
      handleInputChange: jest.fn(),
    });

    const { result } = renderHook(() => useLoginForm());

    const mockEvent = { preventDefault: jest.fn() } as React.FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.formIncompleteError).toBe('Debes rellenar todos los campos.');
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('debe mostrar error general cuando el login falla', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Login failed'));

    const { result } = renderHook(() => useLoginForm());

    const mockEvent = { preventDefault: jest.fn() } as React.FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.generalError).toBe('Email o contraseña incorrectos.');
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('debe limpiar errores al enviar el formulario', async () => {
    const { result } = renderHook(() => useLoginForm());

    // Primero simular un error
    mockLogin.mockRejectedValueOnce(new Error('Login failed'));
    const mockEvent = { preventDefault: jest.fn() } as React.FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.generalError).toBe('Email o contraseña incorrectos.');

    // Luego enviar exitosamente
    mockLogin.mockResolvedValueOnce({});

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.generalError).toBe('');
    expect(result.current.formIncompleteError).toBe('');
  });

  it('debe manejar Google login', () => {
    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.handleGoogleLogin();
    });

    expect(mockInitiateGoogleLogin).toHaveBeenCalled();
  });

  it('debe exponer handleInputChange del useFormHook', () => {
    const mockHandleInputChange = jest.fn();
    mockUseFormHook.mockReturnValue({
      formData: { email: '', password: '' },
      formErrors: { email: '', password: '' },
      handleInputChange: mockHandleInputChange,
    });

    const { result } = renderHook(() => useLoginForm());

    expect(result.current.handleInputChange).toBe(mockHandleInputChange);
  });
}); 