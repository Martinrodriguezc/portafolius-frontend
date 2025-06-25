import { renderHook, act } from '@testing-library/react';
import { useRegisterForm } from './useRegisterForm';

// Mock de authService
jest.mock('../auth/authServices', () => ({
  authService: {
    register: jest.fn(),
  },
}));

// Mock de useFormHook
jest.mock('./useFormHook', () => ({
  useFormHook: jest.fn(() => ({
    formData: {
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan@test.com',
      password: 'Password123!',
      role: 'student',
    },
    formErrors: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
    },
    handleInputChange: jest.fn(),
  })),
}));

// Mock de validación
jest.mock('../../utils/validation/forms/formValidation', () => ({
  validateRegisterForm: jest.fn(() => ({ 
    isValid: true, 
    errors: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
    }
  })),
}));

import { authService } from '../auth/authServices';
import { useFormHook } from './useFormHook';
import { validateRegisterForm } from '../../utils/validation/forms/formValidation';

describe('useRegisterForm Hook', () => {
  const mockOnSuccess = jest.fn();
  const mockRegister = authService.register as jest.Mock;
  const mockUseFormHook = useFormHook as jest.Mock;
  const mockValidateRegisterForm = validateRegisterForm as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFormHook.mockReturnValue({
      formData: {
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@test.com',
        password: 'Password123!',
        role: 'student',
      },
      formErrors: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
      },
      handleInputChange: jest.fn(),
    });
    mockValidateRegisterForm.mockReturnValue({ 
      isValid: true, 
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
      }
    });
  });

  it('debe inicializar con valores por defecto', () => {
    const { result } = renderHook(() => useRegisterForm());

    expect(result.current.formData.firstName).toBe('Juan');
    expect(result.current.formData.lastName).toBe('Pérez');
    expect(result.current.formData.email).toBe('juan@test.com');
    expect(result.current.showPasswordRequirements).toBe(false);
    expect(result.current.errorMessage).toBe('');
  });

  it('debe mostrar requerimientos de contraseña en focus', () => {
    const { result } = renderHook(() => useRegisterForm());

    act(() => {
      result.current.handlePasswordFocus();
    });

    expect(result.current.showPasswordRequirements).toBe(true);
  });

  it('debe manejar envío exitoso del formulario', async () => {
    mockRegister.mockResolvedValueOnce({});
    
    const { result } = renderHook(() => useRegisterForm(mockOnSuccess));

    const mockEvent = { preventDefault: jest.fn() } as any;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockRegister).toHaveBeenCalledWith({
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan@test.com',
      password: 'Password123!',
      role: 'student',
    });
    expect(mockOnSuccess).toHaveBeenCalled();
    expect(result.current.errorMessage).toBe('');
  });

  it('debe mostrar error cuando faltan campos requeridos', async () => {
    mockValidateRegisterForm.mockReturnValue({
      isValid: false,
      errors: { firstName: 'required' }
    });
    mockUseFormHook.mockReturnValue({
      formData: {
        firstName: '',
        lastName: 'Pérez',
        email: 'juan@test.com',
        password: 'Password123!',
        role: 'student',
      },
      formErrors: { firstName: 'required' },
      handleInputChange: jest.fn(),
    });

    const { result } = renderHook(() => useRegisterForm());

    const mockEvent = { preventDefault: jest.fn() } as any;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.errorMessage).toBe('Debes rellenar todos los campos.');
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('debe mostrar primer error de validación específico', async () => {
    mockValidateRegisterForm.mockReturnValue({
      isValid: false,
      errors: { 
        firstName: '',
        lastName: '',
        email: 'Email inválido',
        password: '',
        role: '',
      }
    });
    mockUseFormHook.mockReturnValue({
      formData: {
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'email-invalido',
        password: 'Password123!',
        role: 'student',
      },
      formErrors: { email: 'Email inválido' },
      handleInputChange: jest.fn(),
    });

    const { result } = renderHook(() => useRegisterForm());

    const mockEvent = { preventDefault: jest.fn() } as any;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.errorMessage).toBe('Email inválido');
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('debe manejar error de email ya existente', async () => {
    mockRegister.mockRejectedValueOnce({ 
      msg: 'Email already exists in database' 
    });

    const { result } = renderHook(() => useRegisterForm());

    const mockEvent = { preventDefault: jest.fn() } as any;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.errorMessage).toBe('Ya existe un usuario registrado con ese correo.');
  });

  it('debe manejar error genérico de registro', async () => {
    mockRegister.mockRejectedValueOnce({ 
      msg: 'Server error occurred' 
    });

    const { result } = renderHook(() => useRegisterForm());

    const mockEvent = { preventDefault: jest.fn() } as any;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.errorMessage).toBe('Server error occurred');
  });

  it('debe manejar error sin mensaje específico', async () => {
    mockRegister.mockRejectedValueOnce({});

    const { result } = renderHook(() => useRegisterForm());

    const mockEvent = { preventDefault: jest.fn() } as any;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.errorMessage).toBe('Error al registrarse.');
  });

  it('debe limpiar error al enviar formulario exitoso', async () => {
    const { result } = renderHook(() => useRegisterForm());

    // Primero simular error
    mockRegister.mockRejectedValueOnce({ msg: 'Test error' });
    const mockEvent = { preventDefault: jest.fn() } as any;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.errorMessage).toBe('Test error');

    // Luego simular éxito
    mockRegister.mockResolvedValueOnce({});

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.errorMessage).toBe('');
  });

  it('debe exponer función clearToast', () => {
    const { result } = renderHook(() => useRegisterForm());

    // Verificar que la función existe
    expect(typeof result.current.clearToast).toBe('function');
    
    // La función debe ser llamable sin errores
    act(() => {
      result.current.clearToast();
    });
  });

  it('debe exponer handleInputChange del useFormHook', () => {
    const mockHandleInputChange = jest.fn();
    mockUseFormHook.mockReturnValue({
      formData: {
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@test.com',
        password: 'Password123!',
        role: 'student',
      },
      formErrors: {},
      handleInputChange: mockHandleInputChange,
    });

    const { result } = renderHook(() => useRegisterForm());

    expect(result.current.handleInputChange).toBe(mockHandleInputChange);
  });
}); 