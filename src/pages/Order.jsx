import { useState } from 'react';
import { Container, Row, Col, Table, Form, Button, Alert, Card } from 'react-bootstrap';
import { useCart } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Order() {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    comuna: '',
    payment: 'Transferencia',
    notes: '',
  });
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    const errs = [];
    if (!form.name.trim()) errs.push('El nombre es obligatorio');
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.push('Correo inválido');
    if (!form.phone.trim()) errs.push('El teléfono es obligatorio');
    if (!form.address.trim()) errs.push('La dirección es obligatoria');
    if (!form.comuna.trim()) errs.push('La comuna es obligatoria');
    if (cartItems.length === 0) errs.push('Tu carrito está vacío');
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (errs.length) return;

    setSubmitting(true);

    const orderNumber = `MU-${Date.now().toString().slice(-8)}`;
    const order = {
      orderNumber,
      createdAt: new Date().toISOString(),
      items: cartItems,
      total,
      customer: { ...form },
      status: 'RECIBIDA',
    };

    localStorage.setItem('lastOrder', JSON.stringify(order));
    clearCart();
    setSubmitting(false);
    navigate('/cliente', { state: { orderNumber } });
  };

  return (
    <main>
      <Container className="py-3">
        <h2>Finalizar compra</h2>

        {errors.length > 0 && (
          <Alert variant="danger" className="my-3">
            {errors.map((e, i) => <div key={i}>• {e}</div>)}
          </Alert>
        )}

        <Row className="g-3">
          <Col lg={7}>
            <Card className="h-100">
              <Card.Body>
                <h5 className="mb-3">Datos del cliente</h5>
                <Form onSubmit={handleSubmit} noValidate>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group controlId="name">
                        <Form.Label>Nombre completo</Form.Label>
                        <Form.Control name="name" value={form.name} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="email">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="phone">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control name="phone" value={form.phone} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="comuna">
                        <Form.Label>Comuna</Form.Label>
                        <Form.Control name="comuna" value={form.comuna} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group controlId="address">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control name="address" value={form.address} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="payment">
                        <Form.Label>Método de pago</Form.Label>
                        <Form.Select name="payment" value={form.payment} onChange={handleChange}>
                          <option>Transferencia</option>
                          <option>Webpay</option>
                          <option>Efectivo (Al momento de la entrega)</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group controlId="notes">
                        <Form.Label>Notas (opcional)</Form.Label>
                        <Form.Control as="textarea" rows={3} name="notes" value={form.notes} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex gap-2 mt-3">
                    <Button type="submit" className="badge-black" disabled={submitting}>
                      {submitting ? 'Procesando…' : 'Confirmar pedido'}
                    </Button>
                    <Button className="badge-grey" onClick={() => navigate('/carrito')} disabled={submitting}>
                      Volver al carrito
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5}>
            <Card>
              <Card.Body>
                <h5 className="mb-3">Resumen</h5>
                {cartItems.length === 0 ? (
                  <p className="text-muted">No hay productos en el carrito.</p>
                ) : (
                  <>
                    <Table size="sm" bordered responsive className="mb-3">
                      <thead>
                        <tr>
                          <th>Producto</th>
                          <th>Cantidad</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((it) => (
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
                    <h4 className="mb-0">Total: ${total.toLocaleString('es-CL')}</h4>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
