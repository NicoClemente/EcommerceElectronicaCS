import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'https://apinodeecommerce.onrender.com/api/';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
// Auth
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/registro', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.usuario));
    }
    return response.data;
  } catch (error) {
    console.error('Error en registro:', error);
    throw error.response?.data || error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.usuario));
    }
    
    return response.data;
  } catch (error) {
    console.error('Error detallado del login:', error.response || error);
    throw error.response?.data || error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
};

// Carrito
export const obtenerCarrito = async () => {
  try {
    const response = await api.get('/carrito');
    return response.data;
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    throw error;
  }
};

export const agregarAlCarrito = async (datosPedido) => {
  try {
    const response = await api.post('/carrito', datosPedido);
    return response.data;
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    throw error;
  }
};

// Productos
export const obtenerProductos = async () => {
  try {
    const response = await api.get('/productos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const agregarProducto = async (nuevoProducto) => {
  try {
    const response = await api.post('/productos', nuevoProducto);
    return response.data;
  } catch (error) {
    console.error('Error al agregar producto:', error);
    throw error;
  }
};

export const actualizarProducto = async (idProducto, datosActualizados) => {
  try {
    const response = await api.put(`/productos/${idProducto}`, datosActualizados);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

export const eliminarProducto = async (idProducto) => {
  try {
    const response = await api.delete(`/productos/${idProducto}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};

export const obtenerDetallesItem = async (item) => {
  try {
    const response = await api.get(`/productos/${item._id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles del ítem:', error);
    throw error;
  }
};

// Pago
export const procesarPago = async (paymentData) => {
  try {
    console.log('Datos de pago originales:', JSON.stringify(paymentData, null, 2));
    
    // Validate items
    const items = paymentData.items;
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('No se recibieron items para el pago');
    }

    // Validate payer email
    if (!paymentData.payer?.email) {
      throw new Error('Se requiere un email de Mercado Pago');
    }

    // Validate delivery address
    const direccionEntrega = paymentData.direccionEntrega;
    if (!direccionEntrega || !direccionEntrega.calle || !direccionEntrega.ciudad || !direccionEntrega.codigoPostal) {
      console.error('Dirección de entrega inválida:', direccionEntrega);
      throw new Error('Dirección de entrega incompleta');
    }

    // Fetch product details for each item
    const itemsWithDetails = await Promise.all(
      items.map(async (item) => {
        try {
          // Fetch product details using the productoId
          const productDetails = await obtenerDetallesItem({ _id: item._id || item.productoId });
          return {
            _id: item._id || item.productoId,
            titulo: productDetails.titulo,
            cantidad: item.cantidad,
            precio: productDetails.precio
          };
        } catch (error) {
          console.error(`Error al obtener detalles del producto ${item._id || item.productoId}:`, error);
          throw new Error(`No se pudieron obtener los detalles del producto ${item._id || item.productoId}`);
        }
      })
    );

    // Validate total
    const total = Number(paymentData.total);
    if (isNaN(total) || total <= 0) {
      throw new Error('Total de pago inválido');
    }

    // Validate payload for Mercado Pago
    const validatedPayload = {
      items: itemsWithDetails,
      total: total,
      payer: {
        email: paymentData.payer.email
      },
      direccionEntrega: {
        calle: direccionEntrega.calle,
        ciudad: direccionEntrega.ciudad,
        codigoPostal: direccionEntrega.codigoPostal
      }
    };

    console.log('Payload validado:', JSON.stringify(validatedPayload, null, 2));

    const response = await api.post('/pagos/procesar', validatedPayload);
    return response.data;
  } catch (error) {
    console.error('Error completo en procesarPago:', {
      responseData: error.response?.data,
      responseStatus: error.response?.status,
      message: error.message,
      config: error.config
    });
    
    // Throw a more informative error
    if (error.response?.data) {
      throw new Error(error.response.data.error || 'Error al procesar pago');
    }
    
    throw error;
  }
};

export const verificarPago = async (transactionId) => {
  try {
    const response = await api.get(`/pagos/verificar/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error('Error al verificar pago:', error);
    throw error;
  }
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};