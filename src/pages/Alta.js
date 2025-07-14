import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert, Spinner, Tabs, Tab } from 'react-bootstrap';
import { agregarProducto, obtenerDetallesItem, subirImagen } from '../services/api';
import { isAdmin } from '../utils/roleUtils';
import { useNavigate } from 'react-router-dom';

const Alta = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    titulo: '',
    precio: '',
    descripcion: '',
    marca: '',
    imagen: '',
    categoria: '',
    destacado: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [itemAgregado, setItemAgregado] = useState(null);
  const [activeTab, setActiveTab] = useState('url');
  const [file, setFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const categorias = [
    'Computadoras', 'Smartphones', 'Electrodomésticos', 'Audio', 'Televisores', 'Accesorios'
  ];

  // Verifica si el usuario es administrador
  useEffect(() => {
    const userIsAdmin = isAdmin();
    console.log("Es administrador:", userIsAdmin);
    if (!userIsAdmin) {
      setError('No tienes permisos para acceder a esta página');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [navigate]);

  const handleImageUpload = async () => {
    if (!file) return;

    try {
      setUploadingImage(true);
      const imageUrl = await subirImagen(file);
      setFormulario({ ...formulario, imagen: imageUrl });
      setUploadingImage(false);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setError('Error al subir la imagen');
      setUploadingImage(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones básicas
    if (!formulario.titulo) {
      setError('El título es obligatorio');
      setLoading(false);
      return;
    }

    if (!formulario.precio || isNaN(formulario.precio)) {
      setError('El precio debe ser un número válido');
      setLoading(false);
      return;
    }

    try {
      const respuesta = await agregarProducto(formulario);
      setItemAgregado(respuesta);
      await obtenerDetallesItem(respuesta);
      setSuccess(true);

      setTimeout(() => {
        setFormulario({
          titulo: '',
          precio: '',
          descripcion: '',
          marca: '',
          imagen: '',
          categoria: '',
        });
        setSuccess(false);
        setItemAgregado(null);
      }, 3000);

    } catch (error) {
      console.error('Error al agregar el ítem:', error);
      setError('Error al agregar el producto. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  if (error === 'No tienes permisos para acceder a esta página') {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Acceso denegado</Alert.Heading>
          <p>No tienes permisos para acceder a esta página. Serás redirigido a la página principal.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className='py-4'>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">Agregar Nuevo Producto</h3>
            </Card.Header>
            <Card.Body>
              {error && error !== 'No tienes permisos para acceder a esta página' && (
                <Alert variant="danger" onClose={() => setError('')} dismissible>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
                  <Alert.Heading>¡Producto agregado exitosamente!</Alert.Heading>
                  <p>El producto {itemAgregado?.titulo} ha sido agregado al catálogo.</p>
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Título</Form.Label>
                      <Form.Control
                        type="text"
                        name="titulo"
                        value={formulario.titulo}
                        onChange={handleChange}
                        placeholder="Nombre del producto"
                        disabled={loading}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Precio</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        name="precio"
                        value={formulario.precio}
                        onChange={handleChange}
                        placeholder="0.00"
                        disabled={loading}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Marca</Form.Label>
                      <Form.Control
                        type="text"
                        name="marca"
                        value={formulario.marca}
                        onChange={handleChange}
                        placeholder="Marca del producto"
                        disabled={loading}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Categoría</Form.Label>
                      <Form.Select
                        name="categoria"
                        value={formulario.categoria}
                        onChange={handleChange}
                        disabled={loading}
                      >
                        <option value="">Seleccionar categoría</option>
                        {categorias.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="destacado" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Producto destacado (aparecerá en la página principal)"
                    name="destacado"
                    checked={formulario.destacado}
                    onChange={(e) => setFormulario({ ...formulario, destacado: e.target.checked })}
                    disabled={loading}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Imagen del producto</Form.Label>
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
                        disabled={loading}
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
                            disabled={loading}
                          />
                        </Col>
                        <Col xs="auto">
                          <Button
                            onClick={handleImageUpload}
                            disabled={!file || uploadingImage || loading}
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

                <Form.Group className="mb-4">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="descripcion"
                    value={formulario.descripcion}
                    onChange={handleChange}
                    placeholder="Describa las características del producto"
                    disabled={loading}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="py-2"
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Agregando producto...
                      </>
                    ) : (
                      'Agregar Producto'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {itemAgregado && (
            <Card className="mt-4 shadow-sm">
              <Card.Header className="bg-success text-white">
                <h4 className="mb-0">Vista previa del producto agregado</h4>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4} className="text-center">
                    <img
                      src={itemAgregado.imagen}
                      alt={itemAgregado.titulo}
                      className="img-fluid mb-3"
                      style={{ maxHeight: "200px", objectFit: "contain" }}
                    />
                  </Col>
                  <Col md={8}>
                    <h4>{itemAgregado.titulo}</h4>
                    <p className="text-primary fs-5">${itemAgregado.precio}</p>

                    <div className="mb-2">
                      <small className="text-muted">Marca: {itemAgregado.marca}</small>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Categoría: {itemAgregado.categoria}</small>
                    </div>

                    <p>{itemAgregado.descripcion}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Alta;