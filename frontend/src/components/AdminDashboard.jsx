// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { getProducts, getOrders } from "../services/api";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
            <img src={`http://localhost:5000/${product.image}`} alt={product.name} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-600 font-semibold">Price: {product.price} ETB</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Product</th>
              <th className="py-2 px-4 border">Campus</th>
              <th className="py-2 px-4 border">Payment Status</th>
              <th className="py-2 px-4 border">Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="py-2 px-4 border">{order.productName}</td>
                <td className="py-2 px-4 border">{order.userCampus}</td>
                <td className="py-2 px-4 border">{order.paymentStatus}</td>
                <td className="py-2 px-4 border">{order.deliveryStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
