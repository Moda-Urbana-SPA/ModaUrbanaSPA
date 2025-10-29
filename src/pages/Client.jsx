import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, Table, Button, Badge } from 'react-bootstrap';

export default function Client() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromState = location.state?.orderNumber || null;

  const stored = localStorage.getItem('lastOrder');
  const order = stored ? JSON.parse(stored) : null;

  if (!order) {
    return (
      <main>
        <Container className="py-4">
          <Card body className="mb-3">
            <h4 className="mb-2">No hay orden reciente</h4>
            <p className="text-muted mb-3">Realiza una compra para ver el detalle aquí.</p>
            <Button className="badge-black" onClick={() => navigate('/productos')}>Ir al catálogo</Button>
          </Card>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container className="py-4">
        <h2 className="mb-1">¡Gracias por tu compra!</h2>
        <p className="text-muted">
          Orden <Badge bg="dark">{order.orderNumber}</Badge>
          {fromState ? ` (confirmada)` : ''}
        </p>

        <Card className="mb-3">
          <Card.Body>
            <h5 className="mb-3">Datos del cliente</h5>
            <div><strong>Nombre:</strong> {order.customer.name}</div>
            <div><strong>Correo:</strong> {order.customer.email}</div>
            <div><strong>Teléfono:</strong> {order.customer.phone}</div>
            <div><strong>Dirección:</strong> {order.customer.address}, {order.customer.comuna}</div>
            <div><strong>Método de pago:</strong> {order.customer.payment}</div>
            {order.customer.notes && <div><strong>Notas:</strong> {order.customer.notes}</div>}
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Body>
            <h5 className="mb-3">Detalle de la compra</h5>
            <Table size="sm" bordered responsive>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cant.</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((it) => (
                  <tr key={it.skuKey || it.id}>
                    <td>
                      <div className="fw-semibold">{it.name}</div>
                      {(it.size || it.color) && (
                        <small className="text-muted">
                          {it.size ? `Talla: ${it.size}` : ''}
                          {it.size && it.color ? ' · ' : ''}
                          {it.color ? `Color: ${it.color}` : ''}
                        </small>
                      )}
                    </td>
                    <td className="text-center">{it.quantity}</td>
                    <td>${(it.price * it.quantity).toLocaleString('es-CL')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h4>Total: ${order.total.toLocaleString('es-CL')}</h4>
          </Card.Body>
        </Card>

        <div className="d-flex gap-2">
          <Button className="badge-black" onClick={() => navigate('/productos')}>Seguir comprando</Button>
        </div>
      </Container>
    </main>
  );
}
