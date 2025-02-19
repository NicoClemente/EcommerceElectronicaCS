import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const Contacto = () => {
  const handleEnviarCorreo = () => {
    window.location.href = 'mailto:contacto@tuempresa.com';
  };

  return (
    <Container className="mt-5 my-3">
      <h2 className="mb-4">Contacto</h2>
      <p className="mb-4">¡Estamos encantados de escucharte! Por favor, completa el formulario a continuación:</p>

      <Form>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu nombre" required />
        </Form.Group>

        <Form.Group controlId="correo">
          <Form.Label>Correo electrónico:</Form.Label>
          <Form.Control type="email" placeholder="Ingresa tu correo electrónico" required />
        </Form.Group>

        <Form.Group controlId="mensaje">
          <Form.Label>Mensaje:</Form.Label>
          <Form.Control as="textarea" rows={4} placeholder="Ingresa tu mensaje" required />
        </Form.Group>

        <Button variant="dark border" className='w-100 mt-3 fs-3' type="button" onClick={handleEnviarCorreo}>
          Enviar correo
        </Button>
      </Form>
    </Container>
  );
};

export default Contacto;