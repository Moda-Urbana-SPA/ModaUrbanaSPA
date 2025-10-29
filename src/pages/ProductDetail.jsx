import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Alert, Badge } from 'react-bootstrap';
import { MODA_PRODUCTS } from '../data/moda.mock';
import { useCart } from '../context/AppContext';

const FALLBACK_SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const FALLBACK_COLORS = ['Negro', 'Blanco', 'Gris', 'Azul'];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = useMemo(
    () => MODA_PRODUCTS.find((p) => String(p.id) === String(id)) || null,
    [id]
  );

  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [error, setError] = useState('');

  const variants = product?.variants || null;

  const allSizes = useMemo(() => {
    if (!variants) return FALLBACK_SIZES;
    return Array.from(new Set(variants.map(v => v.size)));
  }, [variants]);

  const allColors = useMemo(() => {
    if (!variants) return FALLBACK_COLORS;
    return Array.from(new Set(variants.map(v => v.color)));
  }, [variants]);

  const colorsForSize = useMemo(() => {
    if (!variants) return allColors.map(c => ({ value: c, enabled: true }));
    if (!size)     return allColors.map(c => ({ value: c, enabled: true }));
    const set = new Set(variants.filter(v => v.size === size).map(v => v.color));
    return allColors.map(c => ({ value: c, enabled: set.has(c) }));
  }, [variants, allColors, size]);

  const sizesForColor = useMemo(() => {
    if (!variants) return allSizes.map(s => ({ value: s, enabled: true }));
    if (!color)     return allSizes.map(s => ({ value: s, enabled: true }));
    const set = new Set(variants.filter(v => v.color === color).map(v => v.size));
    return allSizes.map(s => ({ value: s, enabled: set.has(s) }));
  }, [variants, allSizes, color]);

  const selectedVariant = useMemo(() => {
    if (!variants || !size || !color) return null;
    return variants.find(v => v.size === size && v.color === color) || null;
  }, [variants, size, color]);

  if (!product) {
    return (
      <main>
        <Container className="py-4">
          <Alert variant="warning">Producto no encontrado (id: {String(id)}).</Alert>
          <Button variant="secondary" onClick={() => navigate('/productos')}>
            Volver al catálogo
          </Button>
        </Container>
      </main>
    );
  }

  const handleAdd = () => {
    if (!size || !color) {
      setError('Elige talla y color antes de continuar.');
      return;
    }
    if (selectedVariant && selectedVariant.stock <= 0) {
      setError('Sin stock para esta combinación.');
      return;
    }
    setError('');
    addToCart({ ...product, size, color });
    navigate('/carrito');
  };

  const stockText = selectedVariant
    ? (selectedVariant.stock > 0 ? `Stock: ${selectedVariant.stock}` : 'Sin stock')
    : '';

  return (
    <main>
      <Container className="py-4">
        <Row className="g-4">
          <Col md={6}>
            <Card>
              {product.imageUrl ? (
                <Card.Img src={product.imageUrl} alt={product.name} />
              ) : (
                <div className="d-flex align-items-center justify-content-center" style={{height: 320}}>
                  <span className="text-muted">Sin imagen</span>
                </div>
              )}
            </Card>
          </Col>

          <Col md={6}>
            <h2 className="mb-1">{product.name}</h2>
            <p className="text-muted mb-3">{product.category}</p>
            <h4 className="mb-3">${Number(product.price).toLocaleString('es-CL')}</h4>

            {variants && size && color && (
              <div className="mb-2">
                <Badge bg={selectedVariant?.stock > 0 ? 'success' : 'secondary'}>
                  {stockText}
                </Badge>
              </div>
            )}

            {error && <Alert variant="danger" className="py-2">{error}</Alert>}

            <Form className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Talla</Form.Label>
                <Form.Select
                  value={size}
                  onChange={(e) => {
                    const s = e.target.value;
                    setSize(s);
                    if (variants && color) {
                      const ok = variants.some(v => v.size === s && v.color === color);
                      if (!ok) setColor('');
                    }
                  }}
                >
                  <option value="">Selecciona una talla</option>
                  {sizesForColor.map(({ value, enabled }) => (
                    <option key={value} value={value} disabled={!enabled}>
                      {value}{!enabled ? ' (no disponible)' : ''}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Select
                  value={color}
                  onChange={(e) => {
                    const c = e.target.value;
                    setColor(c);
                    if (variants && size) {
                      const ok = variants.some(v => v.color === c && v.size === size);
                      if (!ok) setSize('');
                    }
                  }}
                >
                  <option value="">Selecciona un color</option>
                  {colorsForSize.map(({ value, enabled }) => (
                    <option key={value} value={value} disabled={!enabled}>
                      {value}{!enabled ? ' (no disponible)' : ''}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>

            <div className="d-flex gap-2">
              <Button
                className="badge-black mt-auto"
                onClick={handleAdd}
                disabled={variants ? !(size && color && selectedVariant && selectedVariant.stock > 0) : !(size && color)}
              >
                Agregar al carrito
              </Button>
              <Button className="badge-grey mt-auto" onClick={() => navigate('/productos')}>
                Seguir viendo
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
