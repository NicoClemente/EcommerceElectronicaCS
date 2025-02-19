// src/pages/ResultadoPago.js
import React, { useEffect, useState } from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { verificarPago } from '../services/api';

const ResultadoPago = () => {
  const { status } = useParams();
  const [mensaje, setMensaje] = useState('');
  const [variant, setVariant] = useState('info');

  useEffect(() => {
    switch (status) {
      case 'success':
        setMensaje('¡Pago realizado con éxito!');
        setVariant('success');
        break;
      case 'pending':
        setMensaje('El pago está pendiente de confirmación');
        setVariant('warning');
        break;
      case 'failure':
        setMensaje('El pago no pudo ser procesado');
        setVariant('danger');
        break;
      default:
        setMensaje('Estado de pago desconocido');
        setVariant('info');
    }
  }, [status]);

  return (
    <Container className="mt-5">
      <Alert variant={variant}>
        <Alert.Heading>Estado del Pago</Alert.Heading>
        <p>{mensaje}</p>
      </Alert>
      <Button as={Link} to="/shop" variant="primary">
        Volver a la tienda
      </Button>
    </Container>
  );
};

export default ResultadoPago;