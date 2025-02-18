 
import axios from 'axios';
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
const baseURL = ' https://apinodeecommerce.onrender.com/api/ '; 


const api = axios.create({
 baseURL,
 headers: {
   'Content-Type': 'application/json',
 },
});


export const obtenerCarrito = async () => {
 try {
   const response = await api.get('/carrito');
   return response.data;
 } catch (error) {
   throw error;
 }
};

export const agregarAlCarrito = async (datosPedido) => {
 try {
   const response = await api.post('/carrito', datosPedido);
   return response.data;
 } catch (error) {
   throw error;
 }
};


export const obtenerProductos = async () => {
 try {
   const response = await api.get('/productos');
   return response.data;
 } catch (error) {
   throw error;
 }
};


export const agregarProducto = async (nuevoProducto) => {
 try {
   const response = await api.post('/productos', nuevoProducto);
   return response.data;
 } catch (error) {
   throw error;
 }
};

export const actualizarProducto = async (idProducto, datosActualizados) => {
 try {
   const response = await api.put(`/productos/${idProducto}`, datosActualizados);
   return response.data;
 } catch (error) {
   throw error;
 }
};

export const eliminarProducto = async (idProducto) => {
 try {
   const response = await api.delete(`/productos/${idProducto}`);
   return response.data;
 } catch (error) {
   throw error;
 }
};

export const obtenerDetallesItem = async (item) => {
 try {
   const respuesta = await api.get(`/productos/${item._id}`);
   return respuesta.data;
 } catch (error) {
   console.error('Error al obtener detalles del ítem:', error);
   throw error;
 }
};
