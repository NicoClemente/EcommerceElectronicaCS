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
      // Validar que el carrito no esté vacío
      if (!carrito || carrito.length === 0) {
        throw new Error('El carrito está vacío');
      }

      const paymentData = {
        items: carrito.map(item => ({
          title: item.titulo,
          unit_price: Number(item.precio),
          quantity: Number(item.cantidad),
          currency_id: "ARS"
        }))
      };
  
      console.log('Datos del pago a enviar:', paymentData);
      
      // Validar que los items tengan los datos necesarios
      const invalidItems = paymentData.items.filter(item => 
        !item.title || !item.unit_price || !item.quantity
      );
      
      if (invalidItems.length > 0) {
        throw new Error('Algunos productos no tienen la información completa');
      }
  
      const response = await procesarPago(paymentData);
      console.log('Respuesta de MercadoPago:', response);
      
      if (response && response.init_point) {
        // Redirigir a MercadoPago
        window.location.href = response.init_point;
      } else {
        throw new Error('No se recibió la URL de pago de MercadoPago');
      }
  
    } catch (error) {
      console.error('Error completo al procesar pago:', error);
      setError(error.message || 'Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pago-mercadopago">
      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Button 
          type="submit" 
          disabled={loading || !carrito || carrito.length === 0}
          className="w-100 py-2"
          style={{ 
            backgroundColor: '#009ee3', 
            borderColor: '#009ee3',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Procesando...
            </>
          ) : (
            <>
              <i className="bi bi-credit-card me-2"></i>
              Pagar con Mercado Pago ${total}
            </>
          )}
        </Button>
      </Form>
      
      <div className="text-center mt-2">
        <small className="text-muted">
          Serás redirigido a MercadoPago para completar el pago
        </small>
      </div>
    </div>
  );
};

export default PagoMercadoPago;