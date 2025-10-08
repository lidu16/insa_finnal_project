// src/components/OrderForm.jsx
import React, { useState } from "react";
import { addOrder } from "../services/api";

const OrderForm = ({ product, onSuccess }) => {
  const [userCampus, setUserCampus] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userCampus || !paymentScreenshot) {
      setMessage("Please select campus and upload payment screenshot.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("productId", product._id);
      formData.append("productName", product.name);
      formData.append("userCampus", userCampus);
      formData.append("paymentScreenshot", paymentScreenshot);

      await addOrder(formData);
      setMessage("Order placed successfully!");
      setUserCampus("");
      setPaymentScreenshot(null);
      onSuccess();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error placing order");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
      <h3 className="text-xl font-bold mb-4 text-center">Place Order for: {product.name}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="font-semibold">Select Campus:</span>
          <select value={userCampus} onChange={(e) => setUserCampus(e.target.value)} className="w-full mt-1 p-2 border rounded" required>
            <option value="">--Select--</option>
            <option value="4 Killo">4 Killo</option>
            <option value="5 Killo">5 Killo</option>
            <option value="6 Killo">6 Killo</option>
            <option value="FBE">FBE</option>
          </select>
        </label>
        <label className="block">
          <span className="font-semibold">Upload Payment Screenshot:</span>
          <input type="file" onChange={(e) => setPaymentScreenshot(e.target.files[0])} className="w-full mt-1" required />
        </label>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">Submit Order</button>
      </form>
      {message && <p className="mt-3 text-center text-blue-600">{message}</p>}
    </div>
  );
};

export default OrderForm;
