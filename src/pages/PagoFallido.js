import React from 'react';
import { Container, Alert, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PagoFallido = () => {
  return (
    <Container className="py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card className="text-center shadow-sm">
            <Card.Body className="p-5">
              <div className="mb-4">
                <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: "4rem" }}></i>
              </div>
              <Card.Title className="mb-3 fs-2 text-danger">Pago Fallido</Card.Title>
              <Card.Text className="mb-4 fs-5">
                Hubo un problema al procesar tu pago. Por favor, intenta nuevamente o utiliza otro método de pago.
              </Card.Text>
              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <Button as={Link} to="/carrito" variant="primary" size="lg">
                  Volver al carrito
                </Button>
                <Button as={Link} to="/contacto" variant="outline-secondary" size="lg">
                  Contactar soporte
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default PagoFallido;
