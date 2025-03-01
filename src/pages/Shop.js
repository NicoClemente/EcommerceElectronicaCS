import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Spinner, Form, InputGroup, Button } from 'react-bootstrap';
import CardProducto from '../components/CardProducto';
import { obtenerProductos } from '../services/api';
import { isAdmin } from '../utils/roleUtils';
import { Link } from 'react-router-dom';

const Shop = ({ agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [recargarProductos, setRecargarProductos] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [ordenarPor, setOrdenarPor] = useState('');
  
  const userIsAdmin = isAdmin();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productosData = await obtenerProductos();
        setProductos(productosData);
        obtenerCategorias(productosData);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [recargarProductos]);

  const obtenerCategorias = (productos) => {
    const categoriasUnicas = [...new Set(productos.map((producto) => producto.categoria))];
    setCategorias(categoriasUnicas);
  };

  const filtrarPorCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const resetearFiltro = () => {
    setCategoriaSeleccionada(null);
  };

  // Filtrar productos por categoría y búsqueda
  let productosFiltrados = productos;
  
  if (categoriaSeleccionada) {
    productosFiltrados = productosFiltrados.filter(
      (producto) => producto.categoria === categoriaSeleccionada
    );
  }
  
  if (busqueda) {
    const terminoBusqueda = busqueda.toLowerCase();
    productosFiltrados = productosFiltrados.filter(
      (producto) => 
        producto.titulo.toLowerCase().includes(terminoBusqueda) ||
        (producto.descripcion && producto.descripcion.toLowerCase().includes(terminoBusqueda)) ||
        (producto.marca && producto.marca.toLowerCase().includes(terminoBusqueda))
    );
  }
  
  // Ordenar productos
  if (ordenarPor === 'precioAsc') {
    productosFiltrados = [...productosFiltrados].sort((a, b) => a.precio - b.precio);
  } else if (ordenarPor === 'precioDesc') {
    productosFiltrados = [...productosFiltrados].sort((a, b) => b.precio - a.precio);
  } else if (ordenarPor === 'nombreAsc') {
    productosFiltrados = [...productosFiltrados].sort((a, b) => 
      a.titulo.localeCompare(b.titulo));
  }

  return (
    <Container fluid className="py-4">
      <Row>
        <Col lg={3} md={4}>
          <div className="sidebar-filter p-3 bg-light rounded shadow-sm mb-4">
            <h4 className="mb-3">Categorías</h4>
            
            <ListGroup variant="flush">
              <ListGroup.Item
                action
                active={!categoriaSeleccionada}
                onClick={resetearFiltro}
                className="d-flex justify-content-between align-items-center"
              >
                <span>Todos los productos</span>
                <span className="badge bg-primary rounded-pill">{productos.length}</span>
              </ListGroup.Item>
              
              {categorias.map((categoria) => (
                <ListGroup.Item
                  key={categoria}
                  action
                  active={categoria === categoriaSeleccionada}
                  onClick={() => filtrarPorCategoria(categoria)}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>{categoria}</span>
                  <span className="badge bg-primary rounded-pill">
                    {productos.filter((producto) => producto.categoria === categoria).length}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
            
            {userIsAdmin && (
              <div className="mt-4">
                <Link 
                  to="/alta" 
                  className="btn btn-success w-100"
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Agregar nuevo producto
                </Link>
              </div>
            )}
          </div>
        </Col>
        
        <Col lg={9} md={8}>
          <div className="mb-4">
            <h2 className="mb-3">Nuestros Productos</h2>
            
            <Row className="mb-4">
              <Col md={6} className="mb-3 mb-md-0">
                <InputGroup>
                  <Form.Control
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                  <Button variant="outline-secondary">
                    <i className="bi bi-search"></i>
                  </Button>
                </InputGroup>
              </Col>
              
              <Col md={6}>
                <Form.Select 
                  value={ordenarPor}
                  onChange={(e) => setOrdenarPor(e.target.value)}
                >
                  <option value="">Ordenar por</option>
                  <option value="precioAsc">Precio: De menor a mayor</option>
                  <option value="precioDesc">Precio: De mayor a menor</option>
                  <option value="nombreAsc">Nombre: A-Z</option>
                </Form.Select>
              </Col>
            </Row>
            
            {loading ? (
              <div className="d-flex justify-content-center my-5 py-5">
                <div className="text-center">
                  <Spinner animation="border" variant="primary" className="mb-3" />
                  <h5 className="text-muted">Cargando productos...</h5>
                </div>
              </div>
            ) : productosFiltrados.length > 0 ? (
              <Row>
                {productosFiltrados.map((producto) => (
                  <Col lg={4} md={6} className="mb-4" key={producto._id}>
                    <CardProducto
                      producto={producto}
                      agregarAlCarrito={agregarAlCarrito}
                      recargarProductos={() => setRecargarProductos((prev) => !prev)}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center py-5 my-4 bg-light rounded">
                <i className="bi bi-search" style={{ fontSize: "2rem" }}></i>
                <h4 className="mt-3">No se encontraron productos</h4>
                <p className="text-muted">
                  Intenta con otra búsqueda o categoría
                </p>
                <Button 
                  variant="outline-primary" 
                  onClick={() => {
                    setBusqueda('');
                    setCategoriaSeleccionada(null);
                  }}
                >
                  Ver todos los productos
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;