// src/App.jsx
import React, { useEffect, useState } from "react";
import { getProducts } from "./services/productService";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>⏳ Loading products...</h2>;
  }

  return (
    <div style={{ padding: "30px", fontFamily: "Poppins, sans-serif" }}>
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#1a73e8" }}>AAU E-Commerce 🛒</h1>
        <p style={{ color: "#555" }}>Buy items easily from any AAU campus</p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "15px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              padding: "20px",
              backgroundColor: "#fff",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={`http://localhost:5000/${product.image}`}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            />
            <h3 style={{ color: "#333" }}>{product.name}</h3>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>{product.description}</p>
            <p><b>Price:</b> ${product.price}</p>
            <p><b>Phone:</b> {product.phone}</p>
            <p><b>Bank:</b> {product.bankAccount}</p>

            <button
              style={{
                marginTop: "10px",
                backgroundColor: "#1a73e8",
                color: "white",
                padding: "10px 15px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => alert(`You clicked buy for: ${product.name}`)}
            >
              🛍️ Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
