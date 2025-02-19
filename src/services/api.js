import axios from 'axios';

const baseURL = 'https://apinodeecommerce.onrender.com/api/';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para el token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/registro', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
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
    }
    return response.data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error.response?.data || error;
  }
};

// Carrito
export const obtenerCarrito = async () => {
  const response = await api.get('/carrito');
  return response.data;
};

export const agregarAlCarrito = async (datosPedido) => {
  const response = await api.post('/carrito', datosPedido);
  return response.data;
};

// Productos
export const obtenerProductos = async () => {
  const response = await api.get('/productos');
  return response.data;
};

export const agregarProducto = async (nuevoProducto) => {
  const response = await api.post('/productos', nuevoProducto);
  return response.data;
};

export const actualizarProducto = async (idProducto, datosActualizados) => {
  const response = await api.put(`/productos/${idProducto}`, datosActualizados);
  return response.data;
};

export const eliminarProducto = async (idProducto) => {
  const response = await api.delete(`/productos/${idProducto}`);
  return response.data;
};

export const obtenerDetallesItem = async (item) => {
  const response = await api.get(`/productos/${item._id}`);
  return response.data;
};

//Pago
export const procesarPago = async (datosPago) => {
  try {
    const response = await api.post('/pagos/procesar', datosPago);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verificarPago = async (transactionId) => {
  try {
    const response = await api.get(`/pagos/verificar/${transactionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

