import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Tabs, Tab } from "react-bootstrap";
import { actualizarProducto, eliminarProducto, subirImagen } from "../services/api";

const EditModal = ({ producto, showModal, onClose }) => {
  const [formulario, setFormulario] = useState({
    titulo: producto.titulo,
    precio: producto.precio,
    descripcion: producto.descripcion,
    marca: producto.marca,
    imagen: producto.imagen,
    categoria: producto.categoria,
  });
  const [file, setFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState('url');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!file) return;

    try {
      setUploadingImage(true);
      // Esta función debe implementarse en tu archivo api.js
      const imageUrl = await subirImagen(file);
      setFormulario({ ...formulario, imagen: imageUrl });
      setUploadingImage(false);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarProducto(producto._id, formulario);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el ítem:", error);
    }
  };

  const handleBorrarProducto = async (e) => {
    e.preventDefault();
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await eliminarProducto(producto._id);
        console.log("Borrando el item:", producto._id);
        onClose();
      } catch (error) {
        console.error("Error al borrar el ítem:", error);
      }
    }
  };

  return (
    <Modal show={showModal} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="titulo" className="mb-3">
                <Form.Label>Título:<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="titulo"
                  value={formulario.titulo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="precio" className="mb-3">
                <Form.Label>Precio:<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  value={formulario.precio}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="descripcion" className="mb-3">
            <Form.Label>Descripción:<span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={formulario.descripcion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="categoria" className="mb-3">
                <Form.Label>Categoría:<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="categoria"
                  value={formulario.categoria}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="marca" className="mb-3">
                <Form.Label>Marca:<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="marca"
                  value={formulario.marca}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Selector de método de carga de imagen */}
          <Form.Group className="mb-3">
            <Form.Label>Imagen del producto:<span className="text-danger">*</span></Form.Label>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-3"
            >
              <Tab eventKey="url" title="URL externa">
                <Form.Control
                  type="url"
                  name="imagen"
                  value={formulario.imagen}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  required={activeTab === 'url'}
                />
                <Form.Text className="text-muted">
                  Introduce la URL directa de una imagen
                </Form.Text>
              </Tab>
              <Tab eventKey="file" title="Subir archivo">
                <Row>
                  <Col>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required={activeTab === 'file'}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button 
                      onClick={handleImageUpload} 
                      disabled={!file || uploadingImage}
                      variant="outline-primary"
                    >
                      {uploadingImage ? 'Subiendo...' : 'Subir'}
                    </Button>
                  </Col>
                </Row>
                <Form.Text className="text-muted">
                  Sube una imagen desde tu dispositivo
                </Form.Text>
              </Tab>
            </Tabs>
          </Form.Group>

          {/* Vista previa de imagen */}
          {formulario.imagen && (
            <div className="text-center mb-3">
              <p>Vista previa:</p>
              <img 
                src={formulario.imagen} 
                alt="Vista previa" 
                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} 
                className="border p-2"
              />
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleBorrarProducto}>
          Borrar Producto
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;