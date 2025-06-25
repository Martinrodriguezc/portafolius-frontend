import { render, screen, waitFor } from '@testing-library/react';
import Toast from './Toast';

// Mock de timers
jest.useFakeTimers();

describe('Toast Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  it('debe renderizar correctamente con mensaje', () => {
    render(<Toast message="Mensaje de prueba" onClose={mockOnClose} />);
    
    expect(screen.getByText('Mensaje de prueba')).toBeInTheDocument();
  });

  it('debe aplicar tipo error por defecto', () => {
    render(<Toast message="Error message" onClose={mockOnClose} />);
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-red-100', 'border-red-400', 'text-red-700');
  });

  it('debe aplicar tipo success correctamente', () => {
    render(<Toast message="Success message" type="success" onClose={mockOnClose} />);
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-green-100', 'border-green-400', 'text-green-700');
  });

  it('debe aplicar tipo warning correctamente', () => {
    render(<Toast message="Warning message" type="warning" onClose={mockOnClose} />);
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-yellow-100', 'border-yellow-400', 'text-yellow-700');
  });

  it('debe tener clases de posicionamiento correctas', () => {
    render(<Toast message="Test message" onClose={mockOnClose} />);
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('fixed', 'top-4', 'left-1/2', 'transform', '-translate-x-1/2');
    expect(toast).toHaveClass('z-50');
  });

  it('debe llamar onClose después de 5 segundos', async () => {
    render(<Toast message="Test message" onClose={mockOnClose} />);
    
    // No debe haberse llamado aún
    expect(mockOnClose).not.toHaveBeenCalled();
    
    // Avanzar el tiempo 5 segundos
    jest.advanceTimersByTime(5000);
    
    // Ahora debe haberse llamado
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('debe limpiar el timer al desmontarse', () => {
    const { unmount } = render(<Toast message="Test message" onClose={mockOnClose} />);
    
    // Desmontar antes de que termine el timer
    unmount();
    
    // Avanzar el tiempo
    jest.advanceTimersByTime(5000);
    
    // No debe llamarse onClose porque se limpió el timer
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('debe tener el atributo role="alert" para accesibilidad', () => {
    render(<Toast message="Test message" onClose={mockOnClose} />);
    
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  it('debe mostrar el mensaje en un span con clases responsive', () => {
    render(<Toast message="Mensaje responsivo" onClose={mockOnClose} />);
    
    const messageSpan = screen.getByText('Mensaje responsivo');
    expect(messageSpan).toHaveClass('block', 'sm:inline');
  });
}); 