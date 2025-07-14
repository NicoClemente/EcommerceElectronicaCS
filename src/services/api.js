import axios from 'axios';

let baseURL = process.env.REACT_APP_API_URL || 'https://apinodeecommerce.onrender.com/api/';

if (!baseURL.endsWith('/')) {
  baseURL += '/';
}

console.log('🌐 Base URL configurada:', baseURL);

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 15000 // 15 segundos de timeout
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('📡 Petición:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      fullURL: `${config.baseURL}${config.url}`,
      headers: config.headers
    });
    
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ Respuesta exitosa:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('❌ Error en respuesta:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {
    const response = await api.post('auth/registro', userData);
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
    const response = await api.post('auth/login', credentials);

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
    const response = await api.put('auth/perfil', userData);
    
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
    const response = await api.put('auth/cambiar-password', passwordData);
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

export const obtenerCarrito = async () => {
  try {
    const response = await api.get('carrito');
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
    
    const response = await api.post('carrito', pedidoConUsuario);
    return response.data;
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    throw error;
  }
};

export const obtenerProductos = async () => {
  try {
    const response = await api.get('productos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const agregarProducto = async (nuevoProducto) => {
  try {
    const response = await api.post('productos', nuevoProducto);
    return response.data;
  } catch (error) {
    console.error('Error al agregar producto:', error);
    throw error;
  }
};

export const actualizarProducto = async (idProducto, datosActualizados) => {
  try {
    const response = await api.put(`productos/${idProducto}`, datosActualizados);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

export const eliminarProducto = async (idProducto) => {
  try {
    const response = await api.delete(`productos/${idProducto}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};

export const obtenerDetallesItem = async (item) => {
  try {
    const response = await api.get(`productos/${item._id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles del ítem:', error);
    throw error;
  }
};

export const procesarPago = async (paymentData) => {
  try {
    console.log('🚀 procesarPago - Iniciando');
    console.log('🌐 Base URL:', baseURL);
    console.log('📦 Payment data:', JSON.stringify(paymentData, null, 2));
    
    if (!paymentData) {
      throw new Error('No se proporcionaron datos de pago');
    }
    
    if (!paymentData.items || !Array.isArray(paymentData.items)) {
      throw new Error('Los items deben ser un array');
    }
    
    if (paymentData.items.length === 0) {
      throw new Error('No hay items para procesar');
    }
    
    paymentData.items.forEach((item, index) => {
      if (!item.title || typeof item.title !== 'string') {
        throw new Error(`Item ${index + 1}: título inválido`);
      }
      if (!item.unit_price || typeof item.unit_price !== 'number' || item.unit_price <= 0) {
        throw new Error(`Item ${index + 1}: precio inválido (${item.unit_price})`);
      }
      if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
        throw new Error(`Item ${index + 1}: cantidad inválida (${item.quantity})`);
      }
      if (item.currency_id !== 'ARS') {
        throw new Error(`Item ${index + 1}: moneda debe ser ARS`);
      }
    });
    
    console.log('✅ Validaciones pasadas, enviando petición...');
    
    const endpoint = 'pagos/procesar';
    console.log('🎯 Endpoint:', endpoint);
    console.log('🔗 URL completa será:', `${baseURL}${endpoint}`);
    
    const response = await api.post(endpoint, paymentData);
    
    console.log('✅ Respuesta recibida del servidor');
    
    if (!response.data) {
      throw new Error('Respuesta vacía del servidor');
    }
    
    if (!response.data.init_point) {
      console.error('❌ Respuesta sin init_point:', response.data);
      throw new Error('El servidor no devolvió una URL de pago válida');
    }
    
    console.log('🎉 Pago procesado exitosamente');
    return response.data;
    
  } catch (error) {
    console.error('❌ Error en procesarPago:');
    
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Timeout de conexión');
      throw new Error('Tiempo de espera agotado. El servidor tardó demasiado en responder.');
    }
    
    if (error.response) {
      console.error('📡 Respuesta de error del servidor:');
      console.error('- Status:', error.response.status);
      console.error('- Data:', error.response.data);
      console.error('- Headers:', error.response.headers);
      
      const serverError = error.response.data?.error || 
                         error.response.data?.details || 
                         error.response.data?.message || 
                         `Error del servidor (${error.response.status})`;
      
      throw new Error(serverError);
      
    } else if (error.request) {
      console.error('📡 No se recibió respuesta del servidor:');
      console.error('- Request:', error.request);
      throw new Error('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
      
    } else {
      console.error('⚙️ Error de configuración:', error.message);
      throw new Error(error.message || 'Error al configurar la petición de pago');
    }
  }
};

export const verificarPago = async (transactionId) => {
  try {
    const response = await api.get(`pagos/verificar/${transactionId}`);
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
    console.log('Subiendo imagen...');
    console.log('🌐 Base URL:', baseURL);
    console.log('🎯 Endpoint completo será:', `${baseURL}upload/image`);
    
    const response = await api.post('upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data.imageUrl;
  } catch (error) {
    console.error('Error al subir imagen:', error);
    throw new Error(error.response?.data?.error || 'Error al cargar la imagen');
  }
};

export { baseURL };