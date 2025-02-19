import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { procesarPago } from "../services/api";

const PagoMercadoPago = ({ total, items, onCompletePayment }) => {
  const [tarjeta, setTarjeta] = useState("");
  const [nombreTitular, setNombreTitular] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [cvv, setCVV] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePagar = async () => {
    if (!tarjeta || !nombreTitular || !fechaVencimiento || !cvv) {
      setError("Por favor, complete todos los campos");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const datosPago = {
        tarjeta,
        nombreTitular,
        fechaVencimiento,
        cvv,
        total,
        items
      };

      // Procesar pago con el backend
      const response = await procesarPago(datosPago);

      if (response.success) {
        window.location.href = response.url;
        if (onCompletePayment) {
          onCompletePayment(response.transactionId);
        }
      } else {
        setError('Error al procesar el pago');
      }
    } catch (error) {
      setError('Error al conectar con el servicio de pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form className="mt-4">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <h3 className="mb-4">Total a pagar: ${total}</h3>

      <Form.Group controlId="tarjeta" className="mb-3">
        <Form.Label>Número de tarjeta:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el número de tarjeta"
          value={tarjeta}
          onChange={(e) => setTarjeta(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="nombreTitular" className="mb-3">
        <Form.Label>Nombre del titular:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el nombre del titular"
          value={nombreTitular}
          onChange={(e) => setNombreTitular(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="fechaVencimiento" className="mb-3">
        <Form.Label>Fecha de vencimiento:</Form.Label>
        <Form.Control
          type="text"
          placeholder="MM/AA"
          value={fechaVencimiento}
          onChange={(e) => setFechaVencimiento(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="cvv" className="mb-3">
        <Form.Label>Código de seguridad (CVV):</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el CVV"
          value={cvv}
          onChange={(e) => setCVV(e.target.value)}
          maxLength="4"
        />
      </Form.Group>

      <Button 
        variant="primary" 
        onClick={handlePagar}
        disabled={loading}
        className="mercadopago-button w-100"
      >
        {loading ? 'Procesando...' : 'Pagar con MercadoPago'}
      </Button>

      <div className="text-center mt-3">
        <img 
          src="/mercadopago-logo.png" 
          alt="MercadoPago" 
          style={{ height: '30px' }}
        />
        <p className="text-muted mt-2">
          Pago seguro procesado por MercadoPago
        </p>
      </div>
    </Form>
  );
};

export default PagoMercadoPago;