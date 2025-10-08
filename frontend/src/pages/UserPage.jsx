// src/pages/UserPage.jsx
import React, { useState } from "react";
import ProductList from "../components/ProductList";
import OrderForm from "../components/OrderForm";

const UserPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-8">AAU E-Commerce</h1>
      <ProductList onBuy={(product) => setSelectedProduct(product)} />
      {selectedProduct && (
        <OrderForm product={selectedProduct} onSuccess={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default UserPage;
