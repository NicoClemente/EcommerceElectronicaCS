import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { procesarPago } from '../services/api';

const PagoMercadoPago = ({ total, items }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await procesarPago({
        items,
        total,
        payer: {
          email
        }
      });

      console.log('Respuesta del pago:', response);
      
    } catch (error) {
      setError('Error al procesar el pago. Por favor intente nuevamente.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </Form.Group>

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