import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { procesarPago } from '../services/api';

const PagoMercadoPago = ({ total, carrito, direccionEntrega: direccionInicial }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [direccionEntrega] = useState({
    calle: direccionInicial?.calle || '',
    ciudad: direccionInicial?.ciudad || '',
    codigoPostal: direccionInicial?.codigoPostal || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const paymentData = {
        items: carrito.map(item => ({
          _id: item._id,
          titulo: item.titulo,
          cantidad: item.cantidad,
          precio: item.precio
        })),
        total,
        direccionEntrega
      };

      const response = await procesarPago(paymentData);
      
      if (response.init_point) {
        window.location.href = response.init_point;
      } else {
        throw new Error('No se recibió la URL de pago');
      }

    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      
      {/* Campos de dirección deshabilitados */}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Calle</Form.Label>
            <Form.Control
              value={direccionEntrega.calle}
              disabled
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              value={direccionEntrega.ciudad}
              disabled
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Código Postal</Form.Label>
        <Form.Control
          value={direccionEntrega.codigoPostal}
          disabled
        />
      </Form.Group>

      <Button 
        type="submit" 
        disabled={loading}
        className="w-100"
        style={{ backgroundColor: '#009ee3', borderColor: '#009ee3' }}
      >
        {loading ? 'Procesando...' : `Pagar $${total}`}
      </Button>
    </Form>
  );
};

export default PagoMercadoPago;