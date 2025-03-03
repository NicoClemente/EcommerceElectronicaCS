import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'https://apinodeecommerce.onrender.com/api/';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
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
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    const pedidoConUsuario = {
      ...datosPedido,
      usuario: user._id 
    };
    
    const response = await api.post('/carrito', pedidoConUsuario);
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
    console.log('Enviando a API:', paymentData);
    const response = await api.post('/pagos/procesar', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error detallado:', error.response?.data || error);
    throw new Error(error.response?.data?.error || 'Error al procesar el pago');
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

export const subirImagen = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/upload/image`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Error al cargar la imagen');
    }
    
    const data = await response.json();
    return data.imageUrl; // URL de la imagen subida
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};