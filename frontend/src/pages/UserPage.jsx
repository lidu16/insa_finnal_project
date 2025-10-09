// src/pages/UserPage.jsx
import React, { useState } from "react";
import ProductList from "../components/ProductList";
import OrderForm from "../components/OrderForm";

const UserPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFFBEA 0%, #D4AF37 100%)',
      padding: '2rem 0'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#1A1A1A',
        letterSpacing: '2px',
        textShadow: '0 2px 8px #D4AF37'
      }}>
        <span style={{ color: '#D4AF37' }}>AAU</span> <span style={{ color: '#1A1A1A' }}>E-Commerce</span>
      </h1>
      <ProductList onBuy={(product) => setSelectedProduct(product)} />
      {selectedProduct && (
        <OrderForm product={selectedProduct} onSuccess={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default UserPage;