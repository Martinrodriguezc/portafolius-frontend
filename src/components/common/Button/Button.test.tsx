import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('debe renderizar correctamente con texto', () => {
    render(<Button>Texto del botón</Button>);
    
    const button = screen.getByRole('button', { name: /texto del botón/i });
    expect(button).toBeInTheDocument();
  });

  it('debe aplicar la variante primary por defecto', () => {
    render(<Button>Botón</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[#4E81BD]'); // Clase de variante primary
  });

  it('debe aplicar la variante google correctamente', () => {
    render(<Button variant="google">Iniciar con Google</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border', 'border-[#A0A0A0]'); // Clase de variante google
  });

  it('debe manejar el evento onClick', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('debe aplicar ancho completo cuando fixedWidth es false', () => {
    render(<Button fixedWidth={false}>Full Width</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });

  it('debe aplicar ancho fijo por defecto', () => {
    render(<Button>Fixed Width</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-40', 'sm:w-64');
  });

  it('debe estar deshabilitado cuando se pasa la prop disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
}); 