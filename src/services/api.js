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

export const actualizarPerfil = async (userData) => {
  try {
    const response = await api.put('/auth/perfil', userData);
    
    // Actualiza la información del usuario en localStorage
    if (response.data.success) {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...userData, ...response.data.usuario };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return response.data;
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    throw error.response?.data || error;
  }
};

export const cambiarPassword = async (passwordData) => {
  try {
    const response = await api.put('/auth/cambiar-password', passwordData);
    return response.data;
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
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
    console.log('🚀 Enviando datos de pago:', JSON.stringify(paymentData, null, 2));
    console.log('🌐 URL base de la API:', baseURL);
    console.log('🔗 URL completa:', `${baseURL}pagos/procesar`);
    
    // Validar datos antes de enviar
    if (!paymentData || !paymentData.items || paymentData.items.length === 0) {
      throw new Error('Datos de pago inválidos: no hay items');
    }
    
    // Validar cada item
    paymentData.items.forEach((item, index) => {
      if (!item.title || typeof item.title !== 'string') {
        throw new Error(`Item ${index + 1}: título inválido`);
      }
      if (!item.unit_price || typeof item.unit_price !== 'number' || item.unit_price <= 0) {
        throw new Error(`Item ${index + 1}: precio inválido`);
      }
      if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
        throw new Error(`Item ${index + 1}: cantidad inválida`);
      }
    });
    
    const response = await api.post('/pagos/procesar', paymentData, {
      timeout: 10000, // 10 segundos de timeout
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Respuesta exitosa de MercadoPago:', response.data);
    
    if (!response.data) {
      throw new Error('Respuesta vacía del servidor');
    }
    
    if (!response.data.init_point) {
      console.error('❌ Respuesta sin init_point:', response.data);
      throw new Error('El servidor no devolvió una URL de pago válida');
    }
    
    return response.data;
    
  } catch (error) {
    console.error('❌ Error detallado en procesarPago:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      statusText: error.response?.statusText,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      }
    });
    
    // Manejar diferentes tipos de errores
    if (error.code === 'ECONNABORTED') {
      throw new Error('Tiempo de espera agotado. Por favor, intenta nuevamente.');
    }
    
    if (error.response) {
      // El servidor respondió con un código de error
      const errorMessage = error.response.data?.error || 
                          error.response.data?.message || 
                          `Error del servidor: ${error.response.status}`;
      throw new Error(errorMessage);
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      throw new Error('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
    } else {
      // Error en la configuración de la petición
      throw new Error(error.message || 'Error al procesar el pago');
    }
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
    console.log('Base URL:', baseURL);
    console.log('Full Upload URL:', `upload/image`);
    
    const response = await api.post(
      'upload/image', 
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    return response.data.imageUrl;
  } catch (error) {
    console.error('Error detallado al subir imagen:', {
      baseURL,
      fullURL: `upload/image`,
      response: error.response,
      message: error.message,
      config: error.config
    });
    throw new Error(error.response?.data?.error || 'Error al cargar la imagen');
  }
};