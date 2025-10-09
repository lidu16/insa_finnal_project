// src/components/ProductForm.jsx
import React, { useState } from "react";
import { addProduct } from "../services/api";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("phone", phone);
      formData.append("bankAccount", bankAccount);
      formData.append("image", image);

      const response = await addProduct(formData);
      setMessage("✅ " + response.data.message);

      // Clear form
      setName("");
      setDescription("");
      setPrice("");
      setPhone("");
      setBankAccount("");
      setImage(null);

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error("Product addition error:", error);
      setMessage("❌ " + (error.response?.data?.message || "Error adding product. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-6">
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: 'var(--dark-charcoal)',
              marginBottom: '0.5rem'
            }}>
              ➕ Add New Product
            </h2>
            <p style={{ color: 'var(--light-charcoal)' }}>
              Fill in the details to add a new product to the store
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1.5rem' }}>
              {/* Product Name */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Product Name *
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              {/* Price */}
              <div className="form-group">
                <label htmlFor="price" className="form-label">
                  Price (ETB) *
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="Enter price in ETB"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  step="0.01"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description *
              </label>
              <textarea
                id="description"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-input form-textarea"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1.5rem' }}>
              {/* Phone Number */}
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              {/* Bank Account */}
              <div className="form-group">
                <label htmlFor="bankAccount" className="form-label">
                  Bank Account *
                </label>
                <input
                  id="bankAccount"
                  type="text"
                  placeholder="Enter bank account details"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label className="form-label">
                Product Image *
              </label>
              <div className="form-file">
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    color: 'var(--primary-gold)'
                  }}>
                    📷
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <label
                      htmlFor="image"
                      style={{
                        cursor: 'pointer',
                        fontWeight: '600',
                        color: 'var(--primary-gold)',
                        textDecoration: 'underline'
                      }}
                    >
                      Click to upload an image
                    </label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
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
              {image && (
                <p style={{
                  marginTop: '0.5rem',
                  fontSize: '0.9rem',
                  color: 'var(--success)',
                  fontWeight: '500'
                }}>
                  ✓ Selected: {image.name}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`btn ${loading ? 'btn-secondary' : 'btn-primary'} w-full`}
              style={{ marginTop: '1rem' }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="spinner" style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '0.5rem'
                  }}></div>
                  Adding Product...
                </span>
              ) : (
                "➕ Add Product"
              )}
            </button>
          </form>

          {/* Message Display */}
          {message && (
            <div className={`mt-4 ${message.includes("✅") ? 'alert alert-success' : 'alert alert-error'}`}>
              <p className="text-center" style={{ fontWeight: '600' }}>
                {message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default ProductForm;