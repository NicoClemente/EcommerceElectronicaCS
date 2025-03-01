import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomeButtons = () => {
  return (
    <Container className="my-5 py-4">
      <h2 className="text-center mb-5 position-relative pb-3">
        Explora Nuestras Secciones
        <span className="position-absolute start-50 translate-middle-x" style={{
          bottom: 0,
          height: '4px',
          width: '80px',
          backgroundColor: '#0d6efd',
          borderRadius: '2px'
        }}></span>
      </h2>
      
      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100 category-card border-0 shadow-sm hover-scale">
            <div className="card-img-wrapper">
              <Card.Img 
                variant="top" 
                src="/images/shop-category.jpg" 
                alt="Tienda"
                className="category-img"
              />
              <div className="card-overlay">
                <i className="bi bi-bag category-icon"></i>
              </div>
            </div>
            <Card.Body className="text-center py-4">
              <Card.Title className="mb-3 fs-4">Tienda</Card.Title>
              <Card.Text className="text-muted mb-4">
                Descubre nuestra amplia gama de productos electrónicos de las mejores marcas.
              </Card.Text>
              <Link 
                to="/shop" 
                className="btn btn-outline-primary rounded-pill px-4 stretched-link"
              >
                Ir a la Tienda
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 category-card border-0 shadow-sm hover-scale">
            <div className="card-img-wrapper">
              <Card.Img 
                variant="top" 
                src="/images/contact-category.jpg" 
                alt="Contacto"
                className="category-img"
              />
              <div className="card-overlay">
                <i className="bi bi-chat-dots category-icon"></i>
              </div>
            </div>
            <Card.Body className="text-center py-4">
              <Card.Title className="mb-3 fs-4">Contacto</Card.Title>
              <Card.Text className="text-muted mb-4">
                ¿Tienes dudas o consultas? Nuestro equipo está listo para asistirte.
              </Card.Text>
              <Link 
                to="/contacto" 
                className="btn btn-outline-primary rounded-pill px-4 stretched-link"
              >
                Contáctanos
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 category-card border-0 shadow-sm hover-scale">
            <div className="card-img-wrapper">
              <Card.Img 
                variant="top" 
                src="/images/login-category.jpg" 
                alt="Cuenta"
                className="category-img"
              />
              <div className="card-overlay">
                <i className="bi bi-person category-icon"></i>
              </div>
            </div>
            <Card.Body className="text-center py-4">
              <Card.Title className="mb-3 fs-4">Mi Cuenta</Card.Title>
              <Card.Text className="text-muted mb-4">
                Accede a tu cuenta para gestionar tus pedidos y datos personales.
              </Card.Text>
              <Link 
                to="/login" 
                className="btn btn-outline-primary rounded-pill px-4 stretched-link"
              >
                Iniciar Sesión
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* CSS para las tarjetas */}
      <style jsx="true">{`
        .category-card {
          overflow: hidden;
          transition: transform 0.3s ease;
        }
        
        .hover-scale:hover {
          transform: translateY(-10px);
        }
        
        .card-img-wrapper {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        
        .category-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .category-card:hover .category-img {
          transform: scale(1.1);
        }
        
        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(13, 110, 253, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
        }
        
        .category-card:hover .card-overlay {
          background: rgba(13, 110, 253, 0.4);
        }
        
        .category-icon {
          font-size: 3rem;
          color: white;
          opacity: 0.8;
        }
      `}</style>
    </Container>
  );
};

export default HomeButtons;