// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{
    width: '100%',
    background: 'linear-gradient(90deg, #D4AF37 0%, #1A1A1A 100%)',
    padding: '1rem 0',
    boxShadow: '0 2px 8px rgba(44,44,44,0.08)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100
  }}>
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Link to="/" style={{ color: '#FFF', fontWeight: '900', fontSize: '1.3rem', letterSpacing: '2px', textDecoration: 'none' }}>
        User Page
      </Link>
      <Link to="/admin" style={{ color: '#D4AF37', fontWeight: '800', fontSize: '1.1rem', background: '#1A1A1A', padding: '0.5rem 1rem', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(212,175,55,0.15)' }}>
        Admin Page
      </Link>
    </div>
  </nav>
);

export default Navbar;
