import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import CardProducto from '../components/CardProducto';
import { obtenerProductos } from '../services/api'; 


const Shop = ({ agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [recargarProductos, setRecargarProductos] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosData = await obtenerProductos(); 
        setProductos(productosData);
        obtenerCategorias(productosData);
      } catch (error) {
        console.error('Error al obtener productos:', error);
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

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter((producto) => producto.categoria === categoriaSeleccionada)
    : productos;

  return (
    <Container className='my-3'>
      <Row>
        <Col md={3} >
          {/* Tab lateral con la cantidad de objetos por categoría */}
          <ListGroup >
            <ListGroup.Item className='bg-danger border-0 '
              key="todos"
              active={!categoriaSeleccionada}
              onClick={resetearFiltro}
            >
              Todos ({productos.length})
            </ListGroup.Item>
            {categorias.map((categoria) => (
              <ListGroup.Item
                key={categoria}
                active={categoria === categoriaSeleccionada}
                onClick={() => filtrarPorCategoria(categoria)}
              >
                {categoria} ({productos.filter((producto) => producto.categoria === categoria).length})
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={9}>
          {/* Mostrar productos filtrados o todos */}
          <h2>Todos los Productos</h2>
          <Row>
            {productosFiltrados.map((producto) => (
              <Col key={producto._id} md={4} className="mb-4">
                <CardProducto
                  key={producto.id}
                  producto={producto}
                  agregarAlCarrito={agregarAlCarrito}
                  recargarProductos={() => setRecargarProductos((prev) => !prev)}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
