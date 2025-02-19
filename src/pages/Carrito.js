import React, { useState } from "react";
import { Container, Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import PagoMercadoPago from "../components/PagoMercadoPago";
import { agregarAlCarrito } from "../services/api";

const CarritoCompra = ({ carrito, eliminarDelCarrito }) => {
 const [itemsCarrito, setItemsCarrito] = useState(carrito);
 const [direccionEntrega, setDireccionEntrega] = useState({
   calle: "",
   ciudad: "",
   codigoPostal: "",
 });
 const [mostrarSeccionPago, setMostrarSeccionPago] = useState(false);

 const precioTotal = itemsCarrito.reduce(
   (total, item) => total + item.precio * item.cantidad,
   0
 );

 const handleActualizarCantidad = (itemId, cantidad) => {
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
   try {
     // Validar que la dirección esté completa
     if (!direccionEntrega.calle || !direccionEntrega.ciudad || !direccionEntrega.codigoPostal) {
       alert("Por favor complete todos los campos de la dirección de entrega");
       return;
     }

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
   } catch (error) {
     console.error("Error al realizar el pedido:", error);
     alert("Error al procesar el pedido. Por favor intente nuevamente.");
   }
 };

 const handleCompletarPago = () => {
   setItemsCarrito([]);
   setDireccionEntrega({
     calle: "",
     ciudad: "",
     codigoPostal: "",
   });
   setMostrarSeccionPago(false);
   alert("¡Pago completado con éxito!");
 };

 if (itemsCarrito.length === 0) {
   return (
     <Container className="mt-5 my-3">
       <h2>Carrito de Compra</h2>
       <p>No hay productos en el carrito</p>
     </Container>
   );
 }

 return (
   <Container className="mt-5 my-3">
     <Row>
       {/* Listado de productos en el carrito */}
       <Col md={8}>
         <h2>Carrito de Compra</h2>
         <ListGroup>
           <ListGroup.Item>
             <Row className="fw-bold">
               <Col>Producto</Col>
               <Col>Nombre</Col>
               <Col>Precio</Col>
               <Col>Cantidad</Col>
               <Col>Subtotal</Col>
               <Col>Eliminar</Col>
             </Row>
           </ListGroup.Item>
           {itemsCarrito.map((item) => (
             <ListGroup.Item key={item._id}>
               <Row>
                 <Col>
                   <img
                     src={item.imagen}
                     className="img-carrito"
                     alt={item.titulo}
                   />
                 </Col>
                 <Col>{item.titulo}</Col>
                 <Col>${item.precio}</Col>
                 <Col>
                   <Form.Control
                     type="number"
                     min="1"
                     value={item.cantidad}
                     onChange={(e) =>
                       handleActualizarCantidad(
                         item._id,
                         parseInt(e.target.value, 10)
                       )
                     }
                   />
                 </Col>
                 <Col>${(item.precio * item.cantidad).toFixed(2)}</Col>
                 <Col>
                   <Button
                     variant="danger"
                     onClick={() => handleEliminar(item._id)}
                   >
                     Eliminar
                   </Button>
                 </Col>
               </Row>
             </ListGroup.Item>
           ))}
           <ListGroup.Item className="text-end">
             <Row>
               <Col className="fw-bold">Total: ${precioTotal.toFixed(2)}</Col>
             </Row>
           </ListGroup.Item>
         </ListGroup>
       </Col>

       {/* Formulario de dirección de entrega */}
       <Col md={4}>
         <h2>Detalles de Entrega</h2>
         <Form>
           <Form.Group controlId="calle" className="mb-3">
             <Form.Label>Calle:</Form.Label>
             <Form.Control
               type="text"
               name="calle"
               value={direccionEntrega.calle}
               onChange={handleActualizarDireccion}
               required
             />
           </Form.Group>

           <Form.Group controlId="ciudad" className="mb-3">
             <Form.Label>Ciudad:</Form.Label>
             <Form.Control
               type="text"
               name="ciudad"
               value={direccionEntrega.ciudad}
               onChange={handleActualizarDireccion}
               required
             />
           </Form.Group>

           <Form.Group controlId="codigoPostal" className="mb-3">
             <Form.Label>Código Postal:</Form.Label>
             <Form.Control
               type="text"
               name="codigoPostal"
               value={direccionEntrega.codigoPostal}
               onChange={handleActualizarDireccion}
               required
             />
           </Form.Group>

           <Button
             variant="danger border"
             className="w-100 my-3"
             onClick={handleRealizarPedido}
           >
             Realizar Pedido
           </Button>
         </Form>
       </Col>
     </Row>

     {/* Sección de Pago */}
     {mostrarSeccionPago && (
       <Row className="mt-3">
         <Col>
           <PagoMercadoPago 
             total={precioTotal.toFixed(2)} 
             onCompletePayment={handleCompletarPago}
           />
         </Col>
       </Row>
     )}
   </Container>
 );
};

export default CarritoCompra;