import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { procesarPago } from '../services/api';

const PagoMercadoPago = ({ total, carrito, direccionEntrega: direccionInicial, onCompletePayment }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [direccionEntrega, setDireccionEntrega] = useState({
    calle: '',
    ciudad: '',
    codigoPostal: ''
  });

  useEffect(() => {
    // Cargar script de MercadoPago
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.type = 'text/javascript';
    document.body.appendChild(script);

    script.onload = () => {
      const mp = new window.MercadoPago(process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (direccionInicial) {
      setDireccionEntrega({
        calle: direccionInicial.calle || '',
        ciudad: direccionInicial.ciudad || '',
        codigoPostal: direccionInicial.codigoPostal || ''
      });
    }
  }, [direccionInicial]);

  const handleDireccionChange = (e) => {
    const { name, value } = e.target;
    setDireccionEntrega(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validaciones
      if (!email || !email.includes('@')) {
        throw new Error('Por favor, ingrese un email válido');
      }

      if (!direccionEntrega.calle || !direccionEntrega.ciudad || !direccionEntrega.codigoPostal) {
        throw new Error('Por favor complete todos los campos de la dirección de entrega');
      }

      // Preparar payload
      const paymentPayload = {
        items: carrito.map(item => ({
          _id: item._id,
          titulo: item.titulo,
          cantidad: item.cantidad,
          precio: item.precio
        })),
        total: parseFloat(total),
        payer: {
          email: email
        },
        direccionEntrega: direccionEntrega
      };

      console.log('Iniciando proceso de pago:', paymentPayload);
      const response = await procesarPago(paymentPayload);
      console.log('Respuesta del servidor:', response);

      // Redirigir al checkout de MercadoPago
      if (response.init_point) {
        window.location.href = response.init_point;
      } else {
        throw new Error('No se recibió la URL de pago de MercadoPago');
      }

      // Llamar al callback si existe
      if (onCompletePayment) {
        onCompletePayment();
      }
    } catch (error) {
      console.error('Error en el proceso de pago:', error);
      setError(error.message || 'Error al procesar el pago. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form">
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        {/* Email */}
        <Form.Group className="mb-4">
          <Form.Label>Email de Mercado Pago</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <Form.Text className="text-muted">
            Debe ser el email asociado a su cuenta de Mercado Pago
          </Form.Text>
        </Form.Group>

        {/* Dirección de Entrega */}
        <Row className="mb-4">
          <Col md={12}>
            <h5 className="mb-3">Dirección de Entrega</h5>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Calle</Form.Label>
              <Form.Control
                type="text"
                name="calle"
                placeholder="Ingrese la calle"
                value={direccionEntrega.calle}
                onChange={handleDireccionChange}
                required
                disabled={loading}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                name="ciudad"
                placeholder="Ingrese la ciudad"
                value={direccionEntrega.ciudad}
                onChange={handleDireccionChange}
                required
                disabled={loading}
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group className="mb-4">
          <Form.Label>Código Postal</Form.Label>
          <Form.Control
            type="text"
            name="codigoPostal"
            placeholder="Ingrese el código postal"
            value={direccionEntrega.codigoPostal}
            onChange={handleDireccionChange}
            required
            disabled={loading}
          />
        </Form.Group>

        {/* Resumen del Pago */}
        <div className="payment-summary mb-4">
          <h5 className="mb-3">Resumen del Pago</h5>
          <p className="mb-2">Total a pagar: ${total}</p>
          <small className="text-muted">
            Serás redirigido a Mercado Pago para completar la compra
          </small>
        </div>

        {/* Botón de Pago */}
        <Button 
          type="submit" 
          disabled={loading}
          className="w-100"
          style={{
            backgroundColor: '#009ee3',
            borderColor: '#009ee3'
          }}
        >
          {loading ? 'Procesando...' : `Pagar $${total}`}
        </Button>
      </Form>
    </div>
  );
};

export default PagoMercadoPago;