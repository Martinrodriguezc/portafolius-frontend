import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label Component', () => {
  it('debe renderizar correctamente con texto', () => {
    render(<Label>Test Label</Label>);
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('debe aplicar clases base correctamente', () => {
    render(<Label>Base Classes</Label>);
    
    const label = screen.getByText('Base Classes');
    expect(label).toHaveClass(
      'flex',
      'items-center',
      'gap-2',
      'text-sm',
      'leading-none',
      'font-medium',
      'select-none'
    );
  });

  it('debe tener data-slot="label"', () => {
    render(<Label>Data Slot</Label>);
    
    const label = screen.getByText('Data Slot');
    expect(label).toHaveAttribute('data-slot', 'label');
  });

  it('debe aplicar clases personalizadas', () => {
    render(<Label className="custom-label">Custom Label</Label>);
    
    const label = screen.getByText('Custom Label');
    expect(label).toHaveClass('custom-label');
  });

  it('debe pasar props adicionales', () => {
    render(
      <Label data-testid="test-label" title="Test Title">
        Props Label
      </Label>
    );
    
    const label = screen.getByTestId('test-label');
    expect(label).toHaveAttribute('title', 'Test Title');
  });

  it('debe tener clases de estado disabled', () => {
    render(<Label>Disabled Classes</Label>);
    
    const label = screen.getByText('Disabled Classes');
    expect(label).toHaveClass(
      'group-data-[disabled=true]:pointer-events-none',
      'group-data-[disabled=true]:opacity-50',
      'peer-disabled:cursor-not-allowed',
      'peer-disabled:opacity-50'
    );
  });

  it('debe manejar contenido complejo', () => {
    render(
      <Label>
        <span>Icon</span>
        Text Content
      </Label>
    );
    
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Text Content')).toBeInTheDocument();
  });

  it('debe ser accesible para lectores de pantalla', () => {
    render(<Label>Accessible Label</Label>);
    
    const label = screen.getByText('Accessible Label');
    expect(label.tagName.toLowerCase()).toBe('label');
    expect(label).toHaveAttribute('data-slot', 'label');
  });

  it('debe manejar clases combinadas correctamente', () => {
    const { container } = render(
      <Label className="extra-class">Combined Classes</Label>
    );
    
    const label = container.firstChild as HTMLElement;
    const classes = label.className;
    
    expect(classes).toContain('flex');
    expect(classes).toContain('extra-class');
  });

  it('debe manejar contenido vacío', () => {
    render(<Label></Label>);
    
    const label = screen.getByRole('generic'); // label sin contenido específico
    expect(label).toBeInTheDocument();
  });

  it('debe aplicar estilos de gaps para elementos flex', () => {
    render(<Label>Gap Test</Label>);
    
    const label = screen.getByText('Gap Test');
    expect(label).toHaveClass('gap-2');
  });
}); 