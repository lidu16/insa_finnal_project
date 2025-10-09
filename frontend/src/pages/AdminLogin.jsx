// src/pages/AdminLogin.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Ensure no stale token allows bypass
  useEffect(() => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await adminLogin({ username, password });
      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("adminUsername", response.data.admin.username);
      alert("✅ Login successful!");
      navigate("/admin/panel");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
      // extra safety: remove any stale token
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUsername");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FFFBEA 0%, #D4AF37 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '400px', width: '100%', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(44,44,44,0.08)', padding: '2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '900', color: '#D4AF37', marginBottom: '1rem', letterSpacing: '2px', textShadow: '0 2px 8px #1A1A1A' }}>
          🧑‍💼 Admin Login
        </h2>
        <p style={{ textAlign: 'center', color: '#1A1A1A', marginBottom: '2rem' }}>
          Sign in to access the admin panel
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="username" style={{ display: 'block', fontWeight: '600', color: '#1A1A1A', marginBottom: '0.5rem' }}>Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #D4AF37', fontSize: '1rem', background: '#FFFBEA', color: '#1A1A1A' }}
              placeholder="lidu"
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="password" style={{ display: 'block', fontWeight: '600', color: '#1A1A1A', marginBottom: '0.5rem' }}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #D4AF37', fontSize: '1rem', background: '#FFFBEA', color: '#1A1A1A' }}
              placeholder="lidu123"
            />
          </div>
          {error && (
            <div style={{ background: '#FFF3E0', border: '1px solid #B8860B', color: '#B8860B', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', fontWeight: '700', fontSize: '1.1rem', background: 'linear-gradient(90deg, #D4AF37 0%, #1A1A1A 100%)', color: '#fff', border: 'none', boxShadow: '0 2px 8px rgba(212,175,55,0.15)', letterSpacing: '1px', cursor: 'pointer' }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* End of form and container */}
      </div>
    </div>
  );
}