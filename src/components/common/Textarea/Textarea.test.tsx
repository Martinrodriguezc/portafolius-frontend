import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './Textarea';

describe('Textarea Component', () => {
  it('debe renderizar correctamente', () => {
    render(<Textarea />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });

  it('debe aplicar clases base correctamente', () => {
    render(<Textarea />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass(
      'min-h-16',
      'w-full',
      'rounded-md',
      'border',
      'bg-transparent',
      'px-3',
      'py-2'
    );
  });

  it('debe tener data-slot="textarea"', () => {
    render(<Textarea />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('data-slot', 'textarea');
  });

  it('debe aplicar clases personalizadas', () => {
    render(<Textarea className="custom-textarea" />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-textarea');
  });

  it('debe manejar cambios de texto', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    render(<Textarea onChange={mockOnChange} />);
    
    const textarea = screen.getByRole('textbox');
    
    await user.type(textarea, 'Texto de prueba');
    
    expect(mockOnChange).toHaveBeenCalled();
    expect(textarea).toHaveValue('Texto de prueba');
  });

  it('debe respetar el valor inicial', () => {
    render(<Textarea defaultValue="Valor inicial" />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveDisplayValue('Valor inicial');
  });

  it('debe manejar placeholder', () => {
    render(<Textarea placeholder="Escribe aquí..." />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', 'Escribe aquí...');
  });

  it('debe estar deshabilitado cuando se pasa disabled', () => {
    render(<Textarea disabled />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('debe tener clases de estado disabled', () => {
    render(<Textarea disabled />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
  });

  it('debe pasar props adicionales', () => {
    render(
      <Textarea 
        data-testid="test-textarea"
        rows={5}
        cols={30}
        maxLength={100}
      />
    );
    
    const textarea = screen.getByTestId('test-textarea');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('cols', '30');
    expect(textarea).toHaveAttribute('maxLength', '100');
  });

  it('debe manejar eventos de focus y blur', () => {
    const mockOnFocus = jest.fn();
    const mockOnBlur = jest.fn();
    
    render(<Textarea onFocus={mockOnFocus} onBlur={mockOnBlur} />);
    
    const textarea = screen.getByRole('textbox');
    
    fireEvent.focus(textarea);
    expect(mockOnFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(textarea);
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it('debe tener clases de transición', () => {
    render(<Textarea />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('transition-[color,box-shadow]');
  });

  it('debe tener outline-none para focus personalizado', () => {
    render(<Textarea />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('outline-none');
  });

  it('debe tener clases de shadow y border', () => {
    render(<Textarea />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('shadow-xs', 'border');
  });

  it('debe soportar redimensionamiento automático', () => {
    render(<Textarea />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('field-sizing-content');
  });

  it('debe manejar contenido multilínea', async () => {
    const user = userEvent.setup();
    render(<Textarea />);
    
    const textarea = screen.getByRole('textbox');
    
    const multilineText = 'Línea 1\nLínea 2\nLínea 3';
    await user.type(textarea, multilineText);
    
    expect(textarea).toHaveValue(multilineText);
  });
}); 