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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="rounded-xl shadow-lg p-5 flex flex-col bg-white border-2 border-yellow-400 hover:shadow-2xl transition" style={{ boxShadow: '0 4px 24px rgba(44,44,44,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #D4AF37 0%, #1A1A1A 100%)', borderRadius: '16px', marginBottom: '1rem', padding: '0.5rem' }}>
              <img src={`http://localhost:5000/${product.image}`} alt={product.name} style={{ width: '180px', height: '180px', objectFit: 'cover', borderRadius: '12px', border: '3px solid #B8860B', background: '#FFFBEA' }} />
            </div>
            <h3 style={{ fontWeight: '700', fontSize: '1.25rem', color: '#1A1A1A', marginBottom: '0.5rem', textAlign: 'center' }}>{product.name}</h3>
            <p style={{ color: '#404040', marginBottom: '0.5rem', textAlign: 'center' }}>{product.description}</p>
            <p style={{ color: '#D4AF37', fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.5rem', textAlign: 'center' }}>Price: {product.price} ETB</p>
            <p style={{ color: '#B8860B', fontSize: '0.95rem', marginBottom: '0.25rem', textAlign: 'center' }}>📞 {product.phone}</p>
            <p style={{ color: '#B8860B', fontSize: '0.95rem', marginBottom: '0.75rem', textAlign: 'center' }}>🏦 {product.bankAccount}</p>
            <button
              onClick={() => onBuy(product)}
              className="mt-auto w-full"
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                fontWeight: '800',
                fontSize: '1rem',
                background: 'linear-gradient(90deg, #D4AF37 0%, #1A1A1A 100%)',
                color: '#fff',
                border: 'none',
                letterSpacing: '1px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 2px 8px rgba(212,175,55,0.25)'
              }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              🛒 Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;