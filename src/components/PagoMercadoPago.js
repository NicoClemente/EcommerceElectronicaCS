import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { procesarPago } from '../services/api';

const PagoMercadoPago = ({ total, carrito }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDebugInfo(null);
  
    try {
      console.log('🚀 Iniciando proceso de pago');
      console.log('💰 Total:', total);
      console.log('🛒 Carrito:', carrito);

      // Validaciones del frontend
      if (!carrito || carrito.length === 0) {
        throw new Error('El carrito está vacío');
      }

      // Verificar que todos los productos tengan los datos necesarios
      const productosInvalidos = carrito.filter(item => 
        !item.titulo || !item.precio || !item.cantidad
      );

      if (productosInvalidos.length > 0) {
        console.error('❌ Productos con datos faltantes:', productosInvalidos);
        throw new Error(`${productosInvalidos.length} productos tienen datos incompletos`);
      }

      const paymentData = {
        items: carrito.map(item => {
          const processedItem = {
            title: String(item.titulo).trim(),
            unit_price: Number(item.precio),
            quantity: Number(item.cantidad),
            currency_id: "ARS"
          };
          
          console.log('📦 Item procesado:', processedItem);
          return processedItem;
        })
      };
  
      console.log('📨 Datos finales a enviar:', JSON.stringify(paymentData, null, 2));
      
      setDebugInfo('Procesando la compra...');
  
      const response = await procesarPago(paymentData);
      
      console.log('✅ Respuesta recibida del backend:', response);
      setDebugInfo('Redirigiendo a MercadoPago...');
      
      if (response && response.init_point) {
        console.log('🔗 Redirigiendo a:', response.init_point);
        
        setTimeout(() => {
          window.location.href = response.init_point;
        }, 1000);
      } else {
        console.error('❌ Respuesta sin URL de pago:', response);
        throw new Error('No se recibió la URL de pago de MercadoPago');
      }
  
    } catch (error) {
      console.error('❌ Error completo:', error);
      setError(error.message || 'Error al procesar el pago');
      setDebugInfo(null);
    } finally {
      if (!error) {
        setTimeout(() => setLoading(false), 2000);
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <div className="pago-mercadopago">
      {error && (
        <Alert variant="danger" className="mb-3">
          <Alert.Heading>Error al procesar el pago</Alert.Heading>
          <p>{error}</p>
          <hr />
          <p className="mb-0">
            <small>Si el problema persiste, verifica tu conexión e intenta nuevamente.</small>
          </p>
        </Alert>
      )}
      
      {debugInfo && !error && (
        <Alert variant="info" className="mb-3">
          <small>{debugInfo}</small>
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        <div className="mb-3 p-3 bg-light rounded">
          <h6 className="mb-2">Resumen del pago:</h6>
          <ul className="list-unstyled mb-0">
            {carrito && carrito.map((item, index) => (
              <li key={index} className="d-flex justify-content-between">
                <span>{item.titulo} x{item.cantidad}</span>
                <span>${(item.precio * item.cantidad).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span>${total}</span>
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={loading || !carrito || carrito.length === 0}
          className="w-100 py-3"
          style={{ 
            backgroundColor: '#009ee3', 
            borderColor: '#009ee3',
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              {debugInfo || 'Procesando pago...'}
            </>
          ) : (
            <>
              <i className="bi bi-credit-card me-2"></i>
              Pagar con Mercado Pago
            </>
          )}
        </Button>
      </Form>
      
      <div className="text-center mt-3">
        <small className="text-muted">
          🔒 Pago seguro con MercadoPago
        </small>
      </div>
      
    </div>
  );
};

export default PagoMercadoPago;