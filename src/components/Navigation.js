// src/components/Navigation.js
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Contacto from "../pages/Contacto";
import Carrito from "../pages/Carrito";
import Alta from "../pages/Alta";
import CarritoDropdown from "./CarritoDropdown";
import ListaPedidos from "../pages/ListaPedidos";
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import ResultadoPago from "../pages/ResultadoPago";

function Navigation() {
 const [carrito, setCarrito] = useState([]);
 const { user, logout } = useAuth();

 const agregarAlCarrito = (producto) => {
   const productoEnCarrito = carrito.find((item) => item._id === producto._id);

   if (productoEnCarrito) {
     setCarrito(
       carrito.map((item) =>
         item._id === producto._id
           ? { ...item, cantidad: item.cantidad + 1 }
           : item
       )
     );
   } else {
     setCarrito([...carrito, { ...producto, cantidad: 1 }]);
   }
 };

 const eliminarDelCarrito = (productoId) => {
   const nuevoCarrito = carrito.filter(
     (producto) => producto._id !== productoId
   );
   setCarrito(nuevoCarrito);
 };

 return (
   <>
     <Navbar className="bg-dark" variant="light">
       <Container>
         <Navbar.Brand className="text-white fs-1" as={Link} to="/">
           ElectrónicaCS
         </Navbar.Brand>
         <Nav className="me-auto">
           <Nav.Link className="text-white fs-5" as={Link} to="/shop">
             Shop
           </Nav.Link>
           <Nav.Link className="text-white fs-5" as={Link} to="/contacto">
             Contacto
           </Nav.Link>
           {user && user.rol === 'admin' && (
             <Nav.Link className="text-white fs-5" as={Link} to="/Alta">
               Alta
             </Nav.Link>
           )}
           <Nav.Link className="text-white fs-5" as={Link} to="/pedidos">
             Pedidos
           </Nav.Link>
         </Nav>
         
         <Nav className="me-2">
           {user ? (
             <>
               <Nav.Link className="text-white fs-5" onClick={logout}>
                 Cerrar Sesión
               </Nav.Link>
               <span className="text-white fs-5 mt-2">
                 {user.nombre}
               </span>
             </>
           ) : (
             <>
               <Nav.Link className="text-white fs-5" as={Link} to="/login">
                 Iniciar Sesión
               </Nav.Link>
               <Nav.Link className="text-white fs-5" as={Link} to="/registro">
                 Registrarse
               </Nav.Link>
             </>
           )}
         </Nav>

         <CarritoDropdown
           carrito={carrito}
           eliminarDelCarrito={eliminarDelCarrito}
         />
       </Container>
     </Navbar>

     <Routes>
       <Route
         path="/"
         element={<Home agregarAlCarrito={agregarAlCarrito} />}
       />
       <Route
         path="/shop"
         element={<Shop agregarAlCarrito={agregarAlCarrito} />}
       />
       <Route path="/contacto" element={<Contacto />} />
       <Route path="/login" element={<Login />} />
       <Route path="/registro" element={<Registro />} />
       <Route path="/alta" element={<Alta />} />
       <Route
         path="/carrito"
         element={
           <Carrito
             carrito={carrito}
             eliminarDelCarrito={eliminarDelCarrito}
           />
         }
       />
       <Route path="/pedidos" element={<ListaPedidos />} />
       <Route path="/pago/:status" element={<ResultadoPago />} />
     </Routes>
   </>
 );
}

export default Navigation;