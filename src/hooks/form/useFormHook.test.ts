import { renderHook, act } from '@testing-library/react';
import { useFormHook } from './useFormHook';

// Tipos de prueba
interface TestFormData {
  name: string;
  email: string;
  age: number;
}

interface TestFormErrors {
  name: string;
  email: string;
  age: string;
}

describe('useFormHook', () => {
  const initialState = {
    formData: {
      name: '',
      email: '',
      age: 0,
    } as TestFormData,
    formErrors: {
      name: '',
      email: '',
      age: '',
    } as TestFormErrors,
  };

  const mockValidateForm = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockValidateForm.mockReturnValue({
      isValid: true,
      errors: {
        name: '',
        email: '',
        age: '',
      },
    });
  });

  it('debe inicializar con el estado inicial', () => {
    const { result } = renderHook(() =>
      useFormHook(initialState, mockValidateForm, mockOnSuccess)
    );

    expect(result.current.formData).toEqual(initialState.formData);
    expect(result.current.formErrors).toEqual(initialState.formErrors);
  });

  it('debe manejar cambios en inputs de texto', () => {
    const { result } = renderHook(() =>
      useFormHook(initialState, mockValidateForm, mockOnSuccess)
    );

    const mockEvent = {
      target: {
        id: 'name',
        value: 'Juan Pérez',
      },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleInputChange(mockEvent);
    });

    expect(result.current.formData.name).toBe('Juan Pérez');
    expect(result.current.formData.email).toBe(''); // Otros campos sin cambios
  });

  it('debe manejar cambios en inputs de email', () => {
    const { result } = renderHook(() =>
      useFormHook(initialState, mockValidateForm, mockOnSuccess)
    );

    const mockEvent = {
      target: {
        id: 'email',
        value: 'juan@test.com',
      },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleInputChange(mockEvent);
    });

    expect(result.current.formData.email).toBe('juan@test.com');
  });

  it('debe manejar cambios en selects', () => {
    const { result } = renderHook(() =>
      useFormHook(initialState, mockValidateForm, mockOnSuccess)
    );

    const mockEvent = {
      target: {
        id: 'age',
        value: '25',
      },
    } as React.ChangeEvent<HTMLSelectElement>;

    act(() => {
      result.current.handleInputChange(mockEvent);
    });

    expect(result.current.formData.age).toBe('25');
  });

  it('debe actualizar múltiples campos', () => {
    const { result } = renderHook(() =>
      useFormHook(initialState, mockValidateForm, mockOnSuccess)
    );

    // Cambiar nombre
    act(() => {
      result.current.handleInputChange({
        target: { id: 'name', value: 'María' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // Cambiar email
    act(() => {
      result.current.handleInputChange({
        target: { id: 'email', value: 'maria@test.com' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.formData.name).toBe('María');
    expect(result.current.formData.email).toBe('maria@test.com');
  });

  it('debe manejar envío de formulario válido', () => {
    const { result } = renderHook(() =>
      useFormHook(initialState, mockValidateForm, mockOnSuccess)
    );

    const mockEvent = {
      preventDefault: jest.fn(),
    } as React.FormEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockValidateForm).toHaveBeenCalledWith(initialState.formData);
    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('debe manejar envío de formulario inválido', () => {
    mockValidateForm.mockReturnValue({
      isValid: false,
      errors: {
        name: 'Nombre es requerido',
        email: 'Email inválido',
        age: '',
      },
    });

    const { result } = renderHook(() =>
      useFormHook(initialState, mockValidateForm, mockOnSuccess)
    );

    const mockEvent = {
      preventDefault: jest.fn(),
    } as React.FormEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockValidateForm).toHaveBeenCalledWith(initialState.formData);
    expect(mockOnSuccess).not.toHaveBeenCalled();
    expect(result.current.formErrors.name).toBe('Nombre es requerido');
    expect(result.current.formErrors.email).toBe('Email inválido');
  });

  it('debe actualizar errores después de validación', () => {
    const { result } = renderHook(() =>
      useFormHook(initialState, mockValidateForm, mockOnSuccess)
    );

    const validationErrors = {
      name: 'Error de nombre',
      email: 'Error de email',
      age: 'Error de edad',
    };

    mockValidateForm.mockReturnValue({
      isValid: false,
      errors: validationErrors,
    });

    const mockEvent = {
      preventDefault: jest.fn(),
    } as React.FormEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(result.current.formErrors).toEqual(validationErrors);
  });

  it('debe funcionar sin callback onSuccess', () => {
    const { result } = renderHook(() =>
      useFormHook(initialState, mockValidateForm)
    );

    const mockEvent = {
      preventDefault: jest.fn(),
    } as React.FormEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockValidateForm).toHaveBeenCalled();
    // No debe fallar sin onSuccess
  });

  it('debe mantener el estado previo cuando se actualiza un campo', () => {
    const { result } = renderHook(() =>
      useFormHook(initialState, mockValidateForm, mockOnSuccess)
    );

    // Establecer algunos datos iniciales
    act(() => {
      result.current.handleInputChange({
        target: { id: 'name', value: 'Nombre inicial' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleInputChange({
        target: { id: 'email', value: 'email@inicial.com' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // Cambiar solo un campo
    act(() => {
      result.current.handleInputChange({
        target: { id: 'name', value: 'Nombre actualizado' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // Verificar que solo se actualizó el campo cambiado
    expect(result.current.formData.name).toBe('Nombre actualizado');
    expect(result.current.formData.email).toBe('email@inicial.com'); // Sin cambios
  });

  it('debe manejar validación con datos actualizados', () => {
    const { result } = renderHook(() =>
      useFormHook(initialState, mockValidateForm, mockOnSuccess)
    );

    // Actualizar datos
    act(() => {
      result.current.handleInputChange({
        target: { id: 'name', value: 'Test Name' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // Enviar formulario
    const mockEvent = { preventDefault: jest.fn() } as React.FormEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    // Verificar que la validación se llamó con los datos actualizados
    expect(mockValidateForm).toHaveBeenCalledWith({
      name: 'Test Name',
      email: '',
      age: 0,
    });
  });
}); 