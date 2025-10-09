// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { getProducts, getOrders, verifyOrder } from "../services/api";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchProducts(), fetchOrders()]);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const handleVerify = async (orderId) => {
    try {
      await verifyOrder(orderId);
      await fetchOrders();
      alert("✅ Order payment verified. Product is tracked.");
    } catch (error) {
      console.error("Verify error", error);
      alert("❌ Failed to verify order");
    }
  };

  if (loading) {
    return (
      <div className="container py-6">
        <div className="text-center py-12">
          <div className="spinner mx-auto mb-4"></div>
          <p style={{ color: 'var(--charcoal)' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <div className="p-6">
            <div className="flex items-center">
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, var(--primary-gold) 0%, var(--secondary-gold) 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>📦</span>
              </div>
              <div>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'var(--dark-charcoal)',
                  marginBottom: '0.25rem'
                }}>
                  {products.length}
                </h3>
                <p style={{
                  color: 'var(--light-charcoal)',
                  fontWeight: '500'
                }}>
                  Total Products
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-6">
            <div className="flex items-center">
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, var(--success) 0%, #059669 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>📋</span>
              </div>
              <div>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'var(--dark-charcoal)',
                  marginBottom: '0.25rem'
                }}>
                  {orders.length}
                </h3>
                <p style={{
                  color: 'var(--light-charcoal)',
                  fontWeight: '500'
                }}>
                  Total Orders
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-6">
            <div className="flex items-center">
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, var(--warning) 0%, #D97706 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>⏳</span>
              </div>
              <div>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'var(--dark-charcoal)',
                  marginBottom: '0.25rem'
                }}>
                  {orders.filter(order => order.deliveryStatus === 'pending').length}
                </h3>
                <p style={{
                  color: 'var(--light-charcoal)',
                  fontWeight: '500'
                }}>
                  Pending Orders
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{
          padding: '1.5rem',
          borderBottom: '2px solid var(--dark-cream)',
          background: 'linear-gradient(135deg, var(--light-cream) 0%, var(--cream) 100%)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--dark-charcoal)',
            marginBottom: '0.25rem'
          }}>
            📦 Products
          </h2>
          <p style={{ color: 'var(--light-charcoal)' }}>
            Manage your product catalog
          </p>
        </div>
        <div className="p-6">
          {products.length === 0 ? (
            <div className="text-center py-8">
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
              <h3 style={{ color: 'var(--charcoal)', marginBottom: '0.5rem' }}>No products found</h3>
              <p style={{ color: 'var(--light-charcoal)' }}>Add some products to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                      fontSize: '1.1rem',
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
                      fontSize: '1.25rem',
                      marginBottom: '0.75rem'
                    }}>
                      {product.price} ETB
                    </p>
                    <div style={{ fontSize: '0.8rem', color: 'var(--light-charcoal)' }}>
                      <p style={{ marginBottom: '0.25rem' }}>📞 {product.phone}</p>
                      <p>🏦 {product.bankAccount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Orders Section */}
      <div className="card">
        <div style={{
          padding: '1.5rem',
          borderBottom: '2px solid var(--dark-cream)',
          background: 'linear-gradient(135deg, var(--light-cream) 0%, var(--cream) 100%)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--dark-charcoal)',
            marginBottom: '0.25rem'
          }}>
            📋 Recent Orders
          </h2>
          <p style={{ color: 'var(--light-charcoal)' }}>
            Track order status and delivery
          </p>
        </div>
        <div style={{ overflow: 'auto' }}>
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
              <h3 style={{ color: 'var(--charcoal)', marginBottom: '0.5rem' }}>No orders yet</h3>
              <p style={{ color: 'var(--light-charcoal)' }}>Orders will appear here when customers place them</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Campus</th>
                  <th>Payment</th>
                  <th>Delivery</th>
                  <th>Actions</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td style={{ fontWeight: '600', color: 'var(--dark-charcoal)' }}>
                      {order.productName}
                    </td>
                    <td style={{ color: 'var(--light-charcoal)' }}>
                      {order.userCampus}
                    </td>
                    <td>
                      <span className={`badge ${order.paymentStatus === 'verified'
                        ? 'badge-success'
                        : order.paymentStatus === 'pending'
                          ? 'badge-warning'
                          : 'badge-info'
                        }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${order.deliveryStatus === 'delivered'
                        ? 'badge-success'
                        : 'badge-warning'
                        }`}>
                        {order.deliveryStatus}
                      </span>
                    </td>
                    <td>
                      {order.paymentStatus !== 'verified' && (
                        <button onClick={() => handleVerify(order._id)} style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: 'none', background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)', color: '#fff', cursor: 'pointer' }}>
                          Accept
                        </button>
                      )}
                    </td>
                    <td style={{ color: 'var(--light-charcoal)' }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;