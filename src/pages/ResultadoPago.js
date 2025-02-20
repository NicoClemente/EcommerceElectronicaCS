import React, { useEffect, useState } from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { verificarPago } from '../services/api';

const ResultadoPago = () => {
  const { status } = useParams();
  const [mensaje, setMensaje] = useState('');
  const [variant, setVariant] = useState('info');

  useEffect(() => {
    const verificarEstadoPago = async () => {
      try {
        const resultado = await verificarPago(status);
        if (resultado.success) {
          setMensaje('¡Pago verificado con éxito!');
          setVariant('success');
        } else {
          setMensaje('Hubo un problema al verificar el pago.');
          setVariant('danger');
        }
      } catch (error) {
        setMensaje('Error al verificar el pago.');
        setVariant('danger');
      }
    };

    verificarEstadoPago();
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