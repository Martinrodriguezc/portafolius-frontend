import { renderHook, act } from '@testing-library/react';
import { useCurrentUser } from './useCurrentUser';

// Mock de authService
const mockGetCurrentUser = jest.fn();
jest.mock('../auth/authServices', () => ({
  authService: {
    getCurrentUser: mockGetCurrentUser,
  },
}));

describe('useCurrentUser Hook', () => {
  const mockUser = {
    id: '1',
    first_name: 'Juan',
    last_name: 'Pérez',
    email: 'juan@test.com',
    role: 'STUDENT',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Limpiar todos los event listeners
    window.removeEventListener = jest.fn();
    window.addEventListener = jest.fn();
  });

  it('debe inicializar con el usuario actual del authService', () => {
    mockGetCurrentUser.mockReturnValue(mockUser);
    
    const { result } = renderHook(() => useCurrentUser());
    
    expect(result.current).toEqual(mockUser);
    expect(mockGetCurrentUser).toHaveBeenCalledTimes(1);
  });

  it('debe inicializar con null cuando no hay usuario', () => {
    mockGetCurrentUser.mockReturnValue(null);
    
    const { result } = renderHook(() => useCurrentUser());
    
    expect(result.current).toBeNull();
  });

  it('debe agregar event listener para userUpdated al montar', () => {
    mockGetCurrentUser.mockReturnValue(mockUser);
    
    renderHook(() => useCurrentUser());
    
    expect(window.addEventListener).toHaveBeenCalledWith(
      'userUpdated',
      expect.any(Function)
    );
  });

  it('debe remover event listener al desmontar', () => {
    mockGetCurrentUser.mockReturnValue(mockUser);
    
    const { unmount } = renderHook(() => useCurrentUser());
    
    unmount();
    
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'userUpdated',
      expect.any(Function)
    );
  });

  it('debe actualizar usuario cuando se dispara evento userUpdated con detail', () => {
    mockGetCurrentUser.mockReturnValue(null);
    
    const { result } = renderHook(() => useCurrentUser());
    
    expect(result.current).toBeNull();
    
    // Simular evento personalizado con detail
    const updatedUser = {
      id: '2',
      first_name: 'María',
      last_name: 'García',
      email: 'maria@test.com',
      role: 'TEACHER',
    };
    
    // Obtener el handler del addEventListener
    const addEventListenerCalls = (window.addEventListener as jest.Mock).mock.calls;
    const userUpdatedHandler = addEventListenerCalls.find(
      call => call[0] === 'userUpdated'
    )?.[1];
    
    expect(userUpdatedHandler).toBeDefined();
    
    // Simular el evento
    act(() => {
      const mockEvent = {
        detail: updatedUser,
      } as CustomEvent;
      
      userUpdatedHandler(mockEvent);
    });
    
    expect(result.current).toEqual(updatedUser);
  });

  it('debe usar authService.getCurrentUser cuando el evento no tiene detail', () => {
    mockGetCurrentUser.mockReturnValue(mockUser);
    
    const { result } = renderHook(() => useCurrentUser());
    
    const updatedUser = {
      id: '3',
      first_name: 'Carlos',
      last_name: 'López',
      email: 'carlos@test.com',
      role: 'ADMIN',
    };
    
    // Cambiar lo que retorna getCurrentUser para el siguiente uso
    mockGetCurrentUser.mockReturnValue(updatedUser);
    
    // Obtener el handler del addEventListener
    const addEventListenerCalls = (window.addEventListener as jest.Mock).mock.calls;
    const userUpdatedHandler = addEventListenerCalls.find(
      call => call[0] === 'userUpdated'
    )?.[1];
    
    // Simular evento sin detail
    act(() => {
      const mockEvent = {
        detail: null,
      } as CustomEvent;
      
      userUpdatedHandler(mockEvent);
    });
    
    expect(result.current).toEqual(updatedUser);
    expect(mockGetCurrentUser).toHaveBeenCalledTimes(2); // Una inicial, una en el handler
  });

  it('debe manejar evento userUpdated con detail undefined', () => {
    mockGetCurrentUser.mockReturnValue(mockUser);
    
    const { result } = renderHook(() => useCurrentUser());
    
    const fallbackUser = {
      id: '4',
      first_name: 'Ana',
      last_name: 'Martínez',
      email: 'ana@test.com',
      role: 'STUDENT',
    };
    
    // Cambiar lo que retorna getCurrentUser
    mockGetCurrentUser.mockReturnValue(fallbackUser);
    
    // Obtener el handler
    const addEventListenerCalls = (window.addEventListener as jest.Mock).mock.calls;
    const userUpdatedHandler = addEventListenerCalls.find(
      call => call[0] === 'userUpdated'
    )?.[1];
    
    // Simular evento con detail undefined
    act(() => {
      const mockEvent = {
        detail: undefined,
      } as CustomEvent;
      
      userUpdatedHandler(mockEvent);
    });
    
    expect(result.current).toEqual(fallbackUser);
  });

  it('debe mantener la misma función handler durante el ciclo de vida', () => {
    mockGetCurrentUser.mockReturnValue(mockUser);
    
    const { rerender } = renderHook(() => useCurrentUser());
    
    // Obtener el primer handler
    const firstCalls = (window.addEventListener as jest.Mock).mock.calls;
    const firstHandler = firstCalls.find(call => call[0] === 'userUpdated')?.[1];
    
    // Limpiar mocks y re-renderizar
    jest.clearAllMocks();
    rerender();
    
    // El hook no debería agregar un nuevo listener en re-render
    expect(window.addEventListener).not.toHaveBeenCalled();
  });
}); 