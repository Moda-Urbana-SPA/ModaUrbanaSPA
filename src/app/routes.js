// src/app/routes.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Contact from '../pages/Contact';
import Cart from '../pages/Cart';
import Client from '../pages/Client';
import Order from '../pages/Order';

export default function AppRoutes(){
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/producto/:id" element={<ProductDetail />} /> 
        <Route path="/contacto" element={<Contact />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/cliente" element={<Client />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
}
