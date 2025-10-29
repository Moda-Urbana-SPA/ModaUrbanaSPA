import { Link } from 'react-router-dom';
import { Container, Button, Image, Row, Col } from 'react-bootstrap';
import { MODA_PRODUCTS } from '../data/moda.mock.js';
import ProductGrid from '../components/products/ProductGrid';
import logo from '../assets/logo512.png'; 
import './Page.css';

export default function Home() {
  const featuredProducts = MODA_PRODUCTS.slice(0, 4);

  return (
    <>
      <Container fluid as="section" className="hero-section-home text-center text-white">
        <Row className="h-100 align-items-center justify-content-center">
          <Col md={8}>
            <Image src={logo} alt="Moda Urbana SPA Logo" className="hero-logo mb-4" />
            <h1 className="hero-title">Estilo que Define</h1>
            <p className="hero-subtitle mb-4">
              Descubre colecciones exclusivas de moda sostenible.
            </p>
            <Button as={Link} to="/productos" className="badge-black" size="lg">
              Catálogo
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className="py-5 featured-products-section">
        <h2 className="text-center mb-4">Los más vendidos</h2>
        <ProductGrid items={featuredProducts} />
      </Container>
    </>
  );
}