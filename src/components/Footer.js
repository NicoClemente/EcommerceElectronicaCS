import React from 'react';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube, faCcVisa, faCcMastercard, faCcPaypal, faCcAmex } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <Container>
        <Row className="mb-5">
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 pb-1 border-bottom border-primary border-2 d-inline-block">
              ElectrónicaCS
            </h5>
            <p className="mb-4">
              Tu tienda de confianza para los mejores productos electrónicos.
              Ofrecemos calidad, servicio y los mejores precios del mercado.
            </p>
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-3 text-primary" />
                <p className="mb-0">Bahía Blanca, Buenos Aires, Argentina</p>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FontAwesomeIcon icon={faPhone} className="me-3 text-primary" />
                <p className="mb-0">+54 291 123-4567</p>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FontAwesomeIcon icon={faEnvelope} className="me-3 text-primary" />
                <p className="mb-0">info@electronicacs.com</p>
              </div>
            </div>
          </Col>

          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 pb-1 border-bottom border-primary border-2 d-inline-block">Enlaces</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none hover-effect">
                  Inicio
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/shop" className="text-white text-decoration-none hover-effect">
                  Tienda
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contacto" className="text-white text-decoration-none hover-effect">
                  Contacto
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/pedidos" className="text-white text-decoration-none hover-effect">
                  Mis Pedidos
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 pb-1 border-bottom border-primary border-2 d-inline-block">Categorías</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/shop" className="text-white text-decoration-none hover-effect">
                  Smartphones
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/shop" className="text-white text-decoration-none hover-effect">
                  Computadoras
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/shop" className="text-white text-decoration-none hover-effect">
                  Televisores
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/shop" className="text-white text-decoration-none hover-effect">
                  Electrodomésticos
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 pb-1 border-bottom border-primary border-2 d-inline-block">Newsletter</h5>
            <p>Suscríbete para recibir nuestras ofertas y novedades</p>
            
            <Form className="mb-4">
              <InputGroup>
                <Form.Control
                  placeholder="Ingresa tu email"
                  aria-label="Email para newsletter"
                />
                <Button variant="primary" type="submit">
                  Suscribirse
                </Button>
              </InputGroup>
            </Form>

            <h5 className="text-uppercase mb-3">Síguenos</h5>
            <div className="d-flex">
              <a href="https://web.facebook.com/nicolas.clemente.92" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline-light btn-floating me-2"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://www.instagram.com/nico.clemente/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline-light btn-floating me-2"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" 
                className="btn btn-outline-light btn-floating me-2"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" 
                className="btn btn-outline-light btn-floating"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="my-4" />

        <Row className="align-items-center">
          <Col md={8} className="mb-3 mb-md-0">
            <p className="mb-0">
              &copy; {currentYear} ElectrónicaCS. Todos los derechos reservados.
            </p>
          </Col>
          <Col md={4} className="text-md-end">
            <div className="payment-methods">
              <span className="me-2">Métodos de pago:</span>
              <FontAwesomeIcon icon={faCcVisa} className="payment-icon ms-2" size="lg" />
              <FontAwesomeIcon icon={faCcMastercard} className="payment-icon ms-2" size="lg" />
              <FontAwesomeIcon icon={faCcPaypal} className="payment-icon ms-2" size="lg" />
              <FontAwesomeIcon icon={faCcAmex} className="payment-icon ms-2" size="lg" />
            </div>
          </Col>
        </Row>
      </Container>
      
      {/* Estilos CSS para los efectos de hover */}
      <style jsx="true">{`
        .hover-effect {
          transition: color 0.3s ease;
        }
        .hover-effect:hover {
          color: #0d6efd !important;
        }
        .btn-floating {
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .btn-floating:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        .payment-icon {
          font-size: 1.8rem;
          color: #f8f9fa;
          transition: all 0.3s ease;
        }
        .payment-icon:hover {
          color: #0d6efd;
        }
        
        /* Adaptación para modo oscuro */
        [data-bs-theme="dark"] .payment-icon {
          color: #f8f9fa;
        }
      `}</style>
    </footer>
  );
};

export default Footer;