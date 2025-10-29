import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AppProvider from '../context/AppContext';
import Order from './Order';

const renderWithProviders = (ui) =>
  render(
    <MemoryRouter initialEntries={['/order']}>
      <AppProvider>{ui}</AppProvider>
    </MemoryRouter>
  );

describe('Order Component', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('el componente Order se monta correctamente', () => {
    // Carrito vacío por defecto 
    renderWithProviders(<Order />);

    // Título principal
    const titulo = screen.getByRole('heading', { name: /finalizar compra/i });
    expect(titulo).toBeInTheDocument();

    // Campos del formulario principales
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dirección/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comuna/i)).toBeInTheDocument();

    // Botón de confirmación
    expect(screen.getByRole('button', { name: /confirmar pedido/i })).toBeInTheDocument();
  });

  test('muestra errores cuando el formulario se envía vacío', async () => {
    renderWithProviders(<Order />);

    // Click en "Confirmar pedido" sin rellenar nada
    const boton = screen.getByRole('button', { name: /confirmar pedido/i });
    await userEvent.click(boton);

    // Se muestran los mensajes de error (según validaciones del componente)
    expect(await screen.findByText(/El nombre es obligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/Correo inválido/i)).toBeInTheDocument();
    expect(screen.getByText(/El teléfono es obligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/La dirección es obligatoria/i)).toBeInTheDocument();
    expect(screen.getByText(/La comuna es obligatoria/i)).toBeInTheDocument();
  });

  test('envío válido procesa el pedido correctamente', async () => {
    //  Pre-carga el carrito en localStorage para que AppProvider lo levante
    window.localStorage.setItem(
      'cartItems',
      JSON.stringify([
        { id: 1, name: 'Polerón Negro', price: 15000, quantity: 2 },
        { id: 2, name: 'Pantalón Beige', price: 18000, quantity: 1 },
      ])
    );

    renderWithProviders(<Order />);

    // Completar formulario con datos válidos
    await userEvent.type(screen.getByLabelText(/nombre completo/i), 'Ada Lovelace');
    await userEvent.type(screen.getByLabelText(/correo/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/teléfono/i), '123456789');
    await userEvent.type(screen.getByLabelText(/dirección/i), 'Av. Alameda 123');
    await userEvent.type(screen.getByLabelText(/comuna/i), 'Santiago');

    // Confirmar pedido
    const boton = screen.getByRole('button', { name: /confirmar pedido/i });
    await userEvent.click(boton);

    // Espera a que desaparezcan errores (validación exitosa)
    await waitFor(() => {
      expect(screen.queryByText(/El nombre es obligatorio/i)).toBeNull();
    });
  });
});
