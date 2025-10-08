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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("phone", phone);
      formData.append("bankAccount", bankAccount);
      formData.append("image", image);

      const response = await addProduct(formData);
      setMessage(response.data.message);

      // Clear form
      setName(""); setDescription(""); setPrice("");
      setPhone(""); setBankAccount(""); setImage(null);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Bank Account" value={bankAccount} onChange={e => setBankAccount(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="file" onChange={e => setImage(e.target.files[0])} className="w-full" required />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">Add Product</button>
      </form>
      {message && <p className="mt-2 text-center text-blue-600">{message}</p>}
    </div>
  );
};

export default ProductForm;
