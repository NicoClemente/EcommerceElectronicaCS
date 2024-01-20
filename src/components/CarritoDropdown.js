import React, { useState } from 'react';
import { Dropdown, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CarritoDropdown = ({ carrito, eliminarDelCarrito }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleEliminar = (productoId) => {
    eliminarDelCarrito(productoId);
  };

  const handleVerCarrito = () => {
     
    toggleDropdown();
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle variant="light" id="cart-dropdown">
        🛒 {carrito.length > 0 && <Badge bg="danger">{carrito.length}</Badge>}
      </Dropdown.Toggle>
      <Dropdown.Menu
        style={{
          minWidth: '250px',
          padding: '10px',
          position: 'absolute',
          left: '-240px',
        }}
      >
        {carrito.length > 0 ? (
          carrito.map((producto) => (
            <div key={producto.id} className="mb-2">
              <div>
                <strong>{producto.titulo}</strong>
                <br />
                Cantidad: {producto.cantidad}
              </div>
              <div>
                ${producto.precio * producto.cantidad}
                <br />
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => handleEliminar(producto._id)}
                >
                  Eliminar
                </Button>
              </div>
              <hr /> {/* Línea divisoria entre productos */}
            </div>
          ))
        ) : (
          <div className="text-center">Carrito vacío</div>
        )}

        <div className="text-center mt-3">
         
          <Button
            variant="primary"
            as={Link}
            to="/carrito"
            onClick={handleVerCarrito}
          >
            Ir al Carrito
          </Button>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CarritoDropdown;
