import { Navbar, Nav, Container, Badge, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/AppContext';
import './NavBar.css';
import logo from '../assets/logo512.png'; // o reemplázalo por tu archivo nuevo

export default function NavBar() {
  const { cartCount } = useCart();
  return (
    <Navbar bg="black" expand="lg" className="mb-3 navbar-black">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image
            src={logo}
            alt="Moda Urbana"
            width="45"
            height="45"
            roundedCircle
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/productos">PRODUCTOS</Nav.Link>
            <Nav.Link as={Link} to="/contacto">CONTACTO</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/cliente">👤</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/carrito">
              🛒 {cartCount > 0 && <Badge bg="light" text="dark">{cartCount}</Badge>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
