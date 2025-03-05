import React, { useState, useEffect } from 'react';
import { Container, Carousel, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detectar si estamos en un dispositivo móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Definir gradientes para dispositivos móviles
  const mobileBackgrounds = {
    slide1: "linear-gradient(135deg, #5E35B1, #3949AB)",
    slide2: "linear-gradient(135deg, #1E88E5, #26C6DA)",
    slide3: "linear-gradient(135deg, #F57C00, #FFB74D)",
    slide4: "linear-gradient(135deg, #7B1FA2, #E91E63)",
    slide5: "linear-gradient(135deg, #43A047, #26A69A)"
  };

  return (
    <div className="header-section">
      {/* Carousel mejorado con overlay y botones */}
      <Carousel
        interval={5000}
        className="hero-carousel"
        indicators={true}
        prevIcon={<span className="carousel-control-prev-icon custom-carousel-icon" />}
        nextIcon={<span className="carousel-control-next-icon custom-carousel-icon" />}
      >
        <Carousel.Item>
          <div
            className="carousel-image-container"
            style={{ 
              backgroundImage: isMobile ? mobileBackgrounds.slide1 : "url('/images/lavarropas.png')",
              backgroundColor: "#5E35B1" // Fondo base para el gradiente
            }}
          >
            <div className="carousel-overlay">
              <Container>
                <div className="carousel-caption-custom text-start">
                  <h2 className="display-4 fw-bold text-light mb-3">Electrodomésticos de última generación</h2>
                  <p className="lead mb-4">Descubre nuestra línea de lavarropas inteligentes con tecnología eco-friendly.</p>
                  <Button as={Link} to="/shop" variant="primary" size="lg" className="me-2">
                    Ver Productos
                  </Button>
                  <Button as={Link} to="/contacto" variant="outline-light" size="lg">
                    Contáctanos
                  </Button>
                </div>
              </Container>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="carousel-image-container"
            style={{ 
              backgroundImage: isMobile ? mobileBackgrounds.slide2 : "url('/images/electrodomesticos.png')",
              backgroundColor: "#1E88E5" // Fondo base para el gradiente
            }}
          >
            <div className="carousel-overlay">
              <Container>
                <div className="carousel-caption-custom text-start">
                  <h2 className="display-4 fw-bold text-light mb-3">Todo para tu hogar</h2>
                  <p className="lead mb-4">Equipamiento completo para hacer de tu casa un hogar inteligente.</p>
                  <Button as={Link} to="/shop" variant="primary" size="lg" className="me-2">
                    Explorar
                  </Button>
                  <Button as={Link} to="/contacto" variant="outline-light" size="lg">
                    Más información
                  </Button>
                </div>
              </Container>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="carousel-image-container"
            style={{ 
              backgroundImage: isMobile ? mobileBackgrounds.slide3 : "url('/images/laptop.png')",
              backgroundColor: "#F57C00" // Fondo base para el gradiente
            }}
          >
            <div className="carousel-overlay">
              <Container>
                <div className="carousel-caption-custom text-start">
                  <h2 className="display-4 fw-bold text-light mb-3">Potencia tu productividad</h2>
                  <p className="lead mb-4">Laptops con el mejor rendimiento para trabajo y gaming.</p>
                  <Button as={Link} to="/shop" variant="primary" size="lg" className="me-2">
                    Ver laptops
                  </Button>
                  <Button as={Link} to="/contacto" variant="outline-light" size="lg">
                    Asesoramiento
                  </Button>
                </div>
              </Container>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="carousel-image-container"
            style={{ 
              backgroundImage: isMobile ? mobileBackgrounds.slide4 : "url('/images/nespresso.png')",
              backgroundColor: "#7B1FA2" // Fondo base para el gradiente
            }}
          >
            <div className="carousel-overlay">
              <Container>
                <div className="carousel-caption-custom">
                  <h2 className="display-4 fw-bold text-light mb-3">Experiencias Gourmet</h2>
                  <p className="lead mb-4">La mejor tecnología para disfrutar de momentos únicos.</p>
                  <Button as={Link} to="/shop" variant="primary" size="lg">
                    Descubrir
                  </Button>
                </div>
              </Container>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="carousel-image-container"
            style={{ 
              backgroundImage: isMobile ? mobileBackgrounds.slide5 : "url('/images/cuotas.png')",
              backgroundColor: "#43A047" // Fondo base para el gradiente
            }}
          >
            <div className="carousel-overlay">
              <Container>
                <div className="carousel-caption-custom">
                  <h2 className="display-4 fw-bold text-light mb-3">Facilidades de pago</h2>
                  <p className="lead mb-4">Hasta 12 cuotas sin interés con todas las tarjetas.</p>
                  <Button as={Link} to="/shop" variant="primary" size="lg">
                    Comprar ahora
                  </Button>
                </div>
              </Container>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

      {/* Sección de bienvenida mejorada */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10} className="text-center">
          <h1 className="display-4 fw-bold mb-4 welcome-title">Bienvenido a ElectrónicaCS</h1>
            <p className="lead mb-5">
              Somos tu destino de confianza para encontrar lo mejor en tecnología y electrónica. Descubre nuestra cuidadosa selección de productos de vanguardia, diseñada para brindarte experiencias excepcionales. ¡Explora ahora y lleva a casa la innovación que estabas buscando!
            </p>

            <Row className="g-4 mb-5">
              <Col md={4}>
                <div className="feature-box p-4 bg-light rounded shadow-sm">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-truck text-primary" style={{ fontSize: "2.5rem" }}></i>
                  </div>
                  <h4>Envío Gratis</h4>
                  <p className="text-muted">En compras superiores a $10,000 en todo el país.</p>
                </div>
              </Col>

              <Col md={4}>
                <div className="feature-box p-4 bg-light rounded shadow-sm">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-shield-check text-primary" style={{ fontSize: "2.5rem" }}></i>
                  </div>
                  <h4>Garantía Oficial</h4>
                  <p className="text-muted">Todos nuestros productos cuentan con garantía oficial.</p>
                </div>
              </Col>

              <Col md={4}>
                <div className="feature-box p-4 bg-light rounded shadow-sm">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-credit-card text-primary" style={{ fontSize: "2.5rem" }}></i>
                  </div>
                  <h4>Pago Seguro</h4>
                  <p className="text-muted">Múltiples opciones de pago seguro y hasta 12 cuotas.</p>
                </div>
              </Col>
            </Row>

            <Button as={Link} to="/shop" variant="primary" size="lg" className="px-5 py-3">
              Explorar Productos
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Estilos CSS para el header */}
      <style jsx="true">{`

        .welcome-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700; /* Ya definido en tu carga de fuente */
          color: #2c3e50;
          letter-spacing: -1.5px;
          background: linear-gradient(45deg, #5E35B1, #3949AB);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
        }
        .carousel-image-container {
          position: relative;
          height: 400px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }       
        
        .carousel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
        }
        
        .carousel-caption-custom {
          width: 100%;
          color: white;
          padding: 0 20px;
        }
        
        .custom-carousel-icon {
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          background-position: center;
          background-size: 50%;
        }
        
        .feature-box {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .feature-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        
        @media (max-width: 992px) {
          .carousel-image-container {
            height: 400px;
          }
          
          .carousel-caption-custom h2 {
            font-size: 2rem;
          }
          
          .carousel-caption-custom .lead {
            font-size: 1rem;
          }
          
          .carousel-caption-custom .btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }
        
        @media (max-width: 768px) {
          .carousel-image-container {
            height: 350px;
          }
          
          .carousel-overlay {
            background: rgba(0, 0, 0, 0.3); /* Reducir la superposición para que el gradiente sea más visible */
          }
          
          .carousel-caption-custom h2 {
            font-size: 1.75rem;
          }
          
          .carousel-caption-custom .btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.85rem;
          }
        }
        
        @media (max-width: 576px) {
          .carousel-image-container {
            height: 300px;
          }
          
          .carousel-caption-custom h2 {
            font-size: 1.5rem;
          }
          
          .carousel-caption-custom .lead {
            font-size: 0.9rem;
            margin-bottom: 0.5rem !important;
          }
          
          .carousel-caption-custom .btn {
            padding: 0.3rem 0.6rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;