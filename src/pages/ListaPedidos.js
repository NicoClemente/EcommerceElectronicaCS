import React, { useEffect, useState } from "react";
import { Table, Container, Card, Badge, Row, Col, Spinner, Alert } from "react-bootstrap";
import { obtenerCarrito } from "../services/api";
import { useAuth } from '../context/AuthContext';

const ListaPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setLoading(true);
        const carritoData = await obtenerCarrito();
        
        // Filtrar pedidos por usuario
        const pedidosFiltrados = user 
          ? carritoData.filter(pedido => pedido.usuario && pedido.usuario._id === user._id)
          : [];
        
        setPedidos(pedidosFiltrados || []);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        setError("No se pudieron cargar los pedidos. Por favor, intente nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [user]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Cargando tus pedidos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Debes iniciar sesión para ver tus pedidos.
        </Alert>
      </Container>
    );
  }

  if (pedidos.length === 0) {
    return (
      <Container className="py-5">
        <h2 className="mb-4">Mis Pedidos</h2>
        <Card className="text-center shadow-sm">
          <Card.Body className="p-5">
            <div className="mb-4">
              <i className="bi bi-bag" style={{ fontSize: "3rem", color: "#6c757d" }}></i>
            </div>
            <Card.Title className="mb-3">No tienes pedidos aún</Card.Title>
            <Card.Text className="text-muted">
              Cuando realices compras, podrás ver el historial aquí.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Mis Pedidos</h2>
      
      <Row>
        {pedidos.map((pedido) => (
          <Col xs={12} className="mb-4" key={pedido._id}>
            <Card className="shadow-sm">
              <Card.Header className="bg-light">
                <Row className="align-items-center">
                  <Col>
                    <h5 className="mb-0">Pedido #{pedido._id.substring(pedido._id.length - 8)}</h5>
                    <small className="text-muted">
                      {new Date(pedido.createdAt || Date.now()).toLocaleDateString()} 
                      {new Date(pedido.createdAt || Date.now()).toLocaleTimeString()}
                    </small>
                  </Col>
                  <Col xs="auto">
                    <Badge bg="success" className="py-2 px-3">
                      Completado
                    </Badge>
                  </Col>
                </Row>
              </Card.Header>
              
              <Card.Body>
                <h6 className="mb-3">Productos</h6>
                <div className="table-responsive">
                  <Table hover>
                    <thead className="table-light">
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th className="text-end">Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedido.items && pedido.items.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              {item.productoId.imagen && (
                                <img 
                                  src={item.productoId.imagen} 
                                  alt={item.productoId.titulo} 
                                  style={{ 
                                    width: "40px", 
                                    height: "40px", 
                                    objectFit: "contain" 
                                  }}
                                  className="me-2"
                                />
                              )}
                              <span>{item.productoId.titulo}</span>
                            </div>
                          </td>
                          <td>{item.cantidad}</td>
                          <td className="text-end">
                            ${(item.productoId.precio * item.cantidad).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="table-light">
                      <tr>
                        <td colSpan="2" className="text-end fw-bold">Total:</td>
                        <td className="text-end fw-bold">${pedido.total || "0.00"}</td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
                
                <div className="mt-4">
                  <h6 className="mb-3">Dirección de Entrega</h6>
                  <Card className="bg-light">
                    <Card.Body>
                      <p className="mb-1">
                        <i className="bi bi-geo-alt me-2"></i>
                        {pedido.direccionEntrega
                          ? `${pedido.direccionEntrega.calle || ""}`
                          : "Dirección no disponible"}
                      </p>
                      {pedido.direccionEntrega && (
                        <p className="mb-1">
                          {`${pedido.direccionEntrega.ciudad || ""} - CP: ${pedido.direccionEntrega.codigoPostal || ""}`}
                        </p>
                      )}
                      {pedido.direccionEntrega?.telefono && (
                        <p className="mb-0">
                          <i className="bi bi-telephone me-2"></i>
                          {pedido.direccionEntrega.telefono}
                        </p>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListaPedidos;