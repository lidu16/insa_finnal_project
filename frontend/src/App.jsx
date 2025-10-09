// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FFFEF7 0%, #F5F5DC 100%)' }}>
        <nav className="navbar">
          <div className="container">
            <div className="flex justify-between items-center">
              <Link to="/" className="navbar-brand">
                🎓 AAU Shop
              </Link>
              <div className="navbar-nav">
                <Link to="/" className="nav-link">
                  🛒 Shop
                </Link>
                <Link to="/admin/login" className="nav-link">
                  🧑‍💼 Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/panel" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;