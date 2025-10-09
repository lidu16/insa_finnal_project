// src/pages/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import OrderForm from "../components/OrderForm";
import Navbar from "../components/Navbar";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />
      {/* Header Section */}
      <div className="header">
        <div className="container">
          <h1>🎓 AAU Online Shop</h1>
          <p>Premium Products for AAU Students - Quality & Affordability</p>
        </div>
      </div>

      {/* Products Section */}
      <div className="container py-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="spinner mx-auto mb-4"></div>
            <p style={{ color: 'var(--charcoal)' }}>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
            <h3 style={{ color: 'var(--charcoal)', marginBottom: '0.5rem' }}>No Products Available</h3>
            <p style={{ color: 'var(--light-charcoal)' }}>Check back later for amazing products!</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 style={{ color: 'var(--dark-charcoal)', marginBottom: '0.5rem' }}>Featured Products</h2>
              <p style={{ color: 'var(--light-charcoal)' }}>Discover our collection of premium items</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <div key={product._id} className="card">
                  {product.image && (
                    <div style={{ height: '200px', overflow: 'hidden' }}>
                      <img
                        src={`http://localhost:5000/${product.image}`}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: 'var(--dark-charcoal)',
                      marginBottom: '0.5rem'
                    }}>
                      {product.name}
                    </h3>
                    <p style={{
                      color: 'var(--light-charcoal)',
                      fontSize: '0.9rem',
                      marginBottom: '0.75rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {product.description}
                    </p>
                    <p style={{
                      color: 'var(--primary-gold)',
                      fontWeight: '700',
                      fontSize: '1.5rem',
                      marginBottom: '1rem'
                    }}>
                      {product.price} ETB
                    </p>
                    {product.phone && (
                      <p style={{
                        color: 'var(--light-charcoal)',
                        fontSize: '0.8rem',
                        marginBottom: '0.25rem'
                      }}>
                        📞 {product.phone}
                      </p>
                    )}
                    {product.bankAccount && (
                      <p style={{
                        color: 'var(--light-charcoal)',
                        fontSize: '0.8rem',
                        marginBottom: '1rem'
                      }}>
                        🏦 {product.bankAccount}
                      </p>
                    )}
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="btn btn-primary w-full"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Order Form Modal */}
      {
        selectedProduct && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div className="card" style={{
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: 'var(--dark-charcoal)'
                  }}>
                    Order {selectedProduct.name}
                  </h3>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '2rem',
                      color: 'var(--light-charcoal)',
                      cursor: 'pointer',
                      padding: '0.5rem'
                    }}
                  >
                    ×
                  </button>
                </div>
                <OrderForm product={selectedProduct} onSuccess={() => setSelectedProduct(null)} />
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}

export default Home;