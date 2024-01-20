import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const PagoMercadoPago = ({ total, onCompletePayment }) => {
  const [tarjeta, setTarjeta] = useState("");
  const [nombreTitular, setNombreTitular] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [cvv, setCVV] = useState("");

  const handlePagar = () => {
    const datosPago = {
      tarjeta,
      nombreTitular,
      fechaVencimiento,
      cvv,
      total,
    };

    onCompletePayment();
  };

  return (
    <Form>
      <Form.Group controlId="tarjeta">
        <Form.Label>Número de tarjeta:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el número de tarjeta"
          value={tarjeta}
          onChange={(e) => setTarjeta(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="nombreTitular">
        <Form.Label>Nombre del titular:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el nombre del titular"
          value={nombreTitular}
          onChange={(e) => setNombreTitular(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="fechaVencimiento">
        <Form.Label>Fecha de vencimiento:</Form.Label>
        <Form.Control
          type="text"
          placeholder="MM/AA"
          value={fechaVencimiento}
          onChange={(e) => setFechaVencimiento(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="cvv">
        <Form.Label>Código de seguridad (CVV):</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el CVV"
          value={cvv}
          onChange={(e) => setCVV(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={handlePagar}>
        Pagar
      </Button>
    </Form>
  );
};

export default PagoMercadoPago;
