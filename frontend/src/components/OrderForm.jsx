// src/components/OrderForm.jsx
import React, { useEffect, useState } from "react";
import { addOrder, getOrderById } from "../services/api";

const OrderForm = ({ product, onSuccess }) => {
  const [userCampus, setUserCampus] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [message, setMessage] = useState("");
  const [createdOrderId, setCreatedOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!userCampus || !paymentScreenshot) {
      setMessage("❌ Please select campus and upload payment screenshot.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("productId", product._id);
      formData.append("productName", product.name);
      formData.append("userCampus", userCampus);
      formData.append("paymentScreenshot", paymentScreenshot);

      const { data } = await addOrder(formData);
      setCreatedOrderId(data._id);
      setMessage("✅ Order placed successfully! Waiting for admin approval…");
      setUserCampus("");
      setPaymentScreenshot(null);

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';

      // Keep the form open for status updates until admin accepts

    } catch (error) {
      console.error("Order error:", error);
      setMessage("❌ " + (error.response?.data?.message || "Error placing order. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  // Poll order status to notify user when verified
  useEffect(() => {
    if (!createdOrderId) return;
    const interval = setInterval(async () => {
      try {
        const { data } = await getOrderById(createdOrderId);
        if (data.paymentStatus === "verified") {
          setMessage("✅ Product is tracked. Payment verified by admin.");
          clearInterval(interval);
          // auto-close after short delay
          setTimeout(() => { if (onSuccess) onSuccess(); }, 1500);
        }
      } catch (_) { }
    }, 3000);
    return () => clearInterval(interval);
  }, [createdOrderId, onSuccess]);

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div className="p-6">
        <div className="text-center mb-6">
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--dark-charcoal)',
            marginBottom: '0.5rem'
          }}>
            🛒 Place Order
          </h3>
          <p style={{ color: 'var(--light-charcoal)', fontSize: '1rem' }}>
            Order: <strong style={{ color: 'var(--primary-gold)' }}>{product.name}</strong>
          </p>
          <p style={{
            color: 'var(--primary-gold)',
            fontWeight: '600',
            fontSize: '1.25rem',
            marginTop: '0.5rem'
          }}>
            {product.price} ETB
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Select Campus *
            </label>
            <select
              value={userCampus}
              onChange={(e) => setUserCampus(e.target.value)}
              className="form-input"
              required
            >
              <option value="">-- Select Your Campus --</option>
              <option value="4 Killo">🏛 4 Killo</option>
              <option value="5 Killo">🏛 5 Killo</option>
              <option value="6 Killo">🏛 6 Killo</option>
              <option value="FBE">🏛 FBE</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Upload Payment Screenshot *
            </label>
            <div className="form-file">
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  color: 'var(--primary-gold)'
                }}>
                  💳
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <label
                    htmlFor="paymentScreenshot"
                    style={{
                      cursor: 'pointer',
                      fontWeight: '600',
                      color: 'var(--primary-gold)',
                      textDecoration: 'underline'
                    }}
                  >
                    Click to upload payment screenshot
                  </label>
                  <input
                    id="paymentScreenshot"
                    name="paymentScreenshot"
                    type="file"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={(e) => setPaymentScreenshot(e.target.files[0])}
                    required
                  />
                </div>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--light-charcoal)',
                  marginBottom: '0.25rem'
                }}>
                  or drag and drop
                </p>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--light-charcoal)'
                }}>
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            {paymentScreenshot && (
              <p style={{
                marginTop: '0.5rem',
                fontSize: '0.9rem',
                color: 'var(--success)',
                fontWeight: '500'
              }}>
                ✓ Selected: {paymentScreenshot.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn ${loading ? 'btn-secondary' : 'btn-success'} w-full`}
            style={{ marginTop: '1rem' }}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="spinner" style={{
                  width: '20px',
                  height: '20px',
                  marginRight: '0.5rem'
                }}></div>
                Placing Order...
              </span>
            ) : (
              "🛒 Place Order"
            )}
          </button>
        </form>

        {/* Message Display */}
        {message && (
          <div className={`mt-4 ${message.includes("✅") ? 'alert alert-success' : 'alert alert-error'
            }`}>
            <p className="text-center" style={{ fontWeight: '600' }}>
              {message}
            </p>
          </div>
        )}

        {/* Product Info */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'var(--light-cream)',
          borderRadius: '8px',
          border: '1px solid var(--light-gold)'
        }}>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: 'var(--dark-charcoal)',
            marginBottom: '0.5rem'
          }}>
            📋 Order Details:
          </h4>
          <div style={{ fontSize: '0.9rem', color: 'var(--light-charcoal)' }}>
            <p style={{ marginBottom: '0.25rem' }}><strong>Product:</strong> {product.name}</p>
            <p style={{ marginBottom: '0.25rem' }}><strong>Price:</strong> {product.price} ETB</p>
            <p style={{ marginBottom: '0.25rem' }}><strong>Contact:</strong> 📞 {product.phone}</p>
            <p><strong>Payment:</strong> 🏦 {product.bankAccount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;