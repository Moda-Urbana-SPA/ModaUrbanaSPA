import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Products from './Products';

jest.mock('../context/AppContext', () => ({
  useCart: () => ({ addToCart: jest.fn() }),
}));

describe('Componente Products', () => {
  const renderWithRouter = (ui) =>
    render(<MemoryRouter initialEntries={['/productos']}>{ui}</MemoryRouter>);

  test('se monta correctamente y muestra el título', () => {
    renderWithRouter(<Products />);
    expect(screen.getByText(/Catálogo Moda Urbana/i)).toBeInTheDocument();
  });

  test('renderiza todas las tarjetas de producto', () => {
    renderWithRouter(<Products />);
    expect(screen.getAllByRole('button', { name: /ver detalles/i }).length).toBeGreaterThan(0);
  });

  test('el botón "Ver detalles" aparece', () => {
    renderWithRouter(<Products />);
    expect(screen.getAllByRole('button', { name: /ver detalles/i }).length).toBeGreaterThan(0);
  });

  test('renderiza productos (sanity check)', () => {
    renderWithRouter(<Products />);
    expect(screen.getByText(/Pantalones, polerones y más/i)).toBeInTheDocument();
  });
});
