import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch Component', () => {
  it('debe renderizar correctamente', () => {
    render(<Switch />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('debe aplicar clases base correctamente', () => {
    render(<Switch />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('inline-flex', 'h-[1.15rem]', 'w-8');
    expect(switchElement).toHaveClass('shrink-0', 'items-center', 'rounded-full');
  });

  it('debe tener data-slot="switch"', () => {
    render(<Switch />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('data-slot', 'switch');
  });

  it('debe renderizar el thumb con data-slot correcto', () => {
    render(<Switch />);
    
    const switchElement = screen.getByRole('switch');
    const thumb = switchElement.querySelector('[data-slot="switch-thumb"]');
    
    expect(thumb).toBeInTheDocument();
    expect(thumb).toHaveClass('pointer-events-none', 'block', 'rounded-full');
  });

  it('debe estar desmarcado por defecto', () => {
    render(<Switch />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();
  });

  it('debe poder marcarse cuando se hace clic', async () => {
    const user = userEvent.setup();
    render(<Switch />);
    
    const switchElement = screen.getByRole('switch');
    
    await user.click(switchElement);
    expect(switchElement).toBeChecked();
  });

  it('debe llamar onCheckedChange cuando cambia', async () => {
    const user = userEvent.setup();
    const mockOnCheckedChange = jest.fn();
    
    render(<Switch onCheckedChange={mockOnCheckedChange} />);
    
    const switchElement = screen.getByRole('switch');
    
    await user.click(switchElement);
    expect(mockOnCheckedChange).toHaveBeenCalledWith(true);
  });

  it('debe respetar el estado inicial checked', () => {
    render(<Switch checked={true} />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeChecked();
  });

  it('debe estar deshabilitado cuando se pasa disabled', () => {
    render(<Switch disabled />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });

  it('debe aplicar clases personalizadas', () => {
    render(<Switch className="custom-switch" />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('custom-switch');
  });

  it('debe pasar props adicionales', () => {
    render(
      <Switch 
        data-testid="test-switch"
        aria-label="Test switch"
      />
    );
    
    const switchElement = screen.getByTestId('test-switch');
    expect(switchElement).toHaveAttribute('aria-label', 'Test switch');
  });

  it('debe tener estilos de transición', () => {
    render(<Switch />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('transition-all');
    
    const thumb = switchElement.querySelector('[data-slot="switch-thumb"]');
    expect(thumb).toHaveClass('transition-transform');
  });

  it('debe manejar navegación por teclado', async () => {
    const user = userEvent.setup();
    const mockOnCheckedChange = jest.fn();
    
    render(<Switch onCheckedChange={mockOnCheckedChange} />);
    
    const switchElement = screen.getByRole('switch');
    
    // Focus en el switch
    switchElement.focus();
    expect(switchElement).toHaveFocus();
    
    // Presionar Enter para activar
    await user.keyboard('{Enter}');
    expect(mockOnCheckedChange).toHaveBeenCalledWith(true);
  });

  it('debe tener outline-none para focus personalizado', () => {
    render(<Switch />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('outline-none');
  });
}); 