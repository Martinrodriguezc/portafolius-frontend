import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge Component', () => {
  it('debe renderizar correctamente con texto', () => {
    render(<Badge>Test Badge</Badge>);
    
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('debe aplicar variante default por defecto', () => {
    render(<Badge>Default Badge</Badge>);
    
    const badge = screen.getByText('Default Badge');
    expect(badge).toHaveClass('bg-blue-100', 'text-blue-700');
  });

  it('debe aplicar variante secondary correctamente', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    
    const badge = screen.getByText('Secondary Badge');
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-800');
  });

  it('debe aplicar variante destructive correctamente', () => {
    render(<Badge variant="destructive">Destructive Badge</Badge>);
    
    const badge = screen.getByText('Destructive Badge');
    expect(badge).toHaveClass('bg-red-100', 'text-red-700');
  });

  it('debe aplicar variante outline correctamente', () => {
    render(<Badge variant="outline">Outline Badge</Badge>);
    
    const badge = screen.getByText('Outline Badge');
    expect(badge).toHaveClass('border', 'border-gray-300', 'text-gray-700');
  });

  it('debe aplicar clases base correctamente', () => {
    render(<Badge>Base Classes</Badge>);
    
    const badge = screen.getByText('Base Classes');
    expect(badge).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-md',
      'border',
      'px-2',
      'py-1',
      'text-xs',
      'font-medium'
    );
  });

  it('debe aplicar clases adicionales', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    
    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('custom-class');
  });

  it('debe renderizar como span por defecto', () => {
    render(<Badge>Span Badge</Badge>);
    
    const badge = screen.getByText('Span Badge');
    expect(badge.tagName.toLowerCase()).toBe('span');
  });

  it('debe usar Slot cuando asChild es true', () => {
    render(
      <Badge asChild>
        <button>Button Badge</button>
      </Badge>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Button Badge');
  });

  it('debe tener data-slot="badge"', () => {
    render(<Badge>Data Slot Badge</Badge>);
    
    const badge = screen.getByText('Data Slot Badge');
    expect(badge).toHaveAttribute('data-slot', 'badge');
  });

  it('debe pasar props adicionales', () => {
    render(
      <Badge data-testid="test-badge" title="Test Title">
        Props Badge
      </Badge>
    );
    
    const badge = screen.getByTestId('test-badge');
    expect(badge).toHaveAttribute('title', 'Test Title');
  });

  it('debe tener clases de whitespace y overflow', () => {
    render(<Badge>Whitespace Badge</Badge>);
    
    const badge = screen.getByText('Whitespace Badge');
    expect(badge).toHaveClass('whitespace-nowrap', 'shrink-0', 'gap-1', 'overflow-hidden');
  });

  it('debe manejar contenido vacío', () => {
    render(<Badge data-testid="empty-badge"></Badge>);
    
    const badge = screen.getByTestId('empty-badge');
    expect(badge).toBeInTheDocument();
    expect(badge.tagName.toLowerCase()).toBe('span');
  });
}); 