import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import EditModal from "./EditModal.js";

const CardProducto = ({ producto, agregarAlCarrito, recargarProductos }) => {
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleMostrarDetalles = () => {
    setShowDetalleModal(true);
  };

  const handleCerrarDetallesModal = () => {
    setShowDetalleModal(false);
  };

  const handleEditarProducto = () => {
    setShowEditModal(true);
  };

  const handleCerrarEditModal = () => {
    setShowEditModal(false);
  };

  const handleRecargarProductos = () => {
     
    recargarProductos();
  };

  return (
    <Card className="producto-card">
      <div className="image-container">
        <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} className="card-img" />
      </div>
      <Card.Body>
        <Card.Title>{producto.titulo}</Card.Title>
        <Card.Text>Precio: ${producto.precio}</Card.Text>
        <div className="button-container d-flex flex-column align-items-center">
          <Button className="w-100 mt-1" variant="primary" onClick={() => agregarAlCarrito(producto)}>
            Agregar al Carrito
          </Button>
          <Button className="w-100 mt-1" variant="secondary" onClick={handleMostrarDetalles}>
            Más detalles
          </Button>
        </div>
      </Card.Body>

      {/* Botón de edición en la esquina superior izquierda */}
      <Button
        variant="link"
        className="edit-button "
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          backgroundColor: "green",
          padding: "0",
        }}
        onClick={handleEditarProducto}
      >
        ✏️
      </Button>

      {/* Modal para los detalles */}
      <Modal show={showDetalleModal} onHide={handleCerrarDetallesModal}>
        <Modal.Header closeButton>
          <Modal.Title>{producto.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={producto.imagen} className="img-fluid" alt={producto.titulo} />
          <p>Marca: {producto.marca}</p>
          <p>Categoria: {producto.categoria}</p>
          <p>Precio: ${producto.precio}</p>
          <p>Descripción: {producto.descripcion}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => agregarAlCarrito(producto)}>
            Agregar al carrito
          </Button>
          <Button variant="secondary" onClick={handleCerrarDetallesModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para la edición */}
      <EditModal
        producto={producto}
        showModal={showEditModal}
        onClose={() => {
          handleCerrarEditModal();
          handleRecargarProductos();
        }}
      />
    </Card>
  );
};

export default CardProducto;
