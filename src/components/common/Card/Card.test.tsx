import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
  it('debe renderizar correctamente con children', () => {
    render(
      <Card>
        <h1>Título de prueba</h1>
        <p>Contenido de prueba</p>
      </Card>
    );

    expect(screen.getByText('Título de prueba')).toBeInTheDocument();
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
  });

  it('debe aplicar las clases base por defecto', () => {
    render(<Card data-testid="test-card">Contenido</Card>);
    
    const card = screen.getByTestId('test-card');
    // Verificar que es un div con clases aplicadas
    expect(card.tagName.toLowerCase()).toBe('div');
    expect(card.className.length).toBeGreaterThan(0);
  });

  it('debe aplicar clases personalizadas', () => {
    render(<Card className="custom-class" data-testid="custom-card">Contenido</Card>);
    
    const card = screen.getByTestId('custom-card');
    expect(card.className).toContain('custom-class');
  });

  it('debe pasar props adicionales al elemento div', () => {
    render(
      <Card data-testid="custom-card" role="region">
        Contenido
      </Card>
    );
    
    const card = screen.getByTestId('custom-card');
    expect(card).toHaveAttribute('role', 'region');
  });

  it('debe tener efectos de hover en las clases', () => {
    render(<Card data-testid="hover-card">Contenido</Card>);
    
    const card = screen.getByTestId('hover-card');
    // Verificar que tiene clases de transición y hover
    expect(card.className).toMatch(/hover|transition/);
  });

  it('debe combinar clases correctamente cuando se pasan className', () => {
    const { container } = render(
      <Card className="additional-class">Contenido</Card>
    );
    
    const card = container.firstChild as HTMLElement;
    const classes = card.className;
    
    // Debe contener tanto las clases base como las adicionales
    expect(classes).toContain('rounded-lg');
    expect(classes).toContain('additional-class');
  });
}); 