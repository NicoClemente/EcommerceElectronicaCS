import React, { useState } from 'react';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import { agregarProducto, obtenerDetallesItem } from '../services/api'; 

const Alta = () => {
  const [formulario, setFormulario] = useState({
    titulo: '',
    precio: '',
    descripcion: '',
    marca: '',
    imagen: '',
    categoria: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [itemAgregado, setItemAgregado] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Agregar el producto
      const respuesta = await agregarProducto(formulario);
      setItemAgregado(respuesta);

      // Obtener detalles del ítem recién agregado
      await obtenerDetallesItem(respuesta);
      
      // Mostrar el modal
      handleMostrarModal();
    } catch (error) {
      console.error('Error al agregar el ítem:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleMostrarModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <Container className='my-3'>
      <h2>Alta de Ítem</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="titulo">
          <Form.Label>Título:</Form.Label>
          <Form.Control
            type="text"
            name="titulo"
            value={formulario.titulo}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="precio">
          <Form.Label>Precio:</Form.Label>
          <Form.Control
            type="text"
            name="precio"
            value={formulario.precio}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="descripcion">
          <Form.Label>Descripción:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descripcion"
            value={formulario.descripcion}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="categoria">
          <Form.Label>Categoría:</Form.Label>
          <Form.Control
            type="text"
            name="categoria"
            value={formulario.categoria}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="marca">
          <Form.Label>Marca:</Form.Label>
          <Form.Control
            type="text"
            name="marca"
            value={formulario.marca}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="imagen">
          <Form.Label>URL de la Imagen:</Form.Label>
          <Form.Control
            type="text"
            name="imagen"
            value={formulario.imagen}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="danger border" className='mt-3 w-100' type="submit" onClick={handleMostrarModal}>
          Agregar Ítem
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Ítem Agregado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {itemAgregado && (
            <div>
              <p>Título: {itemAgregado.titulo}</p>
              <p>Precio: {itemAgregado.precio}</p>
              <p>Descripción: {itemAgregado.descripcion}</p>
              <p>Marca: {itemAgregado.marca}</p>
              <p>Categoría: {itemAgregado.categoria}</p>
              <img src={itemAgregado.imagen} className="img-fluid" alt={itemAgregado.titulo} />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Alta;
