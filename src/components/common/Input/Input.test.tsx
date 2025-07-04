import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Input from "./Input"

describe("Input Component", () => {
  it("debe renderizar correctamente con label", () => {
    render(<Input id="test-input" label="Correo electrónico" />)

    const label = screen.getByText(/correo electrónico/i)
    const input = screen.getByRole("textbox")

    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })

  it("debe mostrar asterisco cuando es requerido", () => {
    render(<Input id="test-input" label="Campo requerido" required />)

    const asterisk = screen.getByText("*")
    expect(asterisk).toBeInTheDocument()
    expect(asterisk).toHaveClass("text-red-500")
  })

  it("debe aplicar placeholder por defecto para tipo email", () => {
    render(<Input id="test-input" type="email" />)

    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("placeholder", "correo@ejemplo.com")
  })

  it("debe usar placeholder personalizado cuando se proporciona", () => {
    render(<Input id="test-input" type="email" placeholder="Tu email aquí" />)

    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("placeholder", "Tu email aquí")
  })

  it("debe mostrar mensaje de error cuando hay error", () => {
    render(<Input id="test-input" error="Este campo es obligatorio" />)

    const errorMessage = screen.getByText(/este campo es obligatorio/i)
    const input = screen.getByRole("textbox")

    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass("text-red-500")
    expect(input).toHaveClass("border-red-500")
  })

  it("debe mostrar requerimientos de contraseña cuando es necesario", () => {
    render(
      <Input
        id="password-input"
        type="password"
        showPasswordRequirements
      />
    )

    expect(screen.getByText(/la contraseña debe tener:/i)).toBeInTheDocument()
    expect(screen.getByText(/mínimo 8 caracteres/i)).toBeInTheDocument()
    expect(screen.getByText(/al menos un número/i)).toBeInTheDocument()
    expect(screen.getByText(/al menos una letra mayúscula/i)).toBeInTheDocument()
    expect(screen.getByText(/al menos un símbolo/i)).toBeInTheDocument()
  })

  it("debe manejar cambios de texto", async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()

    render(<Input id="test-input" onChange={handleChange} />)

    const input = screen.getByRole("textbox")
    await user.type(input, "texto de prueba")

    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue("texto de prueba")
  })

  it("debe manejar evento onFocus", () => {
    const handleFocus = jest.fn()
    render(<Input id="test-input" onFocus={handleFocus} />)

    const input = screen.getByRole("textbox")
    fireEvent.focus(input)

    expect(handleFocus).toHaveBeenCalledTimes(1)
  })

  it("debe aplicar clases CSS personalizadas", () => {
    render(<Input id="test-input" className="custom-class" />)

    const input = screen.getByRole("textbox")
    expect(input).toHaveClass("custom-class")
  })
})