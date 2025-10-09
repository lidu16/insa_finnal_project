// src/services/api.js
import axios from "axios";

// Set your backend URL
const API_URL = "http://localhost:5000/api";

// Products
export const getProducts = () => axios.get(`${API_URL}/products`);
export const addProduct = (formData) => axios.post(`${API_URL}/products`, formData, {
  headers: { "Content-Type": "multipart/form-data" }
});

// Orders
export const getOrders = () => axios.get(`${API_URL}/orders`);
export const addOrder = (formData) => axios.post(`${API_URL}/orders`, formData, {
  headers: { "Content-Type": "multipart/form-data" }
});
export const getOrderById = (orderId) => axios.get(`${API_URL}/orders/${orderId}`);
export const verifyOrder = (orderId) => axios.put(`${API_URL}/orders/${orderId}/verify`);

// Admin
export const adminLogin = (credentials) => axios.post(`${API_URL}/admin/login`, credentials);
export const createDefaultAdmin = () => axios.post(`${API_URL}/admin/setup`);

export default { getProducts, addProduct, getOrders, addOrder, getOrderById, verifyOrder, adminLogin, createDefaultAdmin };