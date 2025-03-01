import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import PagoMercadoPago from "../components/PagoMercadoPago";
import { agregarAlCarrito } from "../services/api";
import { Link } from "react-router-dom";

const CarritoCompra = ({ carrito, eliminarDelCarrito }) => {
  const [itemsCarrito, setItemsCarrito] = useState(carrito);
  const [direccionEntrega, setDireccionEntrega] = useState({
    calle: "",
    ciudad: "",
    codigoPostal: "",
    telefono: "",
    instrucciones: "",
  });
  const [mostrarSeccionPago, setMostrarSeccionPago] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calcular precio total y cantidad total
  const precioTotal = itemsCarrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );
  
  const cantidadTotal = itemsCarrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const handleActualizarCantidad = (itemId, cantidad) => {
    if (cantidad < 1) return; // No permitir cantidades menores a 1
    
    const nuevosItems = itemsCarrito.map((item) =>
      item._id === itemId ? { ...item, cantidad } : item
    );
    setItemsCarrito(nuevosItems);
  };

  const handleActualizarDireccion = (e) => {
    const { name, value } = e.target;
    setDireccionEntrega((prevDireccion) => ({
      ...prevDireccion,
      [name]: value,
    }));
  };

  const handleEliminar = (productoId) => {
    eliminarDelCarrito(productoId);
    setItemsCarrito(itemsCarrito.filter((item) => item._id !== productoId));
  };

  const handleRealizarPedido = async () => {
    // Validar que la dirección esté completa
    if (!direccionEntrega.calle || !direccionEntrega.ciudad || !direccionEntrega.codigoPostal) {
      setError("Por favor complete los campos obligatorios de la dirección de entrega");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const datosPedido = {
        items: itemsCarrito.map((item) => ({
          productoId: item._id,
          cantidad: item.cantidad,
        })),
        direccionEntrega,
        total: precioTotal.toFixed(2),
      };

      const response = await agregarAlCarrito(datosPedido);
      console.log("Respuesta del servidor:", response);
      setMostrarSeccionPago(true);
      setLoading(false);
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
      setError("Error al procesar el pedido. Por favor intente nuevamente.");
      setLoading(false);
    }
  };

  const handleCompletarPago = () => {
    setItemsCarrito([]);
    setDireccionEntrega({
      calle: "",
      ciudad: "",
      codigoPostal: "",
      telefono: "",
      instrucciones: "",
    });
    setMostrarSeccionPago(false);
    eliminarDelCarrito("all"); // Limpiar todo el carrito
  };

  if (itemsCarrito.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="text-center shadow-sm">
              <Card.Body className="p-5">
                <div className="mb-4">
                  <i className="bi bi-cart-x" style={{ fontSize: "3rem", color: "#6c757d" }}></i>
                </div>
                <Card.Title className="mb-3 fs-3">Tu carrito está vacío</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Parece que aún no has agregado productos a tu carrito de compras.
                </Card.Text>
                <Link to="/shop" className="btn btn-primary btn-lg">
                  Ir a la tienda
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Tu Carrito de Compra</h2>
      
      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}
      
      <Row>
        {/* Listado de productos en el carrito */}
        <Col lg={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Productos ({cantidadTotal})</h5>
            </Card.Header>
            
            <Card.Body className="p-0">
              {itemsCarrito.map((item) => (
                <div 
                  key={item._id} 
                  className="cart-item d-flex p-3 border-bottom"
                >
                  <div className="cart-item-image me-3">
                    <img
                      src={item.imagen}
                      alt={item.titulo}
                      style={{ width: "80px", height: "80px", objectFit: "contain" }}
                    />
                  </div>
                  
                  <div className="cart-item-details flex-grow-1">
                    <h5 className="mb-1">{item.titulo}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="mb-0 text-primary fw-bold">${item.precio}</p>
                        
                        <div className="quantity-control mt-2 d-flex align-items-center">
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleActualizarCantidad(item._id, item.cantidad - 1)}
                          >
                            <i className="bi bi-dash"></i>
                          </Button>
                          
                          <Form.Control
                            type="number"
                            min="1"
                            value={item.cantidad}
                            onChange={(e) => handleActualizarCantidad(item._id, parseInt(e.target.value, 10) || 1)}
                            className="text-center mx-2"
                            style={{ width: "60px" }}
                          />
                          
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleActualizarCantidad(item._id, item.cantidad + 1)}
                          >
                            <i className="bi bi-plus"></i>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-end">
                        <p className="mb-2 fw-bold">${(item.precio * item.cantidad).toFixed(2)}</p>
                        <Button
                          variant="link"
                          className="text-danger p-0"
                          onClick={() => handleEliminar(item._id)}
                        >
                          <i className="bi bi-trash"></i> Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
            
            <Card.Footer className="bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <Link to="/shop" className="btn btn-outline-primary">
                  <i className="bi bi-arrow-left me-2"></i>
                  Seguir comprando
                </Link>
                <div className="text-end">
                  <p className="mb-0 text-muted">Subtotal</p>
                  <h4 className="mb-0">${precioTotal.toFixed(2)}</h4>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>

        {/* Formulario de dirección de entrega y pago */}
        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Detalles de Entrega</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Dirección <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="calle"
                    value={direccionEntrega.calle}
                    onChange={handleActualizarDireccion}
                    placeholder="Calle, número, piso, departamento"
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Ciudad <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="ciudad"
                        value={direccionEntrega.ciudad}
                        onChange={handleActualizarDireccion}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>C.P. <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="codigoPostal"
                        value={direccionEntrega.codigoPostal}
                        onChange={handleActualizarDireccion}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Teléfono de contacto<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={direccionEntrega.telefono}
                    onChange={handleActualizarDireccion}
                    placeholder="Para coordinar la entrega"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Instrucciones adicionales</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="instrucciones"
                    value={direccionEntrega.instrucciones}
                    onChange={handleActualizarDireccion}
                    placeholder="Indicaciones para el repartidor, horarios, etc."
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Resumen del Pedido</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${precioTotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Envío</span>
                <span>Gratis</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total</strong>
                <h4 className="mb-0">${precioTotal.toFixed(2)}</h4>
              </div>
              
              {!mostrarSeccionPago ? (
                <Button
                  variant="primary"
                  className="w-100 py-2 fw-bold"
                  onClick={handleRealizarPedido}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Procesando...
                    </>
                  ) : (
                    "Continuar al Pago"
                  )}
                </Button>
              ) : (
                <PagoMercadoPago
                  total={precioTotal.toFixed(2)}
                  carrito={itemsCarrito}
                  direccionEntrega={direccionEntrega}
                  onCompletePayment={handleCompletarPago}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CarritoCompra;