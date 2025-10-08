// src/components/ProductList.jsx
import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";

const ProductList = ({ onBuy }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg shadow p-4 hover:shadow-lg transition flex flex-col">
            <img src={`http://localhost:5000/${product.image}`} alt={product.name} className="w-full h-40 object-cover rounded mb-3" />
            <h3 className="font-bold text-lg mb-1">{product.name}</h3>
            <p className="text-gray-600 mb-1">{product.description}</p>
            <p className="text-green-600 font-semibold mb-1">Price: {product.price} ETB</p>
            <p className="text-gray-500 text-sm mb-1">Phone: {product.phone}</p>
            <p className="text-gray-500 text-sm mb-3">Bank: {product.bankAccount}</p>
            <button 
              onClick={() => onBuy(product)} 
              className="mt-auto bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
