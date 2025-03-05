import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, Button, Dropdown, Badge, Offcanvas } from "react-bootstrap";
import { Routes, Route, Link, useLocation } from "react-router-dom";
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
import { isAdmin } from "../utils/roleUtils";
import Perfil from "../pages/Perfil";
import ThemeToggle from "./ThemeToggle";

function Navigation() {
  const [carrito, setCarrito] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Control del comportamiento del navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Cerrar el offcanvas al cambiar de ruta
  useEffect(() => {
    setShowOffcanvas(false);
  }, [location]);

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
    if (productoId === "all") {
      setCarrito([]);
      return;
    }

    const nuevoCarrito = carrito.filter(
      (producto) => producto._id !== productoId
    );
    setCarrito(nuevoCarrito);
  };

  // Calcular la cantidad total de items en el carrito
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  // Verificar si el usuario es administrador
  const userIsAdmin = isAdmin();

  return (
    <>
      <Navbar
        expand="lg"
        className={`navbar-main ${scrolled ? 'navbar-scrolled' : ''}`}
        fixed="top"
      >
        <Container fluid className="px-4">
          {/* Logo - Alineado a la izquierda */}
          <Navbar.Brand as={Link} to="/" className="brand-logo me-0">
            <img
              src="/images/logo.png"
              alt="ElectronicaCS"
              height="45"
              className="d-inline-block align-top me-3"
            />
            <span className="brand-text fs-3">Electrónica<span className="text-primary fw-bold">CS</span></span>
          </Navbar.Brand>

          {/* Navegación central - Absolutamente centrada */}
          <div className="d-none d-lg-flex justify-content-center" style={{ flex: 1 }}>
            <Nav>
              <Nav.Link as={Link} to="/" className="nav-link-custom mx-3 fs-5 fw-500">
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="/shop" className="nav-link-custom mx-3 fs-5 fw-500">
                Tienda
              </Nav.Link>
              <Nav.Link as={Link} to="/contacto" className="nav-link-custom mx-3 fs-5 fw-500">
                Contacto
              </Nav.Link>
              {userIsAdmin && (
                <Nav.Link as={Link} to="/pedidos" className="nav-link-custom mx-3 fs-5 fw-500">
                  Pedidos
                </Nav.Link>
              )}
            </Nav>
          </div>

          {/* Controles a la derecha */}
          <div className="d-flex align-items-center ms-auto">
            {/* Botón de Tema (Claro/Oscuro) */}
            <div className="me-3 d-none d-lg-block">
              <ThemeToggle />
            </div>
            
            {/* Dropdown para usuario autenticado */}
            {user ? (
              <Dropdown align="end" className="me-3 d-none d-lg-block">
                <Dropdown.Toggle
                  variant="light"
                  id="user-dropdown"
                  className="d-flex align-items-center rounded"
                  style={{
                    padding: "0.4rem 0.8rem",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                  }}
                >
                  <i className="bi bi-person-fill fs-5"></i>
                  <span className="d-none d-md-inline">⚙️</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end shadow-sm border-0">
                  <div className="px-4 py-3 text-center border-bottom mb-2">
                    <p className="mb-0 fw-bold fs-6">{user.nombre}</p>
                    <small className="text-muted">{user.email}</small>
                    {userIsAdmin && (
                      <Badge bg="danger" className="ms-2">Admin</Badge>
                    )}
                  </div>
                  <Dropdown.Item as={Link} to="/perfil" className="py-2">
                    <i className="bi bi-person-gear me-2"></i> Mi Perfil
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/pedidos" className="py-2">
                    <i className="bi bi-box me-2"></i> Mis Pedidos
                  </Dropdown.Item>
                  {userIsAdmin && (
                    <Dropdown.Item as={Link} to="/alta" className="py-2">
                      <i className="bi bi-plus-circle me-2"></i> Agregar Producto
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout} className="py-2">
                    <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-none d-lg-flex me-3">
                {!user && (
                  <>
                    <Button
                      as={Link}
                      to="/login"
                      variant="outline-light"
                      className="me-2 px-3 py-2"
                    >
                      Iniciar Sesión
                    </Button>
                    <Button
                      as={Link}
                      to="/registro"
                      variant="primary"
                      className="px-3 py-2"
                    >
                      Registrarse
                    </Button>
                  </>
                )}
              </div>
            )}

            {/* Carrito dropdown - Solo visible en pantallas grandes */}
            <div className="me-3 d-none d-lg-block">
              <CarritoDropdown
                carrito={carrito}
                eliminarDelCarrito={eliminarDelCarrito}
              />
            </div>

            {/* Toggle para el menú móvil */}
            <Button
              variant="primary"
              className="navbar-toggler border-0 btn-circle d-lg-none menu-toggle-btn"
              onClick={() => setShowOffcanvas(true)}
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#0d6efd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <i className="bi bi-list fs-4 text-white"></i>
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* Menú offcanvas para móvil */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
        className="mobile-nav"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fs-4">Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mobile-nav-content">
            <div className="mobile-nav-section">
              <h6 className="text-uppercase text-muted fw-bold small mb-3">Navegación</h6>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/" className="mobile-nav-link fs-5">
                  <i className="bi bi-house-door me-2"></i> Inicio
                </Nav.Link>
                <Nav.Link as={Link} to="/shop" className="mobile-nav-link fs-5">
                  <i className="bi bi-bag me-2"></i> Tienda
                </Nav.Link>
                <Nav.Link as={Link} to="/contacto" className="mobile-nav-link fs-5">
                  <i className="bi bi-chat-dots me-2"></i> Contacto
                </Nav.Link>
                <Nav.Link as={Link} to="/pedidos" className="mobile-nav-link fs-5">
                  <i className="bi bi-box me-2"></i> Mis Pedidos
                </Nav.Link>
                <Nav.Link as={Link} to="/carrito" className="mobile-nav-link fs-5">
                  <i className="bi bi-cart me-2"></i>
                  Carrito
                  {cantidadTotal > 0 && (
                    <Badge bg="primary" pill className="ms-auto">{cantidadTotal}</Badge>
                  )}
                </Nav.Link>
              </Nav>
            </div>

            <div className="mobile-nav-section mt-4">
              <h6 className="text-uppercase text-muted fw-bold small mb-3">Mi Cuenta</h6>
              {user ? (
                <>
                  <div className="p-3 bg-light rounded mb-3">
                    <p className="mb-1 fw-bold fs-5">{user.nombre}</p>
                    <small className="text-muted">{user.email}</small>
                  </div>
                  <Button
                    as={Link}
                    to="/perfil"
                    variant="outline-primary"
                    className="w-100 mb-3 py-2"
                  >
                    <i className="bi bi-person-gear me-2"></i> Mi Perfil
                  </Button>
                  {userIsAdmin && (
                    <Button
                      as={Link}
                      to="/alta"
                      variant="outline-primary"
                      className="w-100 mb-3 py-2"
                    >
                      <i className="bi bi-plus-circle me-2"></i> Agregar Producto
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    className="w-100 py-2"
                    onClick={logout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    as={Link}
                    to="/login"
                    variant="outline-primary"
                    className="w-100 mb-3 py-2"
                  >
                    <i className="bi bi-person me-2"></i> Iniciar Sesión
                  </Button>
                  <Button
                    as={Link}
                    to="/registro"
                    variant="primary"
                    className="w-100 py-2"
                  >
                    <i className="bi bi-person-plus me-2"></i> Registrarse
                  </Button>
                </>
              )}
            </div>
            
            {/* Botón de cambio de tema en el menú móvil */}
            <div className="mobile-nav-section mt-4">
              <h6 className="text-uppercase text-muted fw-bold small mb-3">Preferencias</h6>
              <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded">
                <span>Modo de tema</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Espacio para compensar la navbar fixed */}
      <div className="navbar-spacer"></div>

      {/* Rutas de la aplicación */}
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
        <Route path="/perfil" element={<Perfil />} />
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

      {/* Estilos CSS para la navegación */}
      <style jsx="true">{`
        /* Navbar principal */
        .navbar-main {
          background-color: #343a40;
          transition: all 0.3s ease;
          padding: 18px 0;
        }
        
        .navbar-scrolled {
          background-color: rgba(52, 58, 64, 0.95);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          padding: 12px 0;
        }
        
        .navbar-spacer {
          height: 90px;
        }
        
        /* Logo */
        .brand-logo {
          display: flex;
          align-items: center;
        }
        
        .brand-text {
          color: white;
          font-weight: 600;
          font-family: 'Montserrat', sans-serif;
          letter-spacing: -0.02em;
        }
        
        /* Enlaces de navegación */
        .nav-link-custom {
          color: rgba(255, 255, 255, 0.9) !important;
          position: relative;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem !important;
          font-weight: 500;
        }
        
        .nav-link-custom:hover {
          color: white !important;
        }
        
        .nav-link-custom::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background-color: #0d6efd;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        .nav-link-custom:hover::after {
          width: 70%;
        }
        
        /* Botones circulares para iconos */
        .btn-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: all 0.3s ease;
        }
        
        .btn-circle:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        /* Navegación móvil */
        .mobile-nav {
          width: 300px !important;
        }
        
        .mobile-nav-content {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .mobile-nav-section {
          margin-bottom: 2rem;
        }
        
        .mobile-nav-link {
          padding: 0.85rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .mobile-nav-link:hover {
          background-color: rgba(13, 110, 253, 0.05);
          transform: translateX(5px);
        }
        
        /* Tema oscuro adaptación */
        [data-bs-theme="dark"] .navbar-main {
          background-color: #121212;
        }
        
        [data-bs-theme="dark"] .navbar-scrolled {
          background-color: rgba(18, 18, 18, 0.95);
        }
        
        [data-bs-theme="dark"] .brand-text {
          color: #f8f9fa;
        }
        
        /* Responsive */
        @media (max-width: 991px) {
          .navbar-spacer {
            height: 80px;
          }
          
          .navbar-main {
            padding: 12px 0;
          }
          
          .brand-text {
            font-size: 1.5rem !important;
          }
          
          .menu-toggle-btn {
            background-color: #0d6efd !important;
            color: white !important;
            width: 40px !important;
            height: 40px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
        }
        
        @media (max-width: 767px) {
          .navbar-spacer {
            height: 70px;
          }
          
          .navbar-main {
            padding: 10px 0;
          }
          
          .brand-text {
            font-size: 1.3rem !important;
          }
          
          .btn-circle {
            width: 38px;
            height: 38px;
          }
        }
        
        @media (max-width: 576px) {
          .navbar-spacer {
            height: 65px;
          }
          
          .brand-logo img {
            height: 35px;
          }
          
          .brand-text {
            font-size: 1.2rem !important;
          }
          
          .btn-circle {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </>
  );
}

export default Navigation;