import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { agregarProducto, obtenerDetallesItem } from '../services/api';
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
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [itemAgregado, setItemAgregado] = useState(null);
  // Cambiado de useState a una constante para evitar el warning
  const categorias = [
    'Computadoras', 'Smartphones', 'Electrodomésticos', 'Audio', 'Televisores', 'Accesorios'
  ];

  // Verificar si el usuario es administrador
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
      
      // Resetear el formulario después de un tiempo
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

                <Form.Group className="mb-3">
                  <Form.Label>URL de la Imagen</Form.Label>
                  <Form.Control
                    type="url"
                    name="imagen"
                    value={formulario.imagen}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    disabled={loading}
                  />
                  <Form.Text className="text-muted">
                    Ingrese la URL de una imagen para el producto
                  </Form.Text>
                </Form.Group>

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