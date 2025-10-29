import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Product.css';

export default function ProductCard({ product }) {
  const { id, name, price, category, imageUrl } = product;
  const navigate = useNavigate();

  return (
    <Card className="h-100 shadow-sm card-hover">
      {imageUrl && (
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={`Imagen de ${name}`}
          loading="lazy"
          style={{ objectFit: 'cover', height: 180 }}
        />
      )}
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0" style={{ fontSize: '1rem', lineHeight: 1.2 }}>
            {name}
          </Card.Title>
          {category && <Badge bg="light">{category}</Badge>}
        </div>

        <Card.Text className="text-muted mb-3">
          ${Number(price).toLocaleString('es-CL')}
        </Card.Text>

        <Button
          className="badge-black mt-auto"
          onClick={() => navigate(`/producto/${id}`)}
          aria-label={`Ver detalles de ${name}`}
        >
          Ver detalles
        </Button>
      </Card.Body>
    </Card>
  );
}
