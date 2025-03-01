import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Verifica si el usuario actual tiene rol de administrador
 * @returns {boolean} True si el usuario es administrador, false en caso contrario
 */
export const isAdmin = () => {
  try {
    // Obtener el usuario del localStorage 
    const userString = localStorage.getItem('user');
    
    if (!userString) return false;
    
    const user = JSON.parse(userString);
    
    // Verificar específicamente si el rol es "admin" (que coincide con MongoDB)
    return user && user.rol === "admin";
  } catch (error) {
    console.error('Error al verificar si el usuario es admin:', error);
    return false;
  }
};

/**
 * Verifica si hay un usuario autenticado actualmente
 * @returns {boolean} True si hay un usuario autenticado, false en caso contrario
 */
export const isAuthenticated = () => {
  try {
    // Verifica si hay un token almacenado
    const token = localStorage.getItem('token');
    
    // Verifica si hay información de usuario
    const userString = localStorage.getItem('user');
    
    return Boolean(token && userString);
  } catch (error) {
    console.error('Error al verificar autenticación:', error);
    return false;
  }
};

/**
 * Obtiene el objeto usuario actual
 * @returns {Object|null} El objeto usuario o null si no hay usuario autenticado
 */
export const getCurrentUser = () => {
  try {
    const userString = localStorage.getItem('user');
    
    if (!userString) return null;
    
    return JSON.parse(userString);
  } catch (error) {
    console.error('Error al obtener el usuario actual:', error);
    return null;
  }
};

// Componente de botones de administración que solo se muestra a administradores
export const AdminControls = ({ productId, onEdit, onDelete }) => {
  // Si no es admin, no renderizar nada
  if (!isAdmin()) return null;
  
  return (
    <div className="admin-controls">
      {onEdit && (
        <button 
          className="btn btn-sm btn-outline-primary me-2" 
          onClick={() => onEdit(productId)}
        >
          <i className="bi bi-pencil"></i>
        </button>
      )}
      
      {onDelete && (
        <button 
          className="btn btn-sm btn-outline-danger" 
          onClick={() => onDelete(productId)}
        >
          <i className="bi bi-trash"></i>
        </button>
      )}
    </div>
  );
};

// Ejemplo de uso en un componente de tarjeta de producto
export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  const handleEdit = (id) => {
    navigate(`/admin/productos/editar/${id}`);
  };
  
  const handleDelete = (id) => {
    // Lógica para eliminar producto
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      console.log('Eliminando producto:', id);
      // Aquí iría tu lógica de eliminación
    }
  };
  
  return (
    <div className="card">
      <img src={product.imagen} className="card-img-top" alt={product.titulo} />
      <div className="card-body">
        <h5 className="card-title">{product.titulo}</h5>
        <p className="card-text">${product.precio}</p>
        
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-primary">
            Agregar al carrito
          </button>
          
          {/* Controles de administrador que solo se muestran si el usuario es admin */}
          <AdminControls 
            productId={product._id}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};