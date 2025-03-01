import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setLoading(true);
    setErrorMessage('');
    
    // Simulamos el envío del formulario
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Tu mensaje ha sido enviado. Te contactaremos pronto.');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
      });
      setValidated(false);
    }, 1500);
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:contacto@electronicacs.com';
  };

  return (
    <div className="contact-page">
      {/* Cabecera de la página */}
      <div className="contact-header py-5 mb-5 bg-primary text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 fw-bold mb-3">Contáctanos</h1>
              <p className="lead mb-0">
                Estamos aquí para ayudarte. No dudes en comunicarte con nosotros para cualquier consulta.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      
      <Container className="py-3">
        {successMessage && (
          <Alert 
            variant="success" 
            className="mb-4 shadow-sm" 
            onClose={() => setSuccessMessage('')} 
            dismissible
          >
            <Alert.Heading>¡Mensaje enviado!</Alert.Heading>
            <p className="mb-0">{successMessage}</p>
          </Alert>
        )}
        
        {errorMessage && (
          <Alert 
            variant="danger" 
            className="mb-4" 
            onClose={() => setErrorMessage('')} 
            dismissible
          >
            <Alert.Heading>Error</Alert.Heading>
            <p className="mb-0">{errorMessage}</p>
          </Alert>
        )}
        
        <Row className="g-5">
          {/* Información de contacto */}
          <Col lg={4}>
            <div className="contact-info mb-4">
              <h3 className="mb-4 pb-2 border-bottom border-primary border-2 d-inline-block">Información de Contacto</h3>
              
              <div className="contact-method d-flex align-items-center mb-4">
                <div className="contact-icon me-3 bg-primary text-white p-3 rounded">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <div>
                  <h5 className="mb-1">Dirección</h5>
                  <p className="mb-0">San Martín 250, Bahía Blanca, Buenos Aires, Argentina</p>
                </div>
              </div>
              
              <div className="contact-method d-flex align-items-center mb-4">
                <div className="contact-icon me-3 bg-primary text-white p-3 rounded">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <h5 className="mb-1">Email</h5>
                  <p className="mb-0">
                    <a 
                      href="mailto:contacto@electronicacs.com" 
                      className="text-decoration-none"
                      onClick={handleEmailClick}
                    >
                      clementes.nicolas@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="contact-method d-flex align-items-center mb-4">
                <div className="contact-icon me-3 bg-primary text-white p-3 rounded">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <h5 className="mb-1">Teléfono</h5>
                  <p className="mb-0">
                    <a 
                      href="tel:+542914057843" 
                      className="text-decoration-none"
                    >
                      +54 291 405-7843
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="contact-method d-flex align-items-center mb-4">
                <div className="contact-icon me-3 bg-primary text-white p-3 rounded">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div>
                  <h5 className="mb-1">Horario de Atención</h5>
                  <p className="mb-0">Lunes a Viernes: 9am - 6pm<br />Sábados: 9am - 1pm</p>
                </div>
              </div>
            </div>
            
            <Card className="border-0 shadow-sm mt-5">
              <Card.Body className="p-0">
                <iframe
                  title="Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107374.34280008643!2d-62.282906752708!3d-38.7116898269835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc8f01545a4e1%3A0xf869cf6c61a041ad!2sBah%C3%ADa%20Blanca%2C%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1637678836483!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: '0' }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Formulario de contacto */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 p-lg-5">
                <h3 className="card-title mb-4">Envíanos un mensaje</h3>
                <p className="text-muted mb-4">
                  Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.
                </p>
                
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="nombre">
                        <Form.Label>Nombre completo</Form.Label>
                        <Form.Control
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          placeholder="Ingresa tu nombre"
                          required
                          disabled={loading}
                        />
                        <Form.Control.Feedback type="invalid">
                          Por favor ingresa tu nombre.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="email">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Ingresa tu email"
                          required
                          disabled={loading}
                        />
                        <Form.Control.Feedback type="invalid">
                          Por favor ingresa un email válido.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="telefono">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          placeholder="Opcional"
                          disabled={loading}
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="asunto">
                        <Form.Label>Asunto</Form.Label>
                        <Form.Control
                          type="text"
                          name="asunto"
                          value={formData.asunto}
                          onChange={handleChange}
                          placeholder="¿Sobre qué quieres contactarnos?"
                          required
                          disabled={loading}
                        />
                        <Form.Control.Feedback type="invalid">
                          Por favor ingresa un asunto.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-4" controlId="mensaje">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí..."
                      required
                      disabled={loading}
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor ingresa tu mensaje.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <div className="d-grid">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Enviando...
                        </>
                      ) : (
                        'Enviar Mensaje'
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      {/* Estilos CSS para la página de contacto */}
      <style jsx="true">{`
        .contact-header {
          position: relative;
          overflow: hidden;
        }
        
        .contact-header::after {
          content: '';
          position: absolute;
          left: 0;
          height: 100px;
          background: white;
        }
        
        .contact-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 15px rgba(13, 110, 253, 0.2);
        }
        
        .contact-method {
          transition: transform 0.3s ease;
        }
        
        .contact-method:hover {
          transform: translateY(-5px);
        }
        
        @media (max-width: 768px) {
          .contact-header::after {
            bottom: -30px;
            height: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default Contacto;