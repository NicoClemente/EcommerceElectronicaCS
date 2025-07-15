import React from 'react';
import { Container, Alert, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PagoPendiente = () => {
  return (
    <Container className="py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card className="text-center shadow-sm">
            <Card.Body className="p-5">
              <div className="mb-4">
                <i className="bi bi-clock-fill text-warning" style={{ fontSize: "4rem" }}></i>
              </div>
              <Card.Title className="mb-3 fs-2 text-warning">Pago Pendiente</Card.Title>
              <Card.Text className="mb-4 fs-5">
                Tu pago está siendo procesado. Te notificaremos por email cuando se complete la transacción.
              </Card.Text>
              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <Button as={Link} to="/pedidos" variant="primary" size="lg">
                  Ver mis pedidos
                </Button>
                <Button as={Link} to="/shop" variant="outline-primary" size="lg">
                  Seguir comprando
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default PagoPendiente;