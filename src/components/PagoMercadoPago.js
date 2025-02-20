import React, { useState, useEffect } from 'react'; 
import { Form, Button, Alert, Row, Col } from 'react-bootstrap'; 
import { procesarPago } from '../services/api';

const PagoMercadoPago = ({ total, carrito, direccionEntrega: direccionInicial, onCompletePayment }) => {
  const [email, setEmail] = useState('');
  const [direccionEntrega, setDireccionEntrega] = useState({
    calle: '',
    ciudad: '',
    codigoPostal: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (direccionInicial) {
      setDireccionEntrega({
        calle: direccionInicial.calle || '',
        ciudad: direccionInicial.ciudad || '',
        codigoPostal: direccionInicial.codigoPostal || ''
      });
    }
  }, [direccionInicial]);

  // Manejar cambios en los campos de dirección
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
      // Validar email
      if (!email || !email.includes('@')) {
        throw new Error('Por favor, ingrese un email válido para Mercado Pago');
      }

      // Validar dirección de entrega
      if (!direccionEntrega.calle || !direccionEntrega.ciudad || !direccionEntrega.codigoPostal) {
        throw new Error('Por favor complete todos los campos de la dirección de entrega');
      }

      // Preparar payload de pago
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

      console.log('Payload de pago:', JSON.stringify(paymentPayload, null, 2));
      
      const response = await procesarPago(paymentPayload);
      console.log('Respuesta de pago:', response);
      
      // Llamar al manejador de pago completado si está definido
      if (onCompletePayment) {
        onCompletePayment();
      }
    } catch (error) {
      console.error('Error en handleSubmit:', error);
      setError(error.message || 'Error al procesar el pago. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        {/* Sección de Email */}
        <Form.Group className="mb-3">
          <Form.Label>Email de Mercado Pago</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese el email para Mercado Pago"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <Form.Text className="text-muted">
            Debe ser el email asociado a su cuenta de Mercado Pago
          </Form.Text>
        </Form.Group>

        {/* Sección de Dirección de Entrega */}
        <Row>
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
        
        <Form.Group className="mb-3">
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