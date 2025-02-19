import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { procesarPago } from '../services/api';

const PagoMercadoPago = ({ carrito, total }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Try to pre-fill email from user data
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData?.email) {
      setEmail(userData.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const paymentData = {
        ...carrito,  // Spread the entire carrito object
        email,       // Add email explicitly
        total        // Ensure total is passed
      };

      console.log('Datos de pago completos:', JSON.stringify(paymentData, null, 2));
      
      const response = await procesarPago(paymentData);
      console.log('Respuesta de pago:', response);
      
      // Handle successful payment
      // For example, redirect to a success page or show a success message
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