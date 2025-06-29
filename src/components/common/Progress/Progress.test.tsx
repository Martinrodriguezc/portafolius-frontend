import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';

describe('Progress Component', () => {
  it('debe renderizar correctamente', () => {
    render(<Progress value={50} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });

  it('debe aplicar el valor correctamente', () => {
    render(<Progress value={75} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '75');
  });

  it('debe aplicar clases base correctamente', () => {
    render(<Progress value={50} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass(
      'relative',
      'h-2',
      'w-full',
      'overflow-hidden',
      'rounded-full'
    );
  });

  it('debe aplicar data-slot="progress"', () => {
    render(<Progress value={50} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('data-slot', 'progress');
  });

  it('debe renderizar el indicador con estilos correctos', () => {
    render(<Progress value={60} />);
    
    const progressBar = screen.getByRole('progressbar');
    const indicator = progressBar.querySelector('[data-slot="progress-indicator"]');
    
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveClass('bg-[#4E81BD]');
    expect(indicator).toHaveClass('transition-transform');
    expect(indicator).toHaveClass('duration-300');
  });

  it('debe aplicar transform correctamente basado en el valor', () => {
    render(<Progress value={25} />);
    
    const progressBar = screen.getByRole('progressbar');
    const indicator = progressBar.querySelector('[data-slot="progress-indicator"]');
    
    expect(indicator).toHaveStyle('transform: translateX(-75%)');
  });

  it('debe manejar valor 0 correctamente', () => {
    render(<Progress value={0} />);
    
    const progressBar = screen.getByRole('progressbar');
    const indicator = progressBar.querySelector('[data-slot="progress-indicator"]');
    
    expect(indicator).toHaveStyle('transform: translateX(-100%)');
  });

  it('debe manejar valor 100 correctamente', () => {
    render(<Progress value={100} />);
    
    const progressBar = screen.getByRole('progressbar');
    const indicator = progressBar.querySelector('[data-slot="progress-indicator"]');
    
    expect(indicator).toHaveStyle('transform: translateX(-0%)');
  });

  it('debe aplicar clases personalizadas', () => {
    render(<Progress value={50} className="custom-progress" />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('custom-progress');
  });

  it('debe pasar props adicionales', () => {
    render(
      <Progress 
        value={50} 
        data-testid="test-progress"
        aria-label="Test progress"
      />
    );
    
    const progressBar = screen.getByTestId('test-progress');
    expect(progressBar).toHaveAttribute('aria-label', 'Test progress');
  });

  it('debe tener clases de indicador para animación', () => {
    render(<Progress value={50} />);
    
    const progressBar = screen.getByRole('progressbar');
    const indicator = progressBar.querySelector('[data-slot="progress-indicator"]');
    
    expect(indicator).toHaveClass(
      'absolute',
      'inset-0',
      'transition-transform',
      'duration-300',
      'ease-in-out',
      'will-change-transform'
    );
  });

  it('debe manejar valores decimales', () => {
    render(<Progress value={33.33} />);
    
    const progressBar = screen.getByRole('progressbar');
    const indicator = progressBar.querySelector('[data-slot="progress-indicator"]');
    
    expect(indicator).toHaveStyle('transform: translateX(-66.67%)');
  });
}); 