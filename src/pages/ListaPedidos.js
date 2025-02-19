import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { obtenerCarrito } from "../services/api";

const ListaPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const carritoData = await obtenerCarrito();
        setPedidos(carritoData || []);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <Container className="my-5">
      <h1>Lista de Pedidos</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dirección de Entrega</th>
            <th>Items</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido._id}>
              <td>{pedido._id || "ID no encontrado"}</td>
              <td>
                {pedido.direccionEntrega
                  ? `${pedido.direccionEntrega.calle || ""}, ${
                      pedido.direccionEntrega.ciudad || ""
                    } - CP: ${pedido.direccionEntrega.codigoPostal || ""}`
                  : "Dirección de entrega no encontrada"}
              </td>
              <td>
                <ul>
                  {pedido.items &&
                    pedido.items.map((item, index) => (
                      <li key={index}>
                        {item.productoId.titulo}, Cantidad: {item.cantidad}
                      </li>
                    ))}
                </ul>
              </td>
              <td>${pedido.total || "Total no encontrado"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListaPedidos;