// src/pages/AdminPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import AdminDashboard from "../components/AdminDashboard";
import Navbar from "../components/Navbar";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("addProduct");
  const navigate = useNavigate();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    setIsAuthChecked(true);
  }, [navigate]);

  const handleLogin = () => {
    navigate("/admin/login");
  };

  if (!isAuthChecked) return null;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FFFEF7 0%, #F5F5DC 100%)' }}>
      <Navbar />
      {/* Admin Header */}
      <header style={{
        background: 'linear-gradient(135deg, var(--dark-charcoal) 0%, var(--charcoal) 100%)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '2rem 0'
      }}>
        <div className="container">
          <div className="flex justify-between items-center">
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--primary-gold)',
                marginBottom: '0.25rem'
              }}>
                🧑‍💼 Admin Panel
              </h1>
              <p style={{ color: 'var(--white)', opacity: '0.9' }}>
                AAU E-Commerce Management System
              </p>
            </div>
            <button
              onClick={handleLogin}
              className="btn btn-primary"
            >
              🔐 Admin Login
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container">
        <div style={{
          borderBottom: '2px solid var(--dark-cream)',
          marginBottom: '2rem'
        }}>
          <nav className="flex" style={{ gap: '2rem' }}>
            <button
              onClick={() => setActiveTab("addProduct")}
              style={{
                padding: '1rem 0',
                borderBottom: activeTab === "addProduct" ? '3px solid var(--primary-gold)' : '3px solid transparent',
                background: 'none',
                border: 'none',
                color: activeTab === "addProduct" ? 'var(--primary-gold)' : 'var(--light-charcoal)',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              ➕ Add Product
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              style={{
                padding: '1rem 0',
                borderBottom: activeTab === "dashboard" ? '3px solid var(--primary-gold)' : '3px solid transparent',
                background: 'none',
                border: 'none',
                color: activeTab === "dashboard" ? 'var(--primary-gold)' : 'var(--light-charcoal)',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => navigate("/")}
              style={{
                marginLeft: 'auto',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: 'linear-gradient(90deg, #D4AF37 0%, #1A1A1A 100%)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              👤 User Page
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "addProduct" && <ProductForm />}
        {activeTab === "dashboard" && <AdminDashboard />}
      </div>
    </div>
  );
};

export default AdminPage;