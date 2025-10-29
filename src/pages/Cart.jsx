import { useState } from 'react';
import { Container, Button, Table, Form } from 'react-bootstrap';
import { useCart } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import './Page.css';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const navigate = useNavigate();

  const [draftQty, setDraftQty] = useState({});
  const getDisplayQty = (item) => draftQty[item.skuKey || item.id] ?? String(item.quantity);
  const MAX_QTY = 999;

  const commitQty = (idOrSku, raw) => {
    const cleaned = String(raw).replace(/[^\d]/g, '');
    if (cleaned === '') {
      updateQuantity(idOrSku, 1);
      setDraftQty((s) => ({ ...s, [idOrSku]: '1' }));
      return;
    }
    const num = Math.min(parseInt(cleaned, 10) || 1, MAX_QTY);
    updateQuantity(idOrSku, num);
    setDraftQty((s) => ({ ...s, [idOrSku]: String(num) }));
  };

  const handleChange = (idOrSku, value) => {
    if (/^\d*$/.test(value)) setDraftQty((s) => ({ ...s, [idOrSku]: value }));
  };
  const handleBlur = (idOrSku, value) => commitQty(idOrSku, value);
  const handleKeyDown = (idOrSku, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commitQty(idOrSku, e.currentTarget.value);
      e.currentTarget.blur();
    }
  };
  const preventWheel = (e) => e.currentTarget.blur();

  return (
    <main>
      <Container>
        <h2>Carrito de Compras</h2>

        {cartItems.length === 0 ? (
          <p className="text-muted">Tu carrito está vacío.</p>
        ) : (
          <>
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th style={{ width: 130 }}>Cantidad</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.skuKey || item.id}>
                    <td>
                      <div className="fw-semibold">{item.name}</div>
                      {(item.size || item.color) && (
                        <small className="text-muted">
                          {item.size ? `Talla: ${item.size}` : ''}
                          {item.size && item.color ? ' · ' : ''}
                          {item.color ? `Color: ${item.color}` : ''}
                        </small>
                      )}
                    </td>
                    <td>${item.price.toLocaleString('es-CL')}</td>
                    <td>
                      <Form.Control
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        value={getDisplayQty(item)}
                        onChange={(e) => handleChange(item.skuKey || item.id, e.target.value)}
                        onBlur={(e) => handleBlur(item.skuKey || item.id, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(item.skuKey || item.id, e)}
                        onWheel={preventWheel}
                        style={{ textAlign: 'center' }}
                        aria-label="Cantidad"
                      />
                    </td>
                    <td>${(item.price * item.quantity).toLocaleString('es-CL')}</td>
                    <td>
                      <Button
                        size="sm"
                        className="badge-black"
                        onClick={() => removeFromCart(item.skuKey || item.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h4>Total: ${total.toLocaleString('es-CL')}</h4>
            <Button className="badge-black" onClick={clearCart}>
              Vaciar carrito
            </Button>
            <Button className="badge-grey mt-auto" onClick={() => navigate('/order')}>
              Realizar Pedido
            </Button>
            <Button className="badge-black" onClick={() => navigate('/productos')}>
              Seguir Comprando
            </Button>
          </>
        )}
      </Container>
    </main>
  );
}
