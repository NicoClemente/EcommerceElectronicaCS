import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { procesarPago } from '../services/api';

const PagoMercadoPago = ({ total, carrito }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const paymentData = {
        items: carrito.map(item => ({
          titulo: item.titulo,
          cantidad: Number(item.cantidad),
          precio: Number(item.precio)
        })),
        total: Number(total),
        direccionEntrega
      };
  
      console.log('Enviando datos:', paymentData);
  
      const response = await procesarPago(paymentData);
      
      if (response.init_point) {
        window.location.href = response.init_point;
      } else {
        throw new Error('No se recibió la URL de pago');
      }
  
    } catch (error) {
      console.error('Error completo:', error);
      setError(error.message || 'Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      
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