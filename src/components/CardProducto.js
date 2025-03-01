import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Badge } from "react-bootstrap";
import EditModal from "./EditModal.js";
import { isAdmin } from "../utils/roleUtils"; // Importamos la función de verificación

const CardProducto = ({ producto, agregarAlCarrito, recargarProductos }) => {
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  // Verificar si el usuario es administrador al cargar el componente
  useEffect(() => {
    const checkAdminStatus = () => {
      const adminStatus = isAdmin();
      console.log("CardProducto - Es administrador:", adminStatus);
      setUserIsAdmin(adminStatus);
    };

    checkAdminStatus();

    // Escuchar cambios en el localStorage
    window.addEventListener('storage', checkAdminStatus);
    return () => {
      window.removeEventListener('storage', checkAdminStatus);
    };
  }, []);

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

  const handleAgregarAlCarrito = () => {
    const productoConCantidad = { ...producto, cantidad };
    agregarAlCarrito(productoConCantidad);
    setCantidad(1); // Resetear la cantidad después de agregar
  };

  return (
    <Card className="h-100 shadow-sm hover-effect">
      {producto.categoria && (
        <Badge
          bg="primary"
          className="position-absolute m-2"
          style={{ top: 0, right: 0, zIndex: 1 }}
        >
          {producto.categoria}
        </Badge>
      )}

      <div className="image-container p-3 text-center">
        <Card.Img
          variant="top"
          src={producto.imagen}
          alt={producto.titulo}
          className="product-image"
          style={{ height: "180px", objectFit: "contain" }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-0 h5">{producto.titulo}</Card.Title>
        {producto.marca && (
          <small className="text-muted mb-2">{producto.marca}</small>
        )}

        <Card.Text className="text-primary fw-bold mb-3 fs-5">
          ${producto.precio}
        </Card.Text>

        <div className="mt-auto">
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              onClick={handleAgregarAlCarrito}
              className="fw-bold"
            >
              Agregar al Carrito
            </Button>

            <Button
              variant="outline-secondary"
              onClick={handleMostrarDetalles}
              size="sm"
            >
              Ver detalles
            </Button>
          </div>
        </div>
      </Card.Body>

      {/* Botón de edición - Visible sólo para administradores */}
      {userIsAdmin && (
        <Button
          variant="" 
          className="position-absolute d-flex align-items-center justify-content-center"
          style={{
            top: "10px",
            left: "10px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            padding: "0",
            zIndex: 2
          }}
          onClick={handleEditarProducto}
        >
          ✏️  
        </Button>
      )}

      {/* Modal de detalles */}
      <Modal
        show={showDetalleModal}
        onHide={handleCerrarDetallesModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{producto.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-5 text-center">
              <img
                src={producto.imagen}
                className="img-fluid rounded mb-3"
                alt={producto.titulo}
                style={{ maxHeight: "300px", objectFit: "contain" }}
              />
            </div>
            <div className="col-md-7">
              <h4 className="text-primary mb-3">${producto.precio}</h4>

              <div className="mb-3">
                <Badge bg="secondary" className="me-2">Marca: {producto.marca || 'No especificada'}</Badge>
                <Badge bg="info">Categoría: {producto.categoria || 'No especificada'}</Badge>
              </div>

              <h5>Descripción:</h5>
              <p>{producto.descripcion || 'Sin descripción disponible'}</p>

              <div className="d-flex align-items-center mt-4">
                <div className="input-group me-3" style={{ maxWidth: "150px" }}>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  >
                    -
                  </Button>
                  <input
                    type="number"
                    className="form-control text-center"
                    value={cantidad}
                    onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setCantidad(cantidad + 1)}
                  >
                    +
                  </Button>
                </div>

                <Button
                  variant="primary"
                  className="flex-grow-1"
                  onClick={() => {
                    handleAgregarAlCarrito();
                    handleCerrarDetallesModal();
                  }}
                >
                  Agregar al carrito
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal de edición - Solo se renderiza si el usuario es admin */}
      {userIsAdmin && (
        <EditModal
          producto={producto}
          showModal={showEditModal}
          onClose={() => {
            handleCerrarEditModal();
            handleRecargarProductos();
          }}
        />
      )}
    </Card>
  );
};

export default CardProducto;